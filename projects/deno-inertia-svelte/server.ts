import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { Inertia } from "https://deno.land/x/oak_inertia@v0.2.1/mod.ts";

const app = new Application();

const inertia = new Inertia(
  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deno and Inertia app</title>
</head>
<body>
  @inertia
  <script type="module" src="/main.js"></script>
</body>
</html>
`,
  () => "1"
);
app.use(inertia.initMiddleware());

const router = new Router();

router.get("/", () => {
  inertia.render("Counter", {
    hello: "world",
  });
});

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) return false;
    throw e;
  }
}

app
  .use(async function (ctx, next) {
    const path = `${Deno.cwd()}/src${ctx.request.url.pathname}`;
    if (await fileExists(path)) {
      await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/src`,
      });
    } else {
      next();
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port: 5000 })
  .then(() => {
    console.log("Server running on port 5000.");
  })
  .catch(() => {
    console.log("Something went wrong while starting server");
  });
