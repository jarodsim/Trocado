import { IBalanceRepo } from "../../../repos/BalanceRepo";

export default class GetBalance {
  private repository: IBalanceRepo;

  constructor(repository: IBalanceRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const balance = await this.repository.getBalance(id);

    return balance;
  };
}
