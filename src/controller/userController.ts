import { Request, Response } from "express";
import User from "../domain/User";
import { IUserRepo } from "../repos/UserRepo";
import UserRepository from "../repos/UserRepo";

import CreateUserUseCase from "../useCases/user/createUser";
import UpdateUserUseCase from "../useCases/user/updateUser";
import GetUserUseCase from "../useCases/user/getUser";
import DeleteUserUseCase from "../useCases/user/deleteUser";
import SelectUsersUseCase from "../useCases/user/selectUsers";

export default class UserController {
  private userRepository: IUserRepo;

  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = (req: Request, res: Response) => {
    const createUserUseCase = new CreateUserUseCase(this.userRepository);

    createUserUseCase
      .execute(new User(req.body))
      .then((userResponse) => {
        res.json(userResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error when creating a new user");
      });
  };

  getUser = (req: Request, res: Response) => {
    const getUserUseCase = new GetUserUseCase(this.userRepository);

    const { id } = req.params;

    getUserUseCase
      .execute(id)
      .then((userResponse) => {
        res.json(userResponse);
      })
      .catch((err) => {
        res.status(404).send(err.message || "Error to get an user");
      });
  };

  updateUser = (req: Request, res: Response) => {
    const updateUserUseCase = new UpdateUserUseCase(this.userRepository);

    updateUserUseCase
      .execute(new User(req.body))
      .then((userResponse) => {
        res.json(userResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to update an user");
      });
  };

  deleteUser = (req: Request, res: Response) => {
    const deleteUserUseCase = new DeleteUserUseCase(this.userRepository);

    const { id } = req.params;

    deleteUserUseCase
      .execute(id)
      .then((userResponse) => {
        res.json(userResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to delete an user");
      });
  };

  selectUsers = (req: Request, res: Response) => {
    const selectUserUseCase = new SelectUsersUseCase(this.userRepository);

    const { limit = 10, offset = 1 } = req.query;

    selectUserUseCase
      .execute(Number(limit), Number(offset))
      .then((userResponse) => {
        res.json(userResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to select users");
      });
  };
}
