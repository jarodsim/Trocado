import { DataSource } from "typeorm";
import { myDataSource } from "../../config/db";
import Goal from "../../domain/Goal";
import { Goal as GoalEntity } from "../../entity/Goal";

export interface IGoalRepo {
  createGoal: (goal: Goal) => Promise<Goal>;
  updateGoal: (goal: Goal) => Promise<Goal>;
  getGoal: (id: number) => Promise<Goal | null>;
  selectGoals: (
    limit: number,
    offset: number,
    title?: string,
    total_amount?: number
  ) => Promise<Goal[]>;
  deleteGoal: (id: number) => Promise<Goal>;
}

export default class GoalRepository implements IGoalRepo {
  private ormRepository: DataSource;

  constructor() {
    this.ormRepository = myDataSource;
  }

  createGoal = async (goal: Goal) => {
    const goalSaved = await this.ormRepository.manager
      .save(GoalEntity, {
        id: goal.id,
        title: goal.title,
        description: goal.description,
        total_amount: goal.total_amount,
        type: goal.type,
        datetime_start: goal.datetime_start,
        datetime_end: goal.datetime_end,
      })
      .catch((error) => {
        throw new Error(`Error on create goal repo: ${error}`);
      });

    return goalSaved;
  };

  getGoal = async (id: number): Promise<Goal> => {
    const goal = await this.ormRepository.manager
      .findOneBy(GoalEntity, { id })
      .catch((error) => {
        throw new Error(`Error on get goal repo: ${error}`);
      });

    return goal;
  };

  updateGoal = async (goal: Goal): Promise<Goal> => {
    await this.ormRepository.manager
      .update(
        GoalEntity,
        {
          id: goal.id,
        },
        {
          title: goal.title,
          description: goal.description,
          total_amount: goal.total_amount,
          type: goal.type,
          datetime_start: goal.datetime_start,
          datetime_end: goal.datetime_end,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update goal repo: ${error}`);
      });

    return goal;
  };

  deleteGoal = async (id: number): Promise<Goal> => {
    const deletedGoal = await this.ormRepository.manager.findOneBy(GoalEntity, {
      id,
    });
    await this.ormRepository.manager
      .delete(GoalEntity, {
        id: deletedGoal.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete goal repo: ${error}`);
      });

    return deletedGoal;
  };

  selectGoals = async (
    limit: number,
    offset: number,
    title?: string,
    total_amount?: number
  ): Promise<Goal[]> => {
    const skip = limit * offset - limit;

    const goals = await this.ormRepository.manager
      .find(GoalEntity, {
        take: limit,
        skip: skip,
        where: {
          title: title,
          total_amount: total_amount,
        },
      })
      .catch((error) => {
        throw new Error(`Error on select goals repo: ${error}`);
      });

    return goals;
  };
}
