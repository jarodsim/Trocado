import Balance from "../../../domain/Balance";
import { IBalanceRepo } from "../../../repos/BalanceRepo";

export default class CreateBalance {
  private repository: IBalanceRepo;

  constructor(repository: IBalanceRepo) {
    this.repository = repository;
  }

  execute = async (balance: Balance) => {
    const createdBalance = await this.repository.createBalance(balance);

    return createdBalance;
  };
}
