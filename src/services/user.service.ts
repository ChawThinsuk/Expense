import pool from "../db/db";
import bcrypt from "bcrypt";
import { ServiceResultDTO } from "../dto/result.dto";
import { UserDTO } from "../dto/user.dto";
import { CustomError, handleDbError } from "../utils/handle.error";

export class UserService {
  async createUser(userInput: UserDTO): Promise<ServiceResultDTO> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const query = `
    INSERT INTO "tbm_Users" (username, password, email, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING user_id;
  `;
    const values = [userInput.username, hashedPassword, userInput.email];
    try {
      const result = await pool.query(query, values);
      const newUserId = result.rows[0].user_id;
      return {
        message: "Create Success",
        results: `New user created with ID: ${newUserId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the user', 500);
    }
  }

  async getUser(userId: number): Promise<ServiceResultDTO> {
    const getQuery = `
    SELECT * FROM "tbm_Users"
    WHERE user_id = $1;
  `;
    try {
      const getResult = await pool.query(getQuery, [userId]);
      const userResult = getResult.rows[0];
      if (!userResult) {
        throw new CustomError('User not found', 404);
      }
        return {
          message: "Get Success",
          results: userResult,
        };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the user', 500);
    }
  }
  async updateUser(
    userId: number,
    userInput: UserDTO
  ): Promise<ServiceResultDTO> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const values = [
      userInput.username,
      hashedPassword,
      userInput.email,
      userId,
    ];
    const updateQuery = `
    UPDATE "tbm_Users"
    SET username = $1, password = $2, email = $3 , updated_at = NOW()
    WHERE user_id = $4
    RETURNING user_id;
  `;
    try {
      const updateResult = await pool.query(updateQuery, values);
      
      if (updateResult.rowCount === 0) {
        throw new CustomError('User not found', 404);
      }

      const updatedUserId = updateResult.rows[0].user_id;
      return {
        message: "Update Success",
        results: `User updated with ID: ${updatedUserId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while updating the user', 500);
    }
  }


  async deleteUser(userId: number): Promise<ServiceResultDTO> {
    const deleteQuery = `
    DELETE FROM "tbm_Users"
    WHERE user_id = $1
    RETURNING user_id;
  `;
    try {
      const deleteResult = await pool.query(deleteQuery, [userId]);
      const userResult = deleteResult.rows[0];
      if (!userResult) {
        throw new CustomError('User not found', 404);
      }
      const deletedUserId = deleteResult.rows[0].user_id;
      return {
        message: "Delete Success",
        results: `User ID: ${deletedUserId} has been delete`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while deleting the user', 500);
    }
  }
}
