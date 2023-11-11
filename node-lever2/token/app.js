const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 3002
const SECRET_KEY = `rizzy`

app.use(cookieParser())

let tokenObject = {}

app.get('/set-token/:id', (req, res) => {
  const id = req.params.id
  const accessToken = createAccessToken(id)
  const refreshToken = createRefreshToken()

  tokenObject[refreshToken] = id // 리프레시 토큰을 가지고 해당 유저의 정보를 서버에 저장
  res.cookie('accessToken', accessToken) // 엑세스 토큰을 쿠키에 전달
  res.cookie('refreshToken', refreshToken) // 리프레시 토큰을 쿠키에 전달

  return res.status(200).send({ message: 'Token이 정상적으로 발급되었습니다.' })
})

// 엑세스 토큰 생성
function createAccessToken(id) {
  const accessToken = jwt.sign(
    { id: id }, // JWT 데이터
    SECRET_KEY, // 비밀키
    { expiresIn: '10s' } // 엑세스토큰이 10초 뒤에 만료되도록 설정
  )
}

// 리프레시 토큰 생성
function createRefreshToken() {
  const refreshToken = jwt.sign(
    {}, // JWT 데이터
    SECRET_KEY, // 비밀키
    { expiresIn: '7d' } // 리프레시 토큰이 7일 뒤에 만료됨
  )
}

app.get('/get-token', (req, res) => {
  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  if (!accessToken)
    return res
      .status(400)
      .json({ message: 'Access Token이 존재하지 않습니다.' })
  if (!refreshToken)
    return res
      .status(400)
      .json({ message: 'Refresh Token이 존재하지 않습니다.' })

  const isAccessTokenValidate = validateAccessToken(accessToken)
  const isRefreshTokenValidate = validateAccessToken(refreshToken)

  if (!isRefreshTokenValidate)
    return res.status(419).json({ message: 'Refresh Token이 만료되었습니다.' })

  if (!isAccessTokenValidate) {
    const accessTokenId = tokenObject[refreshToken]
    if (!accessTokenId)
      return res
        .status(419)
        .json({ message: 'Refresh Token의 정보가 서버에 존재하지 않습니다.' })

    const newAccessToken = createAccessToken(accessTokenId)
    res.cookie('accessToken', newAccessToken)
    return res.json({ message: 'Access Token을 새롭게 발급하였습니다.' })
  }

  const { id } = getAccessTokenPayLoad(accessToken)
  return res.json({
    message: `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.`,
  })
})

// Access Token 을 검증
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, SECRET_KEY)
    return true
  } catch (error) {
    return false
  }
}

// Access Token의 Payload를 가져옴
function getAccessTokenPayLoad(accessToken) {
  try {
    const payload = jwt.verify(accessToken, SECRET_KEY) // jwt에서 payload를 가져옴
    return payload
  } catch (error) {
    return null
  }
}

app.get('/', (req, res) => {
  res.status(200).send('hello token')
})

app.listen(port, () => {
  console.log(port, '포트로 서버 열렸어요')
})
