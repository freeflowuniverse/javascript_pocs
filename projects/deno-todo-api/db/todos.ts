import { v4 } from "https://deno.land/std@0.106.0/uuid/mod.ts";
import { ITodo } from "../types/index.ts";

class TodoDB {
  private todos: ITodo[] = [];

  public readAll(): Promise<ITodo[]> {
    return new Promise((res) => {
      return res(this.todos);
    });
  }

  public readOne(id: string): Promise<ITodo> {
    return new Promise((res, rej) => {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        return res(todo);
      }
      return rej(new Error("Todo was not found."));
    });
  }

  public create(body: string): Promise<ITodo> {
    return new Promise((res) => {
      const todo: ITodo = {
        id: v4.generate(),
        body,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      this.todos.push(todo);
      return res(todo);
    });
  }

  public update(id: string, data: Partial<ITodo>): Promise<ITodo> {
    return new Promise((res, rej) => {
      const idx = this.todos.findIndex((t) => t.id === id);
      if (idx === -1) {
        return rej(new Error("Todo was not found."));
      }
      this.todos[idx] = {
        ...this.todos[idx],
        ...data,
      };
      return res(this.todos[idx]);
    });
  }

  public remove(id: string): Promise<ITodo> {
    return new Promise((res, rej) => {
      const idx = this.todos.findIndex((t) => t.id === id);
      if (idx === -1) {
        return rej(new Error("Todo was not found."));
      }
      const todo = this.todos[idx];
      this.todos.splice(idx, 1);
      return res(todo);
    });
  }
}

export const todos = new TodoDB();
