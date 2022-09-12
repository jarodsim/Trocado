import User from "../../../domain/User";
import { IUserRepo } from "../../../repos/UserRepo";

export default class UpdateUser {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  execute = async (user: User) => {
    const updatedUser = await this.repository.updateUser(user);

    return updatedUser;
  };
}
