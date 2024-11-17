import { Request, Response } from "express";
import { AccountResponseDTO, ServiceResultDTO } from "../dto/result.dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CustomError, handleValidationError } from "../utils/handle.error";
import { AccountService } from "../services/account.service";
import { AccountDTO } from "../dto/account.dto";
import { decodeToken } from "../utils/auth.util";

const accountService: AccountService = new AccountService();

export class AccountController {
  async createAccount (req: Request, res: Response): Promise<void> {
    const accountInput: AccountDTO = plainToInstance(AccountDTO, req.body);
    const tokenFromHeader = req.headers.authorization?.split(' ')[1];
    const user_id = decodeToken(tokenFromHeader!)!.user_id;
    const errors = await validate(accountInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result : ServiceResultDTO = await accountService.createAccount(accountInput,user_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async getAccount(req: Request, res: Response): Promise<void> {
    const account_id: number = parseInt(req.params.account_id, 10);  
    if (!account_id) {
      res.status(400).json({ error: 'account_id is required' });
      return;
    }
    try {
      const result : ServiceResultDTO = await accountService.getAccount(account_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
  async getAllAccount(req: Request, res: Response): Promise<void> {
    const tokenFromHeader = req.headers.authorization?.split(' ')[1];
    const user_id = decodeToken(tokenFromHeader!)!.user_id;  
    try {
      const result : AccountResponseDTO = await accountService.getAllAccount(user_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }


  async updateAccount(req: Request, res: Response): Promise<void> {
    const account_id: number = parseInt(req.params.account_id, 10);  
    if (!account_id) {
      res.status(400).json({ error: 'account_id is required' });
      return;
    }
    const accountInput: AccountDTO = plainToInstance(AccountDTO, req.body);
    const { user_id } = req.body; 
    const errors = await validate(accountInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result: ServiceResultDTO = await accountService.updateAccount(account_id, accountInput,user_id);
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



  async deleteAccount(req: Request, res: Response): Promise<void> {
    const account_id: number = parseInt(req.params.account_id, 10);  
    if (!account_id) {
      res.status(400).json({ error: 'account_id is required' });
      return;
    }
    try {
      const result: ServiceResultDTO = await accountService.deleteAccount(account_id);
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
