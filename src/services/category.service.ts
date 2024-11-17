import pool from "../db/db";
import bcrypt from "bcrypt";
import { ServiceResultDTO } from "../dto/result.dto";
import { UserDTO } from "../dto/user.dto";
import { CustomError, handleDbError } from "../utils/handle.error";
import { AccountDTO } from "../dto/account.dto";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryService {
  async createCategory(categoryInput: CategoryDTO): Promise<ServiceResultDTO> {
    const query = `
    INSERT INTO "tbm_Categories" (user_id, category_name, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING category_id;
  `;
    const values = [categoryInput.user_id, categoryInput.category_name];
    try {
      const result = await pool.query(query, values);
      const newCategoryId = result.rows[0].category_id;
      return {
        message: "Create Success",
        results: `New Category created with ID: ${newCategoryId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the user', 500);
    }
  }

  async getCategory(category_id: number): Promise<ServiceResultDTO> {
    const query = `
    SELECT * FROM "tbm_Categories"
    WHERE category_id = $1;
  `;
    try {
      const getResult = await pool.query(query, [category_id]);
      const categoryResult = getResult.rows[0];
      if (!categoryResult) {
        throw new CustomError('Category not found', 404);
      }
        return {
          message: "Get Success",
          results: categoryResult,
        };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the user', 500);
    }
  }

  async updateCategory(
    category_id: number,
    categoryInput: CategoryDTO
  ): Promise<ServiceResultDTO> {
    const updateQuery = `
    UPDATE "tbm_Categories"
    SET category_name = $1, updated_at = NOW()
    WHERE category_id = $2 AND user_id = $3
    RETURNING category_id;
  `;
    try {
      const updateResult = await pool.query(updateQuery, [categoryInput.category_name,category_id,categoryInput.user_id]);
      
      if (updateResult.rowCount === 0) {
        throw new CustomError('Cannot change user_id or Category not found', 400);
      }

      const updatedCategoryId = updateResult.rows[0].category_id;
      return {
        message: "Update Success",
        results: `Category updated with ID: ${updatedCategoryId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while updating the user', 500);
    }
  }


  async deleteCategory(category_id: number): Promise<ServiceResultDTO> {
    const deleteQuery = `
    DELETE FROM "tbm_Categories"
    WHERE category_id = $1
    RETURNING category_id;
  `;
    try {
      const deleteResult = await pool.query(deleteQuery, [category_id]);
      const categoryResult = deleteResult.rows[0];
      if (!categoryResult) {
        throw new CustomError('Account not found', 404);
      }
      const deletedCategoryId = deleteResult.rows[0].category_id;
      return {
        message: "Delete Success",
        results: `Category ID: ${deletedCategoryId} has been delete`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while deleting the user', 500);
    }
  }
}
