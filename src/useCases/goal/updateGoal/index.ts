import Goal from "../../../domain/Goal";
import { IGoalRepo } from "../../../repos/GoalRepo";

export default class UpdateGoal {
  private repository: IGoalRepo;

  constructor(repository: IGoalRepo) {
    this.repository = repository;
  }

  execute = async (goal: Goal) => {
    const updatedGoal = await this.repository.updateGoal(goal);

    return updatedGoal;
  };
}
