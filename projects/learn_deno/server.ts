import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import productsRouter from "./routes/products.ts";

const port = 5000;
const app = new Application();

app.use(productsRouter.routes());
app.use(productsRouter.allowedMethods());

await app.listen({ port });
