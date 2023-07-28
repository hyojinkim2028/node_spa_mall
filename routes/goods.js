const express = require("express"); // express 객체를 만들어 express 라이브러리를 받음 
const router = express.Router(); //  받아온 express객체의 Router() 함수를 실행해 router 변수를 만들어 결과값을 받아오게 함.


// 상품 목록 조회 API
router.get("/goods", (req,res) => {
    res.json({goods : goods}) // goods 라는 키로 벨류값으로 위에 선언해놓은 객체 goods 가져옴
});

// 상품 상세 조회 API
router.get("/goods/:goodsId", (req,res) => {
    const {goodsId} = req.params; // 구조분해할당
    // let result = null;
    // for (const good of goods) {
    //     if(Number(goodsid) === good.goodsId) {
    //         result = good; 
    //     }
    // }
    const [detail] = goods.filter((goods) => Number(goodsId) === goods.goodsId)
    res.json({ detail});
});

const Cart = require("../schemas/cart.js");
router.post("/goods/:goodsId/cart", async(req,res) => {
    const {goodsId} = req.params; // 구조분해할당
    const {quantity} = req.body; // 구조분해할당

    const existsCarts = await Cart.find({goodsId});
    if (existsCarts.length) {
        return res.status(400).json({
            success:false,
            errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
        })
    }

    await Cart.create({goodsId, quantity}); // goodsId, quantity 해당하는 값을 cart라는 스키마를 통해 만듦

    res.json({result : "success"}) // 잘 만들어졌을 때 응답값
})

router.put("/goods/:goodsId/cart" , async(req,res) => {
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const existsCarts = await Cart.find({goodsId});
    if (existsCarts.length) {
        await Cart.updateOne(
            {goodsId: goodsId}, // goodsId에 해당하는 값이 있을 때 
            {$set: {quantity: quantity}} // 수량을 수량(변수)에 있는 값으로 수정
            )
    }
    res.status(200).json({success:true}); // existsCarts의 값 존재 여부와 무관하게 true 반환. 값이 없어도 에러 X
})

router.delete("/goods/:goodsId/cart", async(req, res) => {

    const {goodsId} = req.params;

    const existsCarts = await Cart.find({goodsId})
    if (existsCarts.length) {
        await Cart.deleteOne({goodsId});
    }

    res.json({result:"success"});
})

const Goods = require("../schemas/goods.js");
router.post("/goods/", async(req,res) => { // async -> 동기적으로 처리할 수 있도록 
    const {goodsId, name, thumbnailUrl, category, price } = req.body; // body로 post한 값 가져옴. 구조분해할당

    // goodsid는 unique로 설정했기 때문에 같은 값 있는지 여부 확인 먼저함.
    // await : 데이터를 가져오는 동안 다음으로 넘어가지 않고 동기적으로 처리할거다. 다음 명령은 그 이후에 진행해라
    const goods = await Goods.find({goodsId}) 

    if (goods.length) { // find 했을 때 같은 아이디의 객체가 존재한다면 (length가 true라면 반환값이 있다는 의미므로)
        return res.status(400).json({
            success: false,
            errorMessage: "이미 존재하는 GoodsId입니다."
        });
    }

    // id 중복값 검사후 생성된 goods를 createdGoods 변수에 담음
    const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});
    // 완료하면 createdGoods를 goods라는 키값으로 반환할것이다.
    res.json({goods: createdGoods})
})

module.exports = router; // router 라는 변수를 module.exports를 통해 밖으로 내보내줌.