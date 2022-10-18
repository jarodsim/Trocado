import { Router } from "express";

import UserController from "../controller/userController";
import CategoryController from "../controller/categoryController";

export const routers = Router();

const userController = new UserController();
const categoryController = new CategoryController();

routers.post("/user", userController.createUser);
routers.put("/user", userController.updateUser);
routers.get("/user/:id", userController.getUser);
routers.delete("/user/:id", userController.deleteUser);
routers.get("/users", userController.selectUsers);

routers.post("/category", categoryController.createCategory);
routers.put("/category", categoryController.updateCategory);
routers.get("/category/:id", categoryController.getCategory);
routers.delete("/category/:id", categoryController.deleteCategory);
routers.get("/categories", categoryController.selectCategorys);
