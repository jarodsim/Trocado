import { DataSource } from "typeorm";
import { myDataSource } from "../../config/db";
import Movement from "../../domain/Movement";
import { Movement as MovementEntity } from "../../entity/Movement";

export interface IMovementRepo {
  createMovement: (movement: Movement) => Promise<Movement>;
  updateMovement: (movement: Movement) => Promise<Movement>;
  getMovement: (id: string) => Promise<Movement | null>;
  selectMovements: (limit: number, offset: number) => Promise<Movement[]>;
  deleteMovement: (id: string) => Promise<Movement>;
}

export default class MovementRepository implements IMovementRepo {
  private ormRepository: DataSource;

  constructor() {
    this.ormRepository = myDataSource;
  }

  createMovement = async (movement: Movement) => {
    const movementSaved = await this.ormRepository.manager
      .save(MovementEntity, {
        id: movement.id,
        value: movement.value,
        description: movement.description,
        type: movement.type,
      })
      .catch((error) => {
        throw new Error(`Error on create movement repo: ${error}`);
      });

    return movementSaved;
  };

  getMovement = async (id: string): Promise<Movement> => {
    const movement = await this.ormRepository.manager
      .findOneBy(MovementEntity, { id })
      .catch((error) => {
        throw new Error(`Error on get movement repo: ${error}`);
      });

    return movement;
  };

  updateMovement = async (movement: Movement): Promise<Movement> => {
    await this.ormRepository.manager
      .update(
        MovementEntity,
        {
          id: movement.id,
        },
        {
          value: movement.value,
          description: movement.description,
          type: movement.type,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update movement repo: ${error}`);
      });

    return movement;
  };

  deleteMovement = async (id: string): Promise<Movement> => {
    const deletedMovement = await this.ormRepository.manager.findOneBy(
      MovementEntity,
      {
        id,
      }
    );
    await this.ormRepository.manager
      .delete(MovementEntity, {
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

    const movements = await this.ormRepository.manager
      .find(MovementEntity, {
        take: limit,
        skip: skip,
      })
      .catch((error) => {
        throw new Error(`Error on select movements repo: ${error}`);
      });

    return movements;
  };

  isEmpty = async (): Promise<boolean> => {
    const movement = await this.ormRepository.manager
      .findOneBy(MovementEntity, {})
      .catch((error) => {
        throw new Error(`Error on check if movement table is empty: ${error}`);
      });

    return movement === undefined;
  }
}
