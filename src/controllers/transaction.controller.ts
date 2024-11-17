import { Request, Response } from "express";
import { CdnResultDTO, ServiceResultDTO, TransactionResponseDTO, TransactionSummaryResponseDTO, TransactionSummaryResultDTO } from "../dto/result.dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CustomError, handleValidationError } from "../utils/handle.error";
import { AccountDTO } from "../dto/account.dto";
import { CategoryService } from "../services/category.service";
import { CategoryDTO } from "../dto/category.dto";
import { cloudinaryDelete, cloudinaryUpload } from "../utils/cdn.handle";
import { QueryParams, TransactionDTO } from "../dto/transaction.dto";
import {
  transactionConvertFormData,
  updateTransactionConvertFormData,
} from "../utils/convert.form-data";
import { replaceProfanity } from "../utils/replaceProfanity";
import { TransactionService } from "../services/transaction.service";
import { UpdateTransactionDTO } from "../dto/update-transaction.dto";

const transactionService: TransactionService = new TransactionService();

export class TransactionController {
  async createTransaction(req: Request, res: Response): Promise<void> {
    if (req.file) {
      try {
        const cdnResult: CdnResultDTO = await cloudinaryUpload(req.file);
        req.body.slip_image_url = cdnResult.cdnUrl;
        req.body.cdn_public_id = cdnResult.publicId;
        console.log(typeof req.body.cdn_public_id);
      } catch (error) {
        res.status(500).json({ message: "Error uploading file to Cloudinary" });
        return;
      }
    }
    let transactionInput: TransactionDTO;
    try {
      transactionInput = transactionConvertFormData(req);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid transaction data";
      res.status(400).json({ message: errorMessage });
      return;
    }
    const errors = await validate(transactionInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    transactionInput.comment = await replaceProfanity(transactionInput.comment);

    try {
      const result: ServiceResultDTO =
        await transactionService.createTransaction(transactionInput);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
  async getTransaction(req: Request, res: Response): Promise<void> {
    const transaction_id: number = parseInt(req.params.transaction_id, 10);
    if (!transaction_id) {
      res.status(400).json({ error: "transaction_id is required" });
      return;
    }
    try {
      const result: ServiceResultDTO = await transactionService.getTransaction(
        transaction_id
      );
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  async updateTransaction(req: Request, res: Response): Promise<void> {
    const transaction_id: number = parseInt(req.params.transaction_id, 10);
    if (!transaction_id) {
      res.status(400).json({ error: "transaction_id is required" });
      return;
    }
    if (req.file) {
      try {
        if (req.body.cdn_public_id) {
          await cloudinaryDelete(req.body.cdn_public_id);
        }
        const cdnResult: CdnResultDTO = await cloudinaryUpload(req.file);
        req.body.slip_image_url = cdnResult.cdnUrl;
        req.body.cdn_public_id = cdnResult.publicId;
      } catch (error) {
        res.status(500).json({ message: "Error uploading file to Cloudinary" });
        return;
      }
    } else if (req.body.deleteImage === "true" && req.body.cdn_public_id) {
      await cloudinaryDelete(req.body.cdn_public_id);
      req.body.slip_image_url = null;
      req.body.cdn_public_id = null;
    }

    let transactionInput: UpdateTransactionDTO;
    try {
      transactionInput = await updateTransactionConvertFormData(req);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid transaction data";
      res.status(400).json({ message: errorMessage });
      return;
    }
    const errors = await validate(transactionInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    if (transactionInput.comment) {
      transactionInput.comment = await replaceProfanity(
        transactionInput.comment
      );
    }
    console.log(transactionInput);
    try {
      const result: ServiceResultDTO =
        await transactionService.updateTransaction(
          transaction_id,
          transactionInput
        );
      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  async deleteTransaction(req: Request, res: Response): Promise<void> {
    const transaction_id: number = parseInt(req.params.transaction_id, 10);
    if (!transaction_id) {
      res.status(400).json({ error: "transaction_id is required" });
      return;
    }
    try {
      const result: ServiceResultDTO =
        await transactionService.deleteTransaction(transaction_id);
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  async getFilterTransaction(req: Request, res: Response): Promise<void> {
    const { month, year, account_name,category_name,transaction_type,limit,page }: QueryParams = req.query;
    const { user_id } = req.body;

    const queryParams : QueryParams = {
        month,
        year,
        account_name,
        category_name,
        transaction_type,
        limit,
        page
      };
    try {
        const result: TransactionResponseDTO = await transactionService.getFilterTransaction(user_id,queryParams);
        res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
  async getSummaryTransaction(req: Request, res: Response): Promise<void> {
    const { month, year, account_name,category_name,transaction_type }: QueryParams = req.query;
    const { user_id } = req.body;
    const queryParams : QueryParams = {
        month,
        year,
        account_name,
        category_name,
        transaction_type
      };
    try {
        const result: TransactionSummaryResponseDTO = await transactionService.getSummaryTransaction(user_id,queryParams);
        res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
}
