import Goal from "../../../domain/Goal";
import { IGoalRepo } from "../../../repos/GoalRepo/index";

export default class CreateGoal {
  private repository: IGoalRepo;

  constructor(repository: IGoalRepo) {
    this.repository = repository;
  }

  execute = async (category: Goal) => {
    const createdGoal = await this.repository.createGoal(category);

    return createdGoal;
  };
}
