// Importe as classes de repositório e as classes de casos de uso
import UserRepository from "../repos/UserRepo";
import CategoryRepository from "../repos/CategoryRepo";
import MovementRepository from "../repos/MovementRepo";

import CreateUser from "../useCases/user/createUser";
import CreateCategory from "../useCases/category/createCategory";
import CreateMovement from "../useCases/movement/createMovement";

import { faker } from "@faker-js/faker/locale/pt_BR";
import { randomUUID } from "crypto";

export async function seed() {
  const userRepository = new UserRepository();
  const categoryRepository = new CategoryRepository();
  const movementRepository = new MovementRepository();

  const isUserTableEmpty = await userRepository.isEmpty();
  const isCategoryTableEmpty = await categoryRepository.isEmpty();
  const isMovementTableEmpty = await movementRepository.isEmpty();

  if (isUserTableEmpty) {
    console.log("seeding...");
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute({
      id: randomUUID(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
    });

    if (isCategoryTableEmpty) {
      const createCategory = new CreateCategory(categoryRepository);
      const category = await createCategory.execute({
        id: randomUUID(),
        name: faker.lorem.word(),
        user: user,
      });

      if (isMovementTableEmpty) {
        const createMovement = new CreateMovement(movementRepository);
        const movement = await createMovement.execute({
          id: randomUUID(),
          description: faker.word.verb(),
          type: faker.word.verb(),
          value: Number(faker.random.numeric()),
          user: user,
          category: category,
        });

        console.log("seeded", { user, category, movement });
      }
    }
  }
}
