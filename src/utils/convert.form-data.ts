
import { Request,Response } from "express";
import { TransactionDTO } from "../dto/transaction.dto";
import { UpdateTransactionDTO } from "../dto/update-transaction.dto";
import { plainToInstance } from "class-transformer";

const transactionConvertFormData = (req: Request): TransactionDTO => {
    if (
      !req.body.account_id ||
      !req.body.category_id ||
      !req.body.amount ||
      !req.body.date ||
      !req.body.transaction_type
    ) {
      throw new Error('Missing required fields');
    }
  
    const account_id = parseInt(req.body.account_id, 10);
    if (isNaN(account_id)) {
      throw new Error('Invalid account_id');
    }
  
    const category_id = parseInt(req.body.category_id, 10);
    if (isNaN(category_id)) {
      throw new Error('Invalid category_id');
    }
  
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount)) {
      throw new Error('Invalid amount');
    }
  
    const date = new Date(req.body.date);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
  
    return {
        account_id,
        category_id,
        amount,
        date,
        comment: req.body.comment || '',
        slip_image_url: req.body.slip_image_url || undefined,
        transaction_type: req.body.transaction_type,
        cdn_public_id:req.body.cdn_public_id,
        deleteImage:req.body.deleteImage
    };
  };
  const updateTransactionConvertFormData = async (req: Request): Promise<UpdateTransactionDTO> => {
    const transactionData = plainToInstance(UpdateTransactionDTO, {
      account_id: req.body.account_id ? parseInt(req.body.account_id, 10) : undefined,
      category_id: req.body.category_id ? parseInt(req.body.category_id, 10) : undefined,
      amount: req.body.amount ? parseFloat(req.body.amount) : undefined,
      date: req.body.date ? new Date(req.body.date) : undefined,
      comment: req.body.comment || undefined,
      slip_image_url: req.body.deleteImage === "true" ? null : req.body.slip_image_url || undefined,
      cdn_public_id: req.body.deleteImage === "true" ? null : req.body.cdn_public_id || undefined,
      transaction_type: req.body.transaction_type || undefined,
      deleteImage: req.body.deleteImage ? JSON.parse(req.body.deleteImage.toLowerCase()) : false,
    });
  
    return transactionData;
  };
  
export { transactionConvertFormData,updateTransactionConvertFormData };
