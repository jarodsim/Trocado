import { Repository } from "typeorm";
import { myDataSource } from "../../config/db";
import Category from "../../domain/Category";
import { Category as CategoryEntity } from "../../entity/Category";

export interface ICategoryRepo {
  findCategoryByName: (name: string) => Promise<Category | null>;
  createCategory: (category: Category) => Promise<Category>;
  updateCategory: (category: Category) => Promise<Category>;
  getCategory: (id: string) => Promise<Category | null>;
  selectCategories: (limit: number, offset: number) => Promise<Category[]>;
  deleteCategory: (id: string) => Promise<Category>;
  isEmpty: () => Promise<boolean>;
}

export default class CategoryRepository implements ICategoryRepo {
  private ormRepository: Repository<CategoryEntity>;

  constructor() {
    this.ormRepository = myDataSource.getRepository(CategoryEntity);
  }

  createCategory = async (category: Category) => {
    const categorySaved = await this.ormRepository
      .save({
        id: category.id,
        name: category.name,
        user: category.user,
      })
      .catch((error) => {
        throw new Error(`Error on create category repo: ${error}`);
      });

    return categorySaved;
  };

  getCategory = async (id: string): Promise<Category> => {
    const category = await this.ormRepository
      .findOneBy({ id })
      .catch((error) => {
        throw new Error(`Error on get category repo: ${error}`);
      });

    return category;
  };

  updateCategory = async (category: Category): Promise<Category> => {
    await this.ormRepository
      .update(
        {
          id: category.id,
        },
        {
          name: category.name,
          user: category.user,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update category repo: ${error}`);
      });

    return category;
  };

  deleteCategory = async (id: string): Promise<Category> => {
    const deletedCategory = await this.ormRepository.findOneBy({
      id,
    });
    await this.ormRepository
      .delete({
        id: deletedCategory.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete category repo: ${error}`);
      });

    return deletedCategory;
  };

  findCategoryByName = async (name: string) => {
    const category = await this.ormRepository
      .findOne({
        where: {
          name: name,
        },
      })
      .catch((error) => {
        throw new Error(`Error on find category by name repo: ${error}`);
      });

    return category;
  };

  selectCategories = async (
    limit: number,
    offset: number
  ): Promise<Category[]> => {
    const skip = limit * offset - limit;

    const categorys = await this.ormRepository
      .find({
        take: limit,
        skip: skip,
      })
      .catch((error) => {
        throw new Error(`Error on select categorys repo: ${error}`);
      });

    return categorys;
  };

  isEmpty = async (): Promise<boolean> => {
    const categorys = await this.ormRepository.find();

    return categorys.length === 0;
  };
}
