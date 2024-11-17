import { Request, Response } from "express";
import { ServiceResultDTO } from "../dto/result.dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CustomError, handleValidationError } from "../utils/handle.error";
import { AccountDTO } from "../dto/account.dto";
import { CategoryService } from "../services/category.service";
import { CategoryDTO } from "../dto/category.dto";

const categoryService: CategoryService = new CategoryService();

export class CategoryController {
  
  async createCategory (req: Request, res: Response): Promise<void> {
    const categoryInput: CategoryDTO = plainToInstance(CategoryDTO, req.body);
    const errors = await validate(categoryInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result : ServiceResultDTO = await categoryService.createCategory(categoryInput);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    const category_id: number = parseInt(req.params.category_id, 10);  
    if (!category_id) {
      res.status(400).json({ error: 'category_id is required' });
      return;
    }
    try {
      const result : ServiceResultDTO = await categoryService.getCategory(category_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const category_id: number = parseInt(req.params.category_id, 10);  
    if (!category_id) {
      res.status(400).json({ error: 'category_id is required' });
      return;
    }
    const categoryInput: CategoryDTO = plainToInstance(CategoryDTO, req.body);
    const errors = await validate(categoryInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result: ServiceResultDTO = await categoryService.updateCategory(category_id, categoryInput);
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }



  async deleteCategory(req: Request, res: Response): Promise<void> {
    const category_id: number = parseInt(req.params.category_id, 10);  
    if (!category_id) {
      res.status(400).json({ error: 'category_id is required' });
      return;
    }
    try {
      const result: ServiceResultDTO = await categoryService.deleteCategory(category_id);
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
}
