import pool from "../db/db";
import bcrypt from "bcrypt";
import { AccountResponseDTO, AccountResultsDTO, ServiceResultDTO } from "../dto/result.dto";
import { UserDTO } from "../dto/user.dto";
import { CustomError, handleDbError } from "../utils/handle.error";
import { AccountDTO } from "../dto/account.dto";

export class AccountService {
  async createAccount(accountInput: AccountDTO,user_id:number): Promise<ServiceResultDTO> {
    const query = `
    INSERT INTO "tbm_Accounts" (user_id, account_name, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING account_id;
  `;
    const values = [user_id, accountInput.account_name];
    console.log(values);
    
    try {
      const result = await pool.query(query, values);
      const newAccountId = result.rows[0].account_id;
      return {
        message: "Create Success",
        results: `New account created with ID: ${newAccountId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while creating the account', 500);
    }
  }

  async getAccount(account_id: number): Promise<ServiceResultDTO> {
    const query = `
    SELECT * FROM "tbm_Accounts"
    WHERE account_id = $1;
  `;
    try {
      const getResult = await pool.query(query, [account_id]);
      const accountResult = getResult.rows[0];
      if (!accountResult) {
        throw new CustomError('Account not found', 404);
      }
        return {
          message: "Get Success",
          results: accountResult,
        };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the account', 500);
    }
  }
  async getAllAccount(user_id: number): Promise<AccountResponseDTO> {
    const query = `
    SELECT account_id,user_id,account_name FROM "tbm_Accounts"
    WHERE user_id = $1;
  `;
    try {
      const getResult = await pool.query(query, [user_id]);
      const accountResult :AccountResultsDTO[] = getResult.rows;
      if (!accountResult) {
        throw new CustomError('Account not found', 404);
      }
        return {
          message: "Get Success",
          results: accountResult,
        };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the account', 500);
    }
  }
  async updateAccount(
    account_id: number,
    accountInput: AccountDTO,
    user_id:number
  ): Promise<ServiceResultDTO> {
    const updateQuery = `
    UPDATE "tbm_Accounts"
    SET account_name = $1, updated_at = NOW()
    WHERE account_id = $2 AND user_id = $3
    RETURNING account_id;
  `;
    try {
      const updateResult = await pool.query(updateQuery, [accountInput.account_name,account_id,user_id]);
      
      if (updateResult.rowCount === 0) {
        throw new CustomError('Cannot change user_id or Account not found', 400);
      }

      const updatedAccountId = updateResult.rows[0].account_id;
      return {
        message: "Update Success",
        results: `Account updated with ID: ${updatedAccountId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while updating the account', 500);
    }
  }


  async deleteAccount(account_id: number): Promise<ServiceResultDTO> {
    const deleteQuery = `
    DELETE FROM "tbm_Accounts"
    WHERE account_id = $1
    RETURNING account_id;
  `;
    try {
      const deleteResult = await pool.query(deleteQuery, [account_id]);
      const accountResult = deleteResult.rows[0];
      if (!accountResult) {
        throw new CustomError('Account not found', 404);
      }
      const deletedAccountId = deleteResult.rows[0].account_id;
      return {
        message: "Delete Success",
        results: `Account ID: ${deletedAccountId} has been delete`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while deleting the account', 500);
    }
  }
}
