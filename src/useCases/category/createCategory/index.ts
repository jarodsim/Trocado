import Category from "../../../domain/Category";
import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class CreateCategory {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (category: Category) => {
    const createdCategory = await this.repository.createCategory(category);

    return createdCategory;
  };
}
