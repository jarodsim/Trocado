import { IGoalRepo } from "../../../repos/GoalRepo";

export default class SelectGoals {
  private repository: IGoalRepo;

  constructor(repository: IGoalRepo) {
    this.repository = repository;
  }

  execute = async (
    limit: number,
    offset: number,
    title?: string,
    total_amount?: number
  ) => {
    const goals = await this.repository.selectGoals(
      limit,
      offset,
      title,
      total_amount
    );

    return goals;
  };
}
