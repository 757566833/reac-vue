const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();
app.use(cors({
  origin: "*",
  exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
  maxAge: 50000,
  credentials: true,
  allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "Accept"],
}));
// router.get()
router.get(/(.*?)/g, async (ctx) => {
  const url = ctx.path;
  if (url.includes('.')) {
    await send(ctx, ctx.path, {
      root: path.join(__dirname, 'dist'),
      maxAge: 365 * 24 * 60 * 60 * 1000
    });
  } else {
    await send(ctx, './index.html', {
      root: path.join(__dirname, 'dist'),
      maxAge: 0
    });
  }
})


app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);