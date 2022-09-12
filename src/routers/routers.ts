import { Router } from "express";

import UserController from "../controller/userController";

export const routers = Router();

const userController = new UserController();

routers.post("/user", userController.createUser);
routers.put("/user", userController.updateUser);
routers.get("/user/:id", userController.getUser);
routers.delete("/user/:id", userController.deleteUser);
routers.get("/users", userController.selectUsers);
