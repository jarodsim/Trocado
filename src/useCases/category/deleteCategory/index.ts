import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class DeleteCategory {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const deletedCategory = await this.repository.deleteCategory(id);

    return deletedCategory;
  };
}
