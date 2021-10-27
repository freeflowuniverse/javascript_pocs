import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { todos } from "../db/todos.ts";
import { TodoGetParams, CreateTodo, ITodo } from "../types/index.ts";

const todoRoutes = new Router({
  prefix: "/api/v1/todos",
});

todoRoutes.get("/", async ({ response }) => {
  try {
    response.status = 200;
    response.body = await todos.readAll();
  } catch {
    response.status = 500;
    response.body = {
      message: "Internal Server Error.",
    };
  }
});

todoRoutes.get("/:id", async ({ response, params }) => {
  try {
    const { id } = params as TodoGetParams;
    const todo = await todos.readOne(id);
    response.status = 200;
    response.body = {
      todo,
    };
  } catch {
    response.status = 404;
    response.body = {
      message: "Todo was not found.",
    };
  }
});

todoRoutes.post("/", async ({ request, response }) => {
  const bodyBuffer = request.body();
  if (!request.hasBody || bodyBuffer.type !== "json") {
    response.status = 401;
    response.body = {
      message: "Bad Request.",
    };
    return;
  }

  try {
    const { body } = (await bodyBuffer.value) as CreateTodo;
    const todo = await todos.create(body);
    response.status = 201;
    response.body = todo;
  } catch {
    response.status = 500;
    response.body = {
      message: "Internal Server Error.",
    };
  }
});

todoRoutes.put("/:id", async ({ params, request, response }) => {
  const bodyBuffer = request.body();
  if (!request.hasBody || bodyBuffer.type !== "json") {
    response.status = 401;
    response.body = {
      message: "Bad Request.",
    };
    return;
  }

  try {
    const body = (await bodyBuffer.value) as Partial<ITodo>;
    const { id } = params as TodoGetParams;
    const todo = await todos.update(id, body);
    response.status = 202;
    response.body = todo;
  } catch {
    response.status = 404;
    response.body = {
      message: "Todo was not found.",
    };
  }
});

todoRoutes.delete("/:id", async ({ params, response }) => {
  try {
    const { id } = params as TodoGetParams;
    const todo = await todos.remove(id);
    response.status = 202;
    response.body = todo;
  } catch {
    response.status = 404;
    response.body = {
      message: "Todo was not found.",
    };
  }
});

export default todoRoutes;
