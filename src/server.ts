import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import Router from "koa-router";

const app = new Koa();

const PORT = process.env.PORT || 8080;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());

const router = new Router();

router.get('/', async (ctx) => {
    try {
        ctx.body = {
            success: "success"
        };
    } catch (err) {
        console.error(err)
    }
})

app.use(router.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;