import Balance from "../../../domain/Balance";
import { IBalanceRepo } from "../../../repos/BalanceRepo";

export default class UpdateBalance {
  private repository: IBalanceRepo;

  constructor(repository: IBalanceRepo) {
    this.repository = repository;
  }

  execute = async (balance: Balance) => {
    const updatedBalance = await this.repository.updateBalance(balance);

    return updatedBalance;
  };
}
