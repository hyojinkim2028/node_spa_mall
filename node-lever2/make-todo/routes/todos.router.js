const express = require('express')
const Todo = require('../models/todo.js')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('hi')
})

router.post('/todos', async (req, res) => {
  const { value } = req.body
  const maxOrderByUserId = await Todo.findOne().sort('-order').exec() // 내림차순

  // maxOrderByUserId 있는 경우 해당 값에 +1, 없으면 그냥 초기값에 1을 줌
  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1

  const todo = new Todo({ value, order }) // shorthand property
  await todo.save() // 저장

  res.send({ todo }) // 서버에 전달
})

router.get('/todos', async (req, res) => {
  const todos = await Todo.find().sort('-order').exec() // 내림차순 정렬
  res.send({ todos })
})

router.patch('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params
  const { order } = req.body

  // 1. todoId에 해당하는 할 일이 있는가?
  // 1-1. todoId에 해당하는 할 일이 없으면, 에러 출력
  const currentTodo = await Todo.findById(todoId) // _id 부분 조회
  if (!currentTodo) {
    return res.status(400).json({ errorMessage: '존재하지 않는 할 일 입니다.' })
  }

  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec()
    // 바꾸려는 대상 우선순위를 조회해서 존재하면 서로 자리 바꿈
    if (targetTodo) {
      targetTodo.order = currentTodo.order
      await targetTodo.save()
    }
    currentTodo.order = order
    await currentTodo.save()
  }

  res.send()
})

module.exports = router
