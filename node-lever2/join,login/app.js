const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose
  .connect('mongodb://localhost:27017/shopping-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('몽고디비 연결 성공')
  })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const app = express()
const router = express.Router()

const User = require('./models/user.js')

// 회원가입
router.post('/users', async (req, res) => {
  const { nickname, email, password, confirmPassword } = req.body

  // 1. 패스워드, 패스워드 검증값 일치여부
  // 2. 이메일에 해당하는 사용자 존재여부
  // 3. nickname에 해당하는 사용자 존재여부
  // 4. DB에 데이터를 삽입

  if (password !== confirmPassword) {
    res.status(400).json({ errorMessage: '비밀번호 확인이 일치하지 않습니다.' })
    return
  }
  const existUser = await User.findOne({
    $or: [{ email: email }, { nickname: nickname }],
  })

  if (existUser) {
    res.status(400).json({
      errorMessage: '이메일이나 닉네임이 이미 사용중입니다.',
    })
    return
  }

  const user = new User({ nickname, email, password })
  await user.save()

  res.status(201).json({})
})

// 로그인
router.post('/auth', async (req, res) => {
  const { email, password } = req.body
  // 해당 유저 존재여부 확인
  const user = await User.findOne({ email })

  // 1. 사용자가 존재하지 않거나
  // 2. 입력받은 password와 사용자의 password가 다를 때 에러메세지가 발생되야 함.
  if (!user || password !== user.password) {
    res.status(400).json({
      errorMessage:
        '사용자가 존재하지 않거나, 사용자의 Password와 입력받은 Password가 일치하지 않습니다.',
    })
    return
  }

  const token = jwt.sign({ userId: user.userId }, 'rizzy-secret-key')

  res.status(200).json({
    token: token,
  })
})

const authMiddleware = require('./join,login/middlewares/auth-middleware.js')
router.get('/users/me', authMiddleware, async (req, res) => {
  res.json({ user: res.locals.user })
})

app.use('/api', express.urlencoded({ extended: false }), router)
app.use(express.static('assets'))

app.listen(8080, () => {
  console.log('서버가 요청을 받을 준비가 됐어요')
})
