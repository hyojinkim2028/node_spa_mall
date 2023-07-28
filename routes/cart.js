const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// localhost: 3000.api/carts GET Method 
router.get("/carts", async(req,res) => {
    const carts = await Cart.find({}); // cart 안의 모든 정보를 가져와서 이 정보를 cart라는 변수에 할당
    // [
    //     {goodsId, quantity}
    //     {goodsId, quantity}
    // ]
    const goodsIds = carts.map((cart)=>{
        return cart.goodsId; // cart의 goodsId만 추출
    })
    // [1,4];

    const goods = await Goods.find({goodsId: goodsIds}); // 스키마 find
    // Goods에 해당하는 모든 정보를 가지고 올건데
    // goodsIds 변수 안에 존재하는 값일 때에만 조회하라. (goods 중 cart에 들어간 id의 정보만 가져올 수 있게)

    const results = carts.map((cart) => {
        return { 
            "quantity": cart.quantity, // 장바구니 item의 갯수
            "goods": goods.find((item) => item.goodsId === cart.goodsId), // array find
            // goods의 id와 cart에 들어간 id 가 같은 경우에만 반환(map 함수를 통해 반복문)
        }
    })

    res.json({
        "cart" : results,
    })
});


module.exports = router;