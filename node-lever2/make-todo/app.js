const express = require('express')

const db = require('./models/index.js') // ./models/index.js 모듈을 불러오면서 자동으로 db 연결됨
const todosRouter = require('./routes/todos.router.js')

const app = express()

app.use('/api', express.json(), todosRouter)
// 정적인 파일을 연결해주는 미들웨어, assets 폴더 안의 index.html 파일 전송
// app.js 파일을 기준으로 입력 값('./assets' 경로에 있는 파일을 아무런 가공 없이 그대로 전달해주는 미들웨어)
// 프론트엔드 파일을 서빙
app.use(express.static('./assets'))
app.listen(8080, () => {
  console.log('서버가 켜졌어요!')
})
