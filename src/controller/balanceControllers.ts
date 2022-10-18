import { Request, Response } from "express";
import Balance from "../domain/Balance";
import { IBalanceRepo } from "../repos/BalanceRepo";
import BalanceRepository from "../repos/BalanceRepo";

import CreateBalanceBalanceCase from "../useCases/balance/createBalance";
import GetBalanceUseCase from "../useCases/balance/getBalance";
import UpdateBalanceUseCase from "../useCases/balance/updateBalance";
import DeleteBalanceUseCase from "../useCases/balance/deleteBalance";


export default class BalanceController {
  private BalanceRepository: IBalanceRepo;

  constructor() {
    this.BalanceRepository = new BalanceRepository();
  }

  createBalance = (req: Request, res: Response) => {
    const createBalanceUseCase = new CreateBalanceBalanceCase(this.BalanceRepository);

    createBalanceUseCase
      .execute(new Balance(req.body))
      .then((balanceResponse) => {
        res.json(balanceResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error when creating a new balance");
      });
  };

  getBalance = (req: Request, res: Response) => {
    const getBalanceUseCase = new GetBalanceUseCase(this.BalanceRepository);

    const { id } = req.params;

    getBalanceUseCase
      .execute(id as unknown as number)
      .then((balanceResponse) => {
        res.json(balanceResponse);
      })
      .catch((err) => {
        res.status(404).send(err.message || "Error to get an balance");
      });
  };

  updateBalance = (req: Request, res: Response) => {
    const updateBalanceUseCase = new UpdateBalanceUseCase(this.BalanceRepository);

    updateBalanceUseCase
      .execute(new Balance(req.body))
      .then((balanceResponse) => {
        res.json(balanceResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to update an balance");
      });
  };

  deleteBalance = (req: Request, res: Response) => {
    const deleteBalanceUseCase = new DeleteBalanceUseCase(this.BalanceRepository);

    const { id } = req.params;

    deleteBalanceUseCase
      .execute(id as unknown as number)
      .then((balanceResponse) => {
        res.json(balanceResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to delete an balance");
      });
  };
}
