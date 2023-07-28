const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  name:{ 
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  }
});

module.exports = mongoose.model("Defaults", goodsSchema);//Defaults 라는 모델명으로 defaultSchema를 사용할거다