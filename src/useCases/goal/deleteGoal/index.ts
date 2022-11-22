import { IGoalRepo } from "../../../repos/GoalRepo";

export default class DeleteGoal {
  private repository: IGoalRepo;

  constructor(repository: IGoalRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const deletedGoal = await this.repository.deleteGoal(id);

    return deletedGoal;
  };
}
