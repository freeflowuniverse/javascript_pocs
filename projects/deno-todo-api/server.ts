import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import todoRoutes from "./routes/todo.ts";

new Application()
  .use(todoRoutes.routes())
  .use(todoRoutes.allowedMethods())
  .listen({
    port: 5000,
  });
