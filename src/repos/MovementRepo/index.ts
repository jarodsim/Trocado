import { Repository } from "typeorm";
import { myDataSource } from "../../config/db";
import Movement from "../../domain/Movement";
import { Movement as MovementEntity } from "../../entity/Movement";

export interface IMovementRepo {
  createMovement: (movement: Movement) => Promise<Movement>;
  updateMovement: (movement: Movement) => Promise<Movement>;
  getMovement: (id: string) => Promise<Movement | null>;
  selectMovements: (limit: number, offset: number) => Promise<Movement[]>;
  deleteMovement: (id: string) => Promise<Movement>;
  isEmpty: () => Promise<boolean>;
}

export default class MovementRepository implements IMovementRepo {
  private ormRepository: Repository<MovementEntity>;

  constructor() {
    this.ormRepository = myDataSource.getRepository(MovementEntity);
  }

  createMovement = async (movement: Movement) => {
    const movementSaved = await this.ormRepository
      .save({
        id: movement.id,
        value: movement.value,
        description: movement.description,
        type: movement.type,
        user: movement.user,
        category: movement.category,
      })
      .catch((error) => {
        throw new Error(`Error on create movement repo: ${error}`);
      });

    return movementSaved;
  };

  getMovement = async (id: string): Promise<Movement> => {
    const movement = await this.ormRepository
      .findOneBy({ id })
      .catch((error) => {
        throw new Error(`Error on get movement repo: ${error}`);
      });

    return movement;
  };

  updateMovement = async (movement: Movement): Promise<Movement> => {
    await this.ormRepository
      .update(
        {
          id: movement.id,
        },
        {
          value: movement.value,
          description: movement.description,
          type: movement.type,
          user: movement.user,
          category: movement.category,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update movement repo: ${error}`);
      });

    return movement;
  };

  deleteMovement = async (id: string): Promise<Movement> => {
    const deletedMovement = await this.ormRepository.findOneBy({
      id,
    });
    await this.ormRepository
      .delete({
        id: deletedMovement.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete movement repo: ${error}`);
      });

    return deletedMovement;
  };

  selectMovements = async (
    limit: number,
    offset: number
  ): Promise<Movement[]> => {
    const skip = limit * offset - limit;

    const movements = await this.ormRepository
      .find({
        take: limit,
        skip: skip,
      })
      .catch((error) => {
        throw new Error(`Error on select movements repo: ${error}`);
      });

    return movements;
  };

  isEmpty = async (): Promise<boolean> => {
    const movments = await this.ormRepository.find();

    return movments.length === 0;
  };
}
