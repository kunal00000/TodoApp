import type { Request, Response } from "express";
import Task from "../models/todoModel";

export async function getAllTodos(req: Request, res: Response) {
  const todos = await Task.find({});
  res.status(200).json(todos);
}

export async function getTodoByID(req: Request, res: Response) {
  const todoFound = await Task.findById(req.params.id);

  if (todoFound) {
    res.json(todoFound);
  } else {
    res.status(404).send(`No todo found with id = ${req.params.id}!`);
  }
}

export async function postTodo(req: Request, res: Response) {
  const newTodo = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    updatedAt: new Date() as Date,
  });
  await newTodo.save();
  res.status(201).send(newTodo);
}

export async function updateTodoByID(req: Request, res: Response) {
  const found = await Task.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updatedAt: new Date(),
  });

  if (!found) {
    res.status(404).send(`No todo found with id = ${req.params.id}!`);
  } else {
    res.sendStatus(200);
  }
}

export async function deleteTodoByID(req: Request, res: Response) {
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted");
}
