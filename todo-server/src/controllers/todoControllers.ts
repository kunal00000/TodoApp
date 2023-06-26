import type { Request, Response } from "express";
import { TodoSchema, type Todo } from "@/models/todo";
import { z } from "zod";
import { readTodosFromFile, writeTodosToFile } from "../utils/fileSystem";

let todos: Todo[];

readTodosFromFile()
  .then((data) => {
    todos = data;
  })
  .catch((err) => console.log(err));

export function getAllTodos(req: Request, res: Response) {
  res.status(200).json(todos);
}

export function getTodoByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const todoFound = todos.find((todo: Todo) => todo.id === id);

  if (todoFound) {
    res.json(todoFound);
  } else {
    res.status(404).send(`No todo found with id = ${id}!`);
  }
}

export async function postTodo(req: Request, res: Response) {
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    updatedAt: new Date() as Date,
  };

  const safeNewTodo = TodoSchema.parse(newTodo);
  todos.push(safeNewTodo);

  writeTodosToFile(todos)
    .then(() => {
      res.status(201).send(newTodo);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}

export async function updateTodoByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const idx = todos.findIndex((todo: Todo) => todo.id === id);

  if (idx === -1) {
    res.status(404).send(`No todo found with id = ${id}!`);
  } else {
    todos[idx].title = req.body.title;
    todos[idx].description = req.body.description ? req.body.description : "";
    todos[idx].status = req.body.status;
    todos[idx].updatedAt = new Date();

    const safeTodo = TodoSchema.safeParse(todos[idx]);

    if (safeTodo.success) {
      writeTodosToFile(todos)
        .then(() => {
          res.status(200).send(todos[idx]);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  }
}

export async function deleteTodoByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const idx = todos.findIndex((todo: Todo) => todo.id === id);

  if (idx == -1) {
    res.status(404).send(`No todo found with id = ${id}!`);
  } else {
    todos.splice(idx, 1);

    writeTodosToFile(todos)
      .then(() => {
        res.status(200).send("Deleted");
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
}
