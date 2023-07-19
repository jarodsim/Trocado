import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class DeleteCategory {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (id: string) => {
    const deletedCategory = await this.repository.deleteCategory(id);

    return deletedCategory;
  };
}
