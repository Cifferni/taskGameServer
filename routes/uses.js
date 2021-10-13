const router = require("koa-router")();
const ModelDb = require('../db')
router.get("/", async (ctx, next) =>{
  let data = await ModelDb.query({id:"6165535091e677d0b3872aa1"});
  ctx.body = data;
});

router.get("/child",  (ctx, next) => {
  ctx.body = "demo child";
});

module.exports = router;
