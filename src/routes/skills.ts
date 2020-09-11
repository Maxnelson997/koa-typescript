import { Context } from "koa";
import Router from "koa-router";
import { AddSkillRequest } from "../request/AddSkillRequest";
import { validate } from "class-validator";
// import { redisStorage } from "../../src/storage/redis";

const router = new Router();

// router.get('/skills', async (ctx: Context) => {
//   try {
//     const skills = redisStorage.get()
//   } catch (err) {
//     console.error(err)
//   }
// })

router.post("/skills", async (ctx: Context) => {
  try {
    const validationOpts = {};

    const addSkillRequest = new AddSkillRequest();
    addSkillRequest.skill = ctx.request.body.skill || "";

    const errors = await validate(addSkillRequest, validationOpts);

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        data: errors
      };

      return ctx;
    }

    ctx.status = 201;
    ctx.body = {
      skills: [ctx.request.body.skill]
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
