// 모델
// jwt
const jwt = require('jsonwebtoken')
const User = require('../../models/user.js')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  const [authType, authToken] = authorization.split(' ')
  // authType : Bearer
  // authToken : 실제 jwt 값
  console.log([authType, authToken])

  if (authType !== 'Bearer' || !authToken) {
    res.status(400).json({
      errorMessage: '로그인 후 사용이 가능한 API 입니다.',
    })
    return
  }

  try {
    // 복호화 및 검증 (시크릿 키 등이 맞지 않으면 서버가 꺼지므로 에러처리 함)
    const { userId } = jwt.verify(authToken, 'rizzy-secret-key')
    const user = await User.findById(userId)
    res.locals.user = user
    console.log(user)
    next()
  } catch (error) {
    res.status(400).json({
      errorMessage: '로그인 후 사용이 가능한 API 입니다.',
    })
  }
  return
}
