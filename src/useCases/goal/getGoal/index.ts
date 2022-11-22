import { IGoalRepo } from "../../../repos/GoalRepo";

export default class GetGoal {
  private repository: IGoalRepo;

  constructor(repository: IGoalRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const goal = await this.repository.getGoal(id);

    return goal;
  };
}
