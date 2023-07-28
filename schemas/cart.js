const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  goodsId: { 
    type: Number,
    required: true,
    unique: true
  },
  quantity: { // 수량
    type: Number,
    require: true, // 0개든 1개든 갯수는 무조건 존재
  }
});

module.exports = mongoose.model("Cart", cartSchema);