const express = require('express'); // express 라이브러리 가져와서 변수에 담음
const app = express(); // express 실행해 app 객체를 만들어 추후 이를 통해 get 요청등으로 api를 실행할 수 있게 만듬
const port = 3000;

const goodsRouter = require('./routes/goods'); // goods 파일에서 내보낸 router를 goodsRouter 변수를 만들어 반환받음
const cartsRouter = require('./routes/cart.js')

const connect = require("./schemas") // 폴더로 불러와도 그 안의 모듈페이지 사용 가능.
connect();

// body parser 미들웨어 사용하기 위한 문법. 
// request 객체 안에있는 body 데이터를 사용하기 위해서는 이 코드를 작성해야 함.
// body로 데이터가 들어올때(post요청 등) 들어온 데이터를 사용할수 있도록 하는 전역 미들웨어
app.use(express.json()); 
// // app.use : express를 담은 app이라는 객체에다 모든 미들웨어가 여기를 통과하게끔 하여 전역으로 쓸것이다
// // 이것을 통과한 다음 다음 코드로 넘어가게함
// api 경로로 들어오는 router들은 이 경로로 들어왔었을때 모두 goodsRouter,cartsRouter로 가서 실행하라
app.use("/api", goodsRouter,cartsRouter); 


app.get('/', (req, res) => { 
  res.send('Hello World!'); 
});


app.listen(port, () => { // app 객체를 통해 서버 실행해서 열기
  console.log(port, '포트로 서버가 열렸어요!');
});