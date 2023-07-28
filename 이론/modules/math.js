// 1. 모듈로 내보내는 방식
// function add(a, b) {
//     return a + b;
// } 

// module.exports = add; // 모듈 그 자체, 바로 add 함수를 할당.




// 2. 모듈을 호출했을 때 add 키 값에 (a,b) {return a+b;} 익명함수가 할당되는 방법이다.
// exports.add = function(a, b) {
//     return a + b;
// } 

// 모듈을 호출했을 때, add 키 값에는 add 변수 함수가 가지고 있는 값이 할당됨. 3번과 동일한 방법으로 실행 가능.
const add = (a,b) => { 
    return a + b; 
}
exports.add = add;

// // 3. module exports 자체를 객체로 내보내는 방법
// function add(a, b) {
//     return a + b;
// } 

// module.exports = {add: add}; // 모듈 호출 시 add 키 값에는 add 함수가 들어감.

