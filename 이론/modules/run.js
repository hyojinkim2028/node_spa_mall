
// 1번 실행법
// const add = require("./math.js");
// console.log(add(10,80))



// 2-1번 실행법
// const add = require("./math.js");
// console.log(add.add(10,80)); 
// 함수 하나하나로 내보내게 되면 객체로 내보내지므로 다음과 같이 사용해야 작동함.


// 2-2번, 3번 실행법, 2번 실행법 객체 구조분해할당을 통해 아래와 같이 실행 가능
const {add} = require("./math.js");
console.log(add(10,80)); 