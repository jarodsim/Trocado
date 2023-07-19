import { DataSource } from "typeorm";
import { myDataSource } from "../../config/db";
import Balance from "../../domain/Balance";
import { Balance as BalanceEntity } from "../../entity/Balance";

export interface IBalanceRepo {
  createBalance: (balance: Balance) => Promise<Balance>;
  getBalance: (id: string) => Promise<Balance>;
  updateBalance: (balance: Balance) => Promise<Balance>;
  deleteBalance: (id: string) => Promise<Balance>;
}

export default class BalanceRepository implements IBalanceRepo {
  private ormRepository: DataSource;

  constructor() {
    this.ormRepository = myDataSource;
  }

  createBalance = async (balance: Balance) => {
    const balanceSaved = await this.ormRepository.manager
      .save(BalanceEntity, {
        id: balance.id,
        total: balance.total,
      })
      .catch((error) => {
        throw new Error(`Error on create balance repo: ${error}`);
      });

    return balanceSaved;
  };

  getBalance = async (id: string) => {
    const balance = await this.ormRepository.manager
      .findOneBy(BalanceEntity, { id })
      .catch((error) => {
        throw new Error(`Error on get balance repo: ${error}`);
      });

    return balance;
  };

  updateBalance = async (balance: Balance) => {
    await this.ormRepository.manager
      .update(
        BalanceEntity,
        {
          id: balance.id,
        },
        {
          total: balance.total,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update balance repo: ${error}`);
      });

    return balance;
  };

  deleteBalance = async (id: string) => {
    const deletedBalance = await this.ormRepository.manager.findOneBy(
      BalanceEntity,
      {
        id,
      }
    );
    await this.ormRepository.manager
      .delete(BalanceEntity, {
        id: deletedBalance.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete balance repo: ${error}`);
      });

    return deletedBalance;
  };
}
