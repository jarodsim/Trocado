import { IUserRepo } from "../../../repos/UserRepo";

export default class GetUser {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const user = await this.repository.getUser(id);

    return user;
  };
}
