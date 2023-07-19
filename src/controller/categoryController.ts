import { Request, Response } from "express";
import Category from "../domain/Category";
import { ICategoryRepo } from "../repos/CategoryRepo";
import CategoryRepository from "../repos/CategoryRepo";

import CreateCategoryUseCase from "../useCases/category/createCategory";
import UpdateCategoryUseCase from "../useCases/category/updateCategory";
import GetCategoryUseCase from "../useCases/category/getCategory";
import DeleteCategoryUseCase from "../useCases/category/deleteCategory";
import SelectCategorysUseCase from "../useCases/category/selectCategories";

export default class CategoryController {
  private categoryRepository: ICategoryRepo;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  createCategory = (req: Request, res: Response) => {
    const createCategoryUseCase = new CreateCategoryUseCase(
      this.categoryRepository
    );

    createCategoryUseCase
      .execute(new Category(req.body))
      .then((categoryResponse) => {
        res.json(categoryResponse);
      })
      .catch((err) => {
        res
          .status(500)
          .send(err.message || "Error when creating a new category");
      });
  };

  getCategory = (req: Request, res: Response) => {
    const getCategoryUseCase = new GetCategoryUseCase(this.categoryRepository);

    const { id } = req.params;

    getCategoryUseCase
      .execute(id)
      .then((categoryResponse) => {
        res.json(categoryResponse);
      })
      .catch((err) => {
        res.status(404).send(err.message || "Error to get an category");
      });
  };

  updateCategory = (req: Request, res: Response) => {
    const updateCategoryUseCase = new UpdateCategoryUseCase(
      this.categoryRepository
    );

    updateCategoryUseCase
      .execute(new Category(req.body))
      .then((categoryResponse) => {
        res.json(categoryResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to update an category");
      });
  };

  deleteCategory = (req: Request, res: Response) => {
    const deleteCategoryUseCase = new DeleteCategoryUseCase(
      this.categoryRepository
    );

    const { id } = req.params;

    deleteCategoryUseCase
      .execute(id)
      .then((categoryResponse) => {
        res.json(categoryResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to delete an category");
      });
  };

  selectCategorys = (req: Request, res: Response) => {
    const selectCategoryUseCase = new SelectCategorysUseCase(
      this.categoryRepository
    );

    const { limit = 10, offset = 1 } = req.query;

    selectCategoryUseCase
      .execute(Number(limit), Number(offset))
      .then((categoryResponse) => {
        res.json(categoryResponse);
      })
      .catch((err) => {
        res.status(500).send(err.message || "Error to select categories");
      });
  };
}
