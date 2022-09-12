import { IUserRepo } from "../../../repos/UserRepo";

export default class SelectUsers {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  execute = async (limit: number, offset: number) => {
    const users = await this.repository.selectUsers(limit, offset);

    return users;
  };
}
