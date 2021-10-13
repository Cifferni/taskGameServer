const Koa = require("koa");
const routes = require("./routes");
const logsUtil = require("./utils/ log4j");
const config = require("./config/index");

const app = new Koa();
app.use(logsUtil());
app.use(async (ctx, next) => {
  const start = new Date();
  let ms = new Date() - start;
  await next();
  try {
    if (ctx.status === 404) {
      ctx.throw(404);
    }
    ms = new Date() - start;
    ctx.logger.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    ctx.logger.logError(ctx, error, ms);
  }
});
app.use(routes.routes(), routes.allowedMethods());
app.listen(config.port, () => {
  console.log(`starting at port ${config.port}`);
});
