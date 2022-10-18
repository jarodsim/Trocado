import Category from "../../../domain/Category";
import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class UpdateCategory {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (category: Category) => {
    const updatedCategory = await this.repository.updateCategory(category);

    return updatedCategory;
  };
}
