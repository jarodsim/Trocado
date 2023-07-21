import { Repository } from "typeorm";
import { myDataSource } from "../../config/db";
import User from "../../domain/User";
import { User as UserEntity } from "../../entity/User";

export interface IUserRepo {
  findUserByEmail: (email: string) => Promise<User | null>;
  createUser: (user: User) => Promise<User>;
  updateUser: (user: User) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;
  selectUsers: (limit: number, offset: number) => Promise<User[]>;
  deleteUser: (id: string) => Promise<User>;
  isEmpty: () => Promise<boolean>;
}

export default class UserRepository implements IUserRepo {
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = myDataSource.getRepository(UserEntity);
  }

  createUser = async (user: User) => {
    const userSaved = await this.ormRepository
      .save({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      })
      .catch((error) => {
        throw new Error(`Error on create user repo: ${error}`);
      });

    return userSaved;
  };

  getUser = async (id: string): Promise<User> => {
    const user = await this.ormRepository.findOneBy({ id }).catch((error) => {
      throw new Error(`Error on get user repo: ${error}`);
    });

    return user;
  };

  updateUser = async (user: User): Promise<User> => {
    await this.ormRepository
      .update(
        {
          id: user.id,
        },
        {
          email: user.email,
          name: user.name,
          surname: user.surname,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update user repo: ${error}`);
      });

    return user;
  };

  deleteUser = async (id: string): Promise<User> => {
    const deletedUser = await this.ormRepository.findOneBy({
      id,
    });
    await this.ormRepository
      .delete({
        id: deletedUser.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete user repo: ${error}`);
      });

    return deletedUser;
  };

  findUserByEmail = async (email: string) => {
    const user = await this.ormRepository
      .findOne({
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

    const users = await this.ormRepository
      .find({
        take: limit,
        skip: skip,
      })
      .catch((error) => {
        throw new Error(`Error on select users repo: ${error}`);
      });

    return users;
  };

  isEmpty = async (): Promise<boolean> => {
    const users = await this.ormRepository.find().catch((error) => {
      throw new Error(`Error on check if user table is empty: ${error}`);
    });

    return users.length === 0;
  };
}
