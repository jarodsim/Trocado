import { Router } from "express";

import UserController from "../controller/userController";
import BalanceController from "../controller/balanceControllers";
import CategoryController from "../controller/categoryController";
import MovementController from "../controller/movementControllers";
import AuthController from "../controller/authController";
import { validateToken } from "../middlewares/auth";

export const routers = Router();

const userController = new UserController();
const balanceController = new BalanceController();
const categoryController = new CategoryController();
const movementController = new MovementController();
const authController = new AuthController();

routers.post("/user", userController.createUser);
routers.put("/user", validateToken, userController.updateUser);
routers.get("/user/:id", validateToken, userController.getUser);
routers.delete("/user/:id", validateToken, userController.deleteUser);
routers.get("/users", validateToken, userController.selectUsers);

routers.post("/balance", validateToken, balanceController.createBalance);
routers.get("/balance/:id", validateToken, balanceController.getBalance);
routers.put("/balance", validateToken, balanceController.updateBalance);
routers.delete("/balance/:id", validateToken, balanceController.deleteBalance);

routers.post("/category", validateToken, categoryController.createCategory);
routers.put("/category", validateToken, categoryController.updateCategory);
routers.get("/category/:id", validateToken, categoryController.getCategory);
routers.delete(
  "/category/:id",
  validateToken,
  categoryController.deleteCategory
);
routers.get("/categories", validateToken, categoryController.selectCategorys);

routers.post("/movement", validateToken, movementController.createMovement);
routers.put("/movement", validateToken, movementController.updateMovement);
routers.get("/movement/:id", validateToken, movementController.getMovement);
routers.delete(
  "/movement/:id",
  validateToken,
  movementController.deleteMovement
);
routers.get("/movements", validateToken, movementController.selectMovements);

routers.post("/login", authController.login);
routers.get("/logout", validateToken, authController.logout);
