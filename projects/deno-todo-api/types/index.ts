export interface ITodo {
  id: string;
  body: string;
  completed: boolean;
  createdAt: string /* Date */;
}

export type TodoGetParams = { id: string };
export type CreateTodo = { body: string };
