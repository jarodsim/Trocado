import User from "../../../domain/User";
import { IUserRepo } from "../../../repos/UserRepo";

export default class CreateUser {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  execute = async (user: User) => {
    const createdUser = await this.repository.createUser(user);

    return createdUser;
  };
}
