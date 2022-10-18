import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class SelectCategorys {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (name: string) => {
    const categorys = await this.repository.findCategoryByName(name);

    return categorys;
  };
}
