import type { Todo } from "@/models/todo";
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data.json");

export const readTodosFromFile = (): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf-8", (error: Error, data: string) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data) satisfies Todo[]);
      }
    });
  });
};

export const writeTodosToFile = (todos: Todo[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath,
      JSON.stringify(todos, null, 2),
      "utf-8",
      (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};
