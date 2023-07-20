import { Request, Response } from "express";
import User from "../domain/User";
import { IUserRepo } from "../repos/UserRepo";
import UserRepository from "../repos/UserRepo";

import CreateUserUseCase from "../useCases/user/createUser";
import UpdateUserUseCase from "../useCases/user/updateUser";
import GetUserUseCase from "../useCases/user/getUser";
import DeleteUserUseCase from "../useCases/user/deleteUser";
import SelectUsersUseCase from "../useCases/user/selectUsers";
import { errorLabels } from "../erros/labels";
import { isEmail } from "../utils/isEmail";
import { isPasswordStrong } from "../utils/isPasswordStrong";

import admin from "firebase-admin";

import { randomUUID } from "crypto";
import { validateEntity } from "../services/validateEntity";

export default class UserController {
  private userRepository: IUserRepo;

  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = (req: Request, res: Response) => {
    const createUserUseCase = new CreateUserUseCase(this.userRepository);

    const { email, password, name, surname } = req.body;

    if (!name || !surname) {
      return res.status(400).send(errorLabels.nameAndSurnameRequired);
    }

    if (!email || !password) {
      return res.status(400).send(errorLabels.emailAndPasswordRequired);
    }

    if (!isEmail(email)) {
      return res.status(400).send(errorLabels.emailInvalid);
    }

    if (isPasswordStrong(password)) {
      return res.status(400).send(errorLabels.passwordWeak);
    }

    try {
      const id = randomUUID();
      const auth = admin.auth();

      // creating user in firebase
      auth
        .createUser({
          email,
          password,
          disabled: false,
          displayName: name,
          uid: id,
        })
        .then((userRecord) => {
          const user = new User({
            id: userRecord.uid,
            email: userRecord.email,
            name,
            surname,
          });

          // creating user in database
          createUserUseCase
            .execute(user)
            .then((userResponse) => {
              res.json(userResponse);
            })
            .catch((err) => {
              res.status(500).send(errorLabels.errorWhenCreatingUser);
            });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-exists":
              return res.status(400).send(errorLabels.emailAlreadyExists);
            case "auth/invalid-email":
              return res.status(400).send(errorLabels.emailInvalid);
            case "auth/operation-not-allowed":
              return res.status(400).send(errorLabels.operationNotAllowed);
            default:
              return res.status(500).send(errorLabels.errorWhenCreatingUser);
          }
        });
    } catch (error) {
      res.status(500).send(errorLabels.errorWhenCreatingUser);
    }
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
        res.status(404).send(errorLabels.userNotFound);
      });
  };

  updateUser = (req: Request, res: Response) => {
    const updateUserUseCase = new UpdateUserUseCase(this.userRepository);

    const entityValidated = validateEntity("user", req.body);
    if (!entityValidated.success) {
      return res.status(400).send(entityValidated.error);
    }

    updateUserUseCase
      .execute(new User(req.body))
      .then((userResponse) => {
        res.json(userResponse);
      })
      .catch((err) => {
        res.status(500).send(errorLabels.errorWhenUpdatingUser);
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
        res.status(500).send(errorLabels.errorWhenDeletingUser);
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
        res.status(500).send(errorLabels.errorWhenSelectUsers);
      });
  };
}
