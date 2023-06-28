import UserRepository from "../repos/UserRepo";
import CategoryRepository from "../repos/CategoryRepo";
import MovementRepository from "../repos/MovementRepo";

import CreateUser from "../useCases/user/createUser";
import CreateCategory from "../useCases/category/createCategory";
import CreateMovement from "../useCases/movement/createMovement";

import { faker } from "@faker-js/faker/locale/pt_BR";

export async function seed() {
  const createUser = new CreateUser(new UserRepository());
  const user = await createUser.execute({ email: faker.internet.email() });
  console.log({ user });

  const createCategory = new CreateCategory(new CategoryRepository());
  const category = await createCategory.execute({ name: faker.lorem.word() });
  console.log({ category });

  const createMovement = new CreateMovement(new MovementRepository());
  const movement = await createMovement.execute({
    description: faker.word.verb(),
    type: faker.word.verb(),
    value: Number(faker.random.numeric()),
  });
  console.log({ movement });
}
