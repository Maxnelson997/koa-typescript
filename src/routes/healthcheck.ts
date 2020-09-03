
import Router from "koa-router";
const router = new Router();

router.get('/whats', async (ctx) => {
    try {
        ctx.body = {
            success: "success",
            data: 'good'
        }
    } catch (err) {
        console.error(err)
    }
});

export default router;