import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ServiceResultDTO } from "../models/result.dto";
import { UserDTO } from "../models/user.dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CustomError, handleValidationError } from "../utils/handle.error";

const userService: UserService = new UserService();

export class UserController {
  
  async createUser(req: Request, res: Response): Promise<void> {
    const userInput: UserDTO = plainToInstance(UserDTO, req.body);
    const errors = await validate(userInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result: ServiceResultDTO = await userService.createUser(userInput);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const user_id: number = parseInt(req.params.user_id, 10);  
    if (!user_id) {
      res.status(400).json({ error: 'user_id is required' });
      return;
    }
    try {
      const result : ServiceResultDTO = await userService.getUser(user_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }


  async updateUser(req: Request, res: Response): Promise<void> {
    const user_id: number = parseInt(req.params.user_id, 10);  
    if (!user_id) {
      res.status(400).json({ error: 'user_id is required' });
      return;
    }
    const userInput: UserDTO = plainToInstance(UserDTO, req.body);
    const errors = await validate(userInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result: ServiceResultDTO = await userService.updateUser(user_id, userInput);
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



  async deleteUser(req: Request, res: Response): Promise<void> {
    const user_id: number = parseInt(req.params.user_id, 10);  
    if (!user_id) {
      res.status(400).json({ error: 'user_id is required' });
      return;
    }
    try {
      const result: ServiceResultDTO = await userService.deleteUser(user_id);
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
