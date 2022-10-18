import { DataSource } from "typeorm";
import { myDataSource } from "../../config/db";
import Category from "../../domain/Category";
import { Category as CategoryEntity } from "../../entity/Category";

export interface ICategoryRepo {
  findCategoryByName: (name: string) => Promise<Category | null>;
  createCategory: (category: Category) => Promise<Category>;
  updateCategory: (category: Category) => Promise<Category>;
  getCategory: (id: number) => Promise<Category | null>;
  selectCategories: (limit: number, offset: number) => Promise<Category[]>;
  deleteCategory: (id: number) => Promise<Category>;
}

export default class CategoryRepository implements ICategoryRepo {
  private ormRepository: DataSource;

  constructor() {
    this.ormRepository = myDataSource;
  }

  createCategory = async (category: Category) => {
    const categorySaved = await this.ormRepository.manager
      .save(CategoryEntity, {
        id: category.id,
        name: category.name,
      })
      .catch((error) => {
        throw new Error(`Error on create category repo: ${error}`);
      });

    return categorySaved;
  };

  getCategory = async (id: number): Promise<Category> => {
    const category = await this.ormRepository.manager
      .findOneBy(CategoryEntity, { id })
      .catch((error) => {
        throw new Error(`Error on get category repo: ${error}`);
      });

    return category;
  };

  updateCategory = async (category: Category): Promise<Category> => {
    await this.ormRepository.manager
      .update(
        CategoryEntity,
        {
          id: category.id,
        },
        {
          name: category.name,
        }
      )
      .catch((error) => {
        throw new Error(`Error on update category repo: ${error}`);
      });

    return category;
  };

  deleteCategory = async (id: number): Promise<Category> => {
    const deletedCategory = await this.ormRepository.manager.findOneBy(CategoryEntity, {
      id,
    });
    await this.ormRepository.manager
      .delete(CategoryEntity, {
        id: deletedCategory.id,
      })
      .catch((error) => {
        throw new Error(`Error on delete category repo: ${error}`);
      });

    return deletedCategory;
  };

  findCategoryByName = async (name: string) => {
    const category = await this.ormRepository.manager
      .findOne(CategoryEntity, {
        where: {
          name: name,
        },
      })
      .catch((error) => {
        throw new Error(`Error on find category by name repo: ${error}`);
      });

    return category;
  };

  selectCategories = async (limit: number, offset: number): Promise<Category[]> => {
    const skip = limit * offset - limit;

    const categorys = await this.ormRepository.manager
      .find(CategoryEntity, {
        take: limit,
        skip: skip,
      })
      .catch((error) => {
        throw new Error(`Error on select categorys repo: ${error}`);
      });

    return categorys;
  };
}
