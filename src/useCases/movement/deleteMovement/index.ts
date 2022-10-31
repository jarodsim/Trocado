import { IMovementRepo } from "../../../repos/MovementRepo";

export default class DeleteMovement {
  private repository: IMovementRepo;

  constructor(repository: IMovementRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const deletedMovement = await this.repository.deleteMovement(id);

    return deletedMovement;
  };
}
