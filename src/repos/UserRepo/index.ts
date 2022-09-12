import { DataSource } from "typeorm";
import { myDataSource } from "../../config/db";
import User from "../../domain/User";
import { User as UserEntity } from "../../entity/User";

export interface IUserRepo {
  findUserByEmail: (email: string) => Promise<User | null>;
  createUser: (user: User) => Promise<User>;
  updateUser: (user: User) => Promise<User>;
  getUser: (id: number) => Promise<User | null>;
  selectUsers: (limit: number, offset: number) => Promise<User[]>;
  deleteUser: (id: number) => Promise<User>;
}

export default class UserRepository implements IUserRepo {
  private ormRepository: DataSource;

  constructor() {
    this.ormRepository = myDataSource;
  }

  createUser = async (user: User) => {
    const userSaved = await this.ormRepository.manager
      .save(UserEntity, {
        id: user.id,
        email: user.email,
      })
      .catch((error) => {
        throw new Error(`Error on create user repo: ${error}`);
      });

    return userSaved;
  };

  getUser = async (id: number): Promise<User> => {
    const user = await this.ormRepository.manager
      .findOneBy(UserEntity, { id })
      .catch((error) => {
        throw new Error(`Error on get user repo: ${error}`);
      });

    return user;
  };

  updateUser = async (user: User): Promise<User> => {
    await this.ormRepository.manager
      .update(
        UserEntity,
        {
          id: user.id,
        },
        {
          email: user.email,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update user repo: ${error}`);
      });

    return user;
  };

  deleteUser = async (id: number): Promise<User> => {
    const deletedUser = await this.ormRepository.manager.findOneBy(UserEntity, {
      id,
    });
    await this.ormRepository.manager
      .delete(UserEntity, {
        id: deletedUser.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete user repo: ${error}`);
      });

    return deletedUser;
  };

  findUserByEmail = async (email: string) => {
    const user = await this.ormRepository.manager
      .findOne(UserEntity, {
        where: {
          email: email,
        },
      })
      .catch((error) => {
        throw new Error(`Error on find user by email repo: ${error}`);
      });

    return user;
  };

  selectUsers = async (limit: number, offset: number): Promise<User[]> => {
    const skip = limit * offset - limit;

    const users = await this.ormRepository.manager
      .find(UserEntity, {
        take: limit,
        skip: skip,
      })
      .catch((error) => {
        throw new Error(`Error on select users repo: ${error}`);
      });

    return users;
  };
}
