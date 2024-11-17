import { Request, Response } from "express";
import { ServiceResultDTO } from "../dto/result.dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CustomError, handleValidationError } from "../utils/handle.error";
import { AccountService } from "../services/account.service";
import { AccountDTO } from "../dto/account.dto";
import { BadWordService } from "../services/badword.service";
import { BadWordDTO } from "../dto/badword.dto";

const badwordService: BadWordService = new BadWordService();

export class BadWordController {
  
  async createBadWord (req: Request, res: Response): Promise<void> {
    const badwordInput: BadWordDTO = plainToInstance(BadWordDTO, req.body);
    const errors = await validate(badwordInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }

    try {
      const result : ServiceResultDTO = await badwordService.createBadWord(badwordInput);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async getAllBadWords (req: Request, res: Response): Promise<void> {
    try {
      const result : ServiceResultDTO = await badwordService.getAllBadWords();
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }


  async updateBadWord (req: Request, res: Response): Promise<void> {
    const oldBadWord : string = req.params.oldBadWord  
    if (!oldBadWord) {
      res.status(400).json({ error: 'oldBadWord is required' });
      return;
    }

    const badWordInput: BadWordDTO = plainToInstance(BadWordDTO, req.body);
    const errors = await validate(badWordInput);
    if (errors.length > 0) {
      handleValidationError(res, errors);
      return;
    }
    try {
      const result: ServiceResultDTO = await badwordService.updateBadWord(oldBadWord, badWordInput);
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



  async deleteBadWord(req: Request, res: Response): Promise<void> {
    const oldBadWord : string = req.params.oldBadWord  
    if (!oldBadWord) {
      res.status(400).json({ error: 'bad word is required' });
      return;
    }
    try {
      const result: ServiceResultDTO = await badwordService.deleteBadWord(oldBadWord);
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
