import { Router } from "express";
import { createTodo, getAllTodos, removeTodo, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.get(
  "/todo/all",
  getAllTodos
);

router.post(
  "/todo/create",
  createTodo
);

router.put(
  "/todo/edit",
  updateTodo
);

router.delete(
  "/todo/remove",
  removeTodo
);

export default router