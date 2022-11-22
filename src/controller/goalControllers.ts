import { Request, Response } from "express";
import Goal from "../domain/Goal";
import { IGoalRepo } from "../repos/GoalRepo";
import GoalRepository from "../repos/GoalRepo";

import CreateGoalUseCase from "../useCases/goal/createGoal";
import UpdateGoalUseCase from "../useCases/goal/updateGoal";
import GetGoalUseCase from "../useCases/goal/getGoal";
import DeleteGoalUseCase from "../useCases/goal/deleteGoal";
import SelectGoalsUseCase from "../useCases/goal/selectGoals";

export default class GoalController {
  private goalRepository: IGoalRepo;

  constructor() {
    this.goalRepository = new GoalRepository();
  }

  createGoal = (req: Request, res: Response) => {
    const createGoalUseCase = new CreateGoalUseCase(this.goalRepository);

    createGoalUseCase
      .execute(new Goal(req.body))
      .then((goalResponse) => {
        res.json(goalResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error when creating a new goal");
      });
  };

  getGoal = (req: Request, res: Response) => {
    const getGoalUseCase = new GetGoalUseCase(this.goalRepository);

    const { id } = req.params;

    getGoalUseCase
      .execute(id as unknown as number)
      .then((goalResponse) => {
        res.json(goalResponse);
      })
      .catch((err) => {
        res.status(404).send(err.message || "Error to get an goal");
      });
  };

  updateGoal = (req: Request, res: Response) => {
    const updateGoalUseCase = new UpdateGoalUseCase(this.goalRepository);

    updateGoalUseCase
      .execute(new Goal(req.body))
      .then((goalResponse) => {
        res.json(goalResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to update an goal");
      });
  };

  deleteGoal = (req: Request, res: Response) => {
    const deleteGoalUseCase = new DeleteGoalUseCase(this.goalRepository);

    const { id } = req.params;

    deleteGoalUseCase
      .execute(id as unknown as number)
      .then((goalResponse) => {
        res.json(goalResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to delete an goal");
      });
  };

  selectGoals = (req: Request, res: Response) => {
    const selectGoalUseCase = new SelectGoalsUseCase(this.goalRepository);

    const { limit = 10, offset = 1, title, total_amount } = req.query;

    selectGoalUseCase
      .execute(
        Number(limit),
        Number(offset),
        title as string,
        Number(total_amount)
      )
      .then((goalResponse) => {
        res.json(goalResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to select goals");
      });
  };
}
