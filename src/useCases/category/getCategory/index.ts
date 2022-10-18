import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class GetCategory {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (id: number) => {
    const category = await this.repository.getCategory(id);

    return category;
  };
}
