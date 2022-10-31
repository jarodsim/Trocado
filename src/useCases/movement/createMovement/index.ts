import Movement from "../../../domain/Movement";
import { IMovementRepo } from "../../../repos/MovementRepo";

export default class CreateMovement {
  private repository: IMovementRepo;

  constructor(repository: IMovementRepo) {
    this.repository = repository;
  }

  execute = async (category: Movement) => {
    const createdMovement = await this.repository.createMovement(category);

    return createdMovement;
  };
}
