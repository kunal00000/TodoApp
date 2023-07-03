import express from "express";
import {
  getAllTodos,
  getTodoByID,
  postTodo,
  updateTodoByID,
  deleteTodoByID,
} from "../controllers/todoControllers";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getTodoByID);
router.post("/", postTodo);
router.put("/:id", updateTodoByID);
router.delete("/:id", deleteTodoByID);

export default router;
