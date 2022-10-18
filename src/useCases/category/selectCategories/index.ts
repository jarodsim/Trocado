import { ICategoryRepo } from "../../../repos/CategoryRepo";

export default class SelectCategorys {
  private repository: ICategoryRepo;

  constructor(repository: ICategoryRepo) {
    this.repository = repository;
  }

  execute = async (limit: number, offset: number) => {
    const categorys = await this.repository.selectCategories(limit, offset);

    return categorys;
  };
}
