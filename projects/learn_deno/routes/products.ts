import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const router = new Router();

router.post("/api/v1/products", async ({ response, request }) => {
  const b = request.body();

  console.log(b.type, await b.value);

  response.body = {
    hello: "world",
  };
});

export default router;
