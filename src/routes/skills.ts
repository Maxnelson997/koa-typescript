import { Context } from "koa";
import Router from "koa-router";
import { AddSkillRequest } from "../request/AddSkillRequest";
import { validate } from "class-validator";
import * as storage from "../storage/redis";
import { DeleteSkillRequest } from "../request/DeleteSkillRequest";

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

    console.log("nice storage", storage);

    const store = storage.redisStorage();
    const list_name = "my_skill_list";

    await store.add(list_name, addSkillRequest.skill);

    ctx.status = 201;
    ctx.body = {
      skills:
        // ctx.request.body.skill,
        await store.get(list_name)
    };
  } catch (err) {
    console.error(err);
  }
});

router.delete(`/skills`, async (ctx: Context) => {
  try {
    const validatorOptions = {};

    const skill = new DeleteSkillRequest();
    skill.skill = ctx.request.body.name || "";

    const errors = await validate(skill, validatorOptions);

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        data: errors
      };

      return ctx;
    }

    const list = "skill_list";
    const store = storage.redisStorage();

    store.remove(list, skill.skill);

    ctx.status = 200;
    ctx.body = {
      skills: await store.get(list)
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
