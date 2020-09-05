import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import healthcheck from "./routes/healthcheck";
import skills from "./routes/skills";
import { config } from "./config";

const app = new Koa();
const PORT = config.port;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());

app.use(healthcheck.routes());
app.use(skills.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;
