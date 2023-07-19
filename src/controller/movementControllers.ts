import { Request, Response } from "express";
import Movement from "../domain/Movement";
import { IMovementRepo } from "../repos/MovementRepo";
import MovementRepository from "../repos/MovementRepo";

import CreateMovementUseCase from "../useCases/movement/createMovement";
import UpdateMovementUseCase from "../useCases/movement/updateMovement";
import GetMovementUseCase from "../useCases/movement/getMovement";
import DeleteMovementUseCase from "../useCases/movement/deleteMovement";
import SelectMovementsUseCase from "../useCases/movement/selectMovements";

export default class MovementController {
  private movementRepository: IMovementRepo;

  constructor() {
    this.movementRepository = new MovementRepository();
  }

  createMovement = (req: Request, res: Response) => {
    const createMovementUseCase = new CreateMovementUseCase(
      this.movementRepository
    );

    createMovementUseCase
      .execute(new Movement(req.body))
      .then((movementResponse) => {
        res.json(movementResponse);
      })
      .catch((err) => {
        res
          .status(500)
          .send(err.message || "Error when creating a new movement");
      });
  };

  getMovement = (req: Request, res: Response) => {
    const getMovementUseCase = new GetMovementUseCase(this.movementRepository);

    const { id } = req.params;

    getMovementUseCase
      .execute(id)
      .then((movementResponse) => {
        res.json(movementResponse);
      })
      .catch((err) => {
        res.status(404).send(err.message || "Error to get an movement");
      });
  };

  updateMovement = (req: Request, res: Response) => {
    const updateMovementUseCase = new UpdateMovementUseCase(
      this.movementRepository
    );

    updateMovementUseCase
      .execute(new Movement(req.body))
      .then((movementResponse) => {
        res.json(movementResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to update an movement");
      });
  };

  deleteMovement = (req: Request, res: Response) => {
    const deleteMovementUseCase = new DeleteMovementUseCase(
      this.movementRepository
    );

    const { id } = req.params;

    deleteMovementUseCase
      .execute(id)
      .then((movementResponse) => {
        res.json(movementResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to delete an movement");
      });
  };

  selectMovements = (req: Request, res: Response) => {
    const selectMovementUseCase = new SelectMovementsUseCase(
      this.movementRepository
    );

    const { limit = 10, offset = 1 } = req.query;

    selectMovementUseCase
      .execute(Number(limit), Number(offset))
      .then((movementResponse) => {
        res.json(movementResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to select categories");
      });
  };
}
