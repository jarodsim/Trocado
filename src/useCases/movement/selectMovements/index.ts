import { IMovementRepo } from "../../../repos/MovementRepo";

export default class SelectMovements {
  private repository: IMovementRepo;

  constructor(repository: IMovementRepo) {
    this.repository = repository;
  }

  execute = async (limit: number, offset: number) => {
    const categorys = await this.repository.selectMovements(limit, offset);

    return categorys;
  };
}
