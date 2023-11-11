// const mongoose = require('mongoose')

// const TodoSchema = new mongoose.Schema({
//   value: String, // 할일이 어떤것인지
//   doneAt: Date, // 할일 언제 완료했는지?
//   order: Number, // 몇번째 할일?
// })

// // 프론트엔드 사용을 위해
// // 데이터 조회를 할때 자동으로 생성되는 가상의 칼럼을 만듬
// // todoId 가져오려고 할 때 어떤 값으로 가져올것인지
// // virtual로 등록된 todoId 값이 MongoDB에는 존재하지 않지만, mongoose를 이용해 조회하였을 때는 값이 존재하는것을 확인할 수 있습니다.
// TodoSchema.virtual('todoId').get(() => {
//   return this._id.toHexString()
// })
// // JSON 타입으로 Schema를 변환할 때 가상값(virtual)을 반환하도록 설정하는 것 입니다.
// TodoSchema.set('toJSON', { virtuals: true })
// module.exports = mongoose.model('Todo', TodoSchema)

// models/todo.js

const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  value: String,
  doneAt: Date,
  order: Number,
})
TodoSchema.virtual('todoId').get(function () {
  return this._id.toHexString()
})
TodoSchema.set('toJSON', {
  virtuals: true,
})
module.exports = mongoose.model('Todo', TodoSchema)
