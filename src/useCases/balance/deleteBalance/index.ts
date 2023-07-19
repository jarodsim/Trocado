import { IBalanceRepo } from "../../../repos/BalanceRepo";

export default class DeleteBalance {
  private repository: IBalanceRepo;

  constructor(repository: IBalanceRepo) {
    this.repository = repository;
  }

  execute = async (id: string) => {
    const deletedBalance = await this.repository.deleteBalance(id);

    return deletedBalance;
  };
}
