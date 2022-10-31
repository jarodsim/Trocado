import Movement from "../../../domain/Movement";
import { IMovementRepo } from "../../../repos/MovementRepo";

export default class UpdateMovement {
  private repository: IMovementRepo;

  constructor(repository: IMovementRepo) {
    this.repository = repository;
  }

  execute = async (category: Movement) => {
    const updatedMovement = await this.repository.updateMovement(category);

    return updatedMovement;
  };
}
