import pool from "../db/db";
import bcrypt from "bcrypt";
import { ServiceResultDTO, TransactionResponseDTO, TransactionResultDTO, TransactionSummaryResponseDTO, TransactionSummaryResultDTO } from "../dto/result.dto";
import { UserDTO } from "../dto/user.dto";
import { CustomError, handleDbError } from "../utils/handle.error";
import { AccountDTO } from "../dto/account.dto";
import { QueryParams, TransactionDTO } from "../dto/transaction.dto";
import { cloudinaryDelete } from "../utils/cdn.handle";
import { UpdateTransactionDTO } from "../dto/update-transaction.dto";
import { queryParamsCheckCondition } from "../utils/transaction.util";

export class TransactionService {
  async createTransaction(
    transactionInput: TransactionDTO
  ): Promise<ServiceResultDTO> {
    const query = `
    INSERT INTO "tbs_Transactions" (user_id, account_id,category_id,amount,date,comment,slip_image_url,cdn_public_id,transaction_type,created_at, updated_at)
    VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9, NOW(), NOW())
    RETURNING transaction_id;
  `;
    const values = [
      transactionInput.user_id,
      transactionInput.account_id,
      transactionInput.category_id,
      transactionInput.amount,
      transactionInput.date,
      transactionInput.comment,
      transactionInput.slip_image_url,
      transactionInput.cdn_public_id,
      transactionInput.transaction_type,
    ];
    console.log(
      "transactionInput.cdn_public_id",
      transactionInput.cdn_public_id
    );

    try {
      const result = await pool.query(query, values);
      const newTransactionId = result.rows[0].transaction_id;
      return {
        message: "Create Success",
        results: `New Transaaction created with ID: ${newTransactionId}`,
      };
    } catch (error: any) {
      console.log(error);

      handleDbError(error);
      throw new CustomError(
        "An error occurred while creating the transaction",
        500
      );
    }
  }

  async getTransaction(transaction_id: number): Promise<ServiceResultDTO> {
    const query = `
    SELECT * FROM "tbs_Transactions"
    WHERE transaction_id = $1;
  `;
    try {
      const getResult = await pool.query(query, [transaction_id]);
      const transactionResult = getResult.rows[0];
      if (!transactionResult) {
        throw new CustomError("Transaction not found", 404);
      }
      return {
        message: "Get Success",
        results: transactionResult,
      };
    } catch (error: any) {
      handleDbError(error);
      throw new CustomError(
        "An error occurred while getting the transaction",
        500
      );
    }
  }

  async updateTransaction(
    transaction_id: number,
    transactionInput: UpdateTransactionDTO
  ): Promise<ServiceResultDTO> {
    const setStatements: string[] = [];
    const values: any[] = [];

    Object.entries(transactionInput).forEach(([key, value], index) => {
      if (value !== undefined) {
        setStatements.push(`${key} = $${index + 1}`);
        values.push(value);
      }
    });
    console.log(setStatements.length);
    
    if (setStatements.length === 0) {
      throw new CustomError("No fields to update",400);
    }

    const query = `
    UPDATE "tbs_Transactions" 
    SET ${setStatements.join(", ")} 
    WHERE transaction_id = $${values.length + 1}
    RETURNING transaction_id
  `;
    values.push(transaction_id);
    console.log(query);
    console.log(values);

    try {
      const updateResult = await pool.query(query, values);

      if (updateResult.rowCount === 0) {
        throw new CustomError(
          "Cannot change user_id or Account not found",
          400
        );
      }

      const updatedTransactionId = updateResult.rows[0].transaction_id;
      return {
        message: "Update Success",
        results: `Transaction updated with ID: ${updatedTransactionId}`,
      };
    } catch (error: any) {
      console.log(error);
      
      handleDbError(error);
      throw new CustomError(
        "An error occurred while updating the transaction",
        500
      );
    }
  }

  async deleteTransaction(transaction_id: number): Promise<ServiceResultDTO> {
    const deleteQuery = `
    DELETE FROM "tbs_Transactions"
    WHERE transaction_id = $1
    RETURNING transaction_id,cdn_public_id;
  `;
    try {
      const deleteResult = await pool.query(deleteQuery, [transaction_id]);
      const transactionResult = deleteResult.rows[0];
      if (!transactionResult) {
        throw new CustomError("Transaction not found", 404);
      }
      await cloudinaryDelete(transactionResult.cdn_public_id);
      const deletedTransactionId = transactionResult.transaction_id;
      return {
        message: "Delete Success",
        results: `Transaction ID: ${deletedTransactionId} has been delete`,
      };
    } catch (error: any) {
      handleDbError(error);
      throw new CustomError(
        "An error occurred while deleting the transaction",
        500
      );
    }
  }

  async getFilterTransaction(user_id:number,queryParams:QueryParams): Promise<TransactionResponseDTO> {
    const limit = queryParams.limit || 10; 
    const page = queryParams.page || 1; 
  
    const offset = (page - 1) * limit; 
    let query = `
      SELECT a.account_name, c.category_name,t.amount, t.date,t.comment,t.slip_image_url,t.transaction_type
      FROM "tbs_Transactions" t
      JOIN "tbm_Categories" c ON t.category_id = c.category_id
      JOIN "tbm_Accounts" a ON t.account_id = a.account_id
      WHERE 1 = 1
    `;
    
    const params: any[] = [];
    query = queryParamsCheckCondition(queryParams, query, params,user_id);
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    console.log(query);
    try {
      const getResult = await pool.query(query, params);
      const transactionResult : TransactionResultDTO[] = getResult.rows;
      if (!transactionResult) {
        throw new CustomError("Transaction not found", 404);
      }
      let totalCountQuery = `
      SELECT COUNT(*) FROM "tbs_Transactions" t
      JOIN "tbm_Categories" c ON t.category_id = c.category_id
      JOIN "tbm_Accounts" a ON t.account_id = a.account_id
      WHERE 1 = 1
    `;
    const totalQueryParams: any[] = [];
    totalCountQuery = queryParamsCheckCondition(queryParams, totalCountQuery, totalQueryParams,user_id); 
    console.log(totalCountQuery);
    
    const totalCountResult = await pool.query(totalCountQuery, totalQueryParams);
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / limit);

      return {
        message: "Get Success",
        results: transactionResult,
        pagination: {
          totalCount:totalCount,
          totalPages: totalPages,
          currentPage: page,
          pageSize: limit
        }
      };
    } catch (error: any) {
      console.log(error);
      
      handleDbError(error);
      throw new CustomError(
        "An error occurred while getting the transaction",
        500
      );
    }
  }
  async getSummaryTransaction(user_id:number,queryParams:QueryParams):Promise<TransactionSummaryResponseDTO> {
    let query = `
    SELECT 
      SUM(CASE WHEN t.transaction_type = 'income' THEN t.amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN t.transaction_type = 'expense' THEN t.amount ELSE 0 END) AS total_expense
    FROM "tbs_Transactions" t
    JOIN "tbm_Categories" c ON t.category_id = c.category_id
    JOIN "tbm_Accounts" a ON t.account_id = a.account_id
    WHERE 1 = 1
  `;
    const params: any[] = [];
    query = queryParamsCheckCondition(queryParams, query, params,user_id);
    console.log(query);
    
    try {
      const getResult = await pool.query(query, params);
      const result:TransactionSummaryResultDTO = getResult.rows[0];
      
      return {
        message: "Get Success",
        results: result,
      };
    } catch (error: any) {
      console.log(error);
      
      handleDbError(error);
      throw new CustomError(
        "An error occurred while getting the transaction",
        500
      );
    }
  }
}
