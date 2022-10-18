import { Router } from "express";

import UserController from "../controller/userController";
import BalanceController from "../controller/balanceControllers";
import CategoryController from "../controller/categoryController";

export const routers = Router();

const userController = new UserController();
const balanceController = new BalanceController();
const categoryController = new CategoryController();

routers.post("/user", userController.createUser);
routers.put("/user", userController.updateUser);
routers.get("/user/:id", userController.getUser);
routers.delete("/user/:id", userController.deleteUser);
routers.get("/users", userController.selectUsers);

routers.post("/balance", balanceController.createBalance);
routers.get("/balance/:id", balanceController.getBalance);
routers.put("/balance", balanceController.updateBalance);
routers.delete("/balance/:id", balanceController.deleteBalance);

routers.post("/category", categoryController.createCategory);
routers.put("/category", categoryController.updateCategory);
routers.get("/category/:id", categoryController.getCategory);
routers.delete("/category/:id", categoryController.deleteCategory);
routers.get("/categories", categoryController.selectCategorys);
