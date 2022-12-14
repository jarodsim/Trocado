import { IUserRepo } from "../../../repos/UserRepo";

export default class DeleteUser {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const deletedUser = await this.repository.deleteUser(id);

    return deletedUser;
  };
}
