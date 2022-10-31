import { IMovementRepo } from "../../../repos/MovementRepo";

export default class GetMovement {
  private repository: IMovementRepo;

  constructor(repository: IMovementRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const category = await this.repository.getMovement(id);

    return category;
  };
}
