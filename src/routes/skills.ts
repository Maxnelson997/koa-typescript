import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.post("/skills", async (ctx: Context) => {
  try {
    ctx.status = 201;
    ctx.body = {
      skills: [ctx.request.body.skill]
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
