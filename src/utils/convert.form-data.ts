
import { Request,Response } from "express";
import { TransactionDTO } from "../dto/transaction.dto";
import { UpdateTransactionDTO } from "../dto/update-transaction.dto";
import { plainToInstance } from "class-transformer";

const transactionConvertFormData = (req: Request): TransactionDTO => {
    console.log("req.body.user_idreq.body.user_id",req.body.user_id);
    
    if (
      !req.body.user_id ||
      !req.body.account_id ||
      !req.body.category_id ||
      !req.body.amount ||
      !req.body.date ||
      !req.body.transaction_type
    ) {
      throw new Error('Missing required fields');
    }
    const user_id = parseInt(req.body.user_id, 10);
    if (isNaN(user_id)) {
      throw new Error('Invalid user_id');
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
        user_id,
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
    console.log("req.body.user_idreq.body.user_id",req.body.user_id);

    const transactionData = plainToInstance(UpdateTransactionDTO, {
      user_id: req.body.user_id ? parseInt(req.body.user_id, 10) : undefined,
      account_id: req.body.account_id ? parseInt(req.body.account_id, 10) : undefined,
      category_id: req.body.category_id ? parseInt(req.body.category_id, 10) : undefined,
      amount: req.body.amount ? parseFloat(req.body.amount) : undefined,
      date: req.body.date ? new Date(req.body.date) : undefined,
      comment: req.body.comment || undefined,
      slip_image_url: req.body.slip_image_url || undefined,
      cdn_public_id: req.body.cdn_public_id || undefined,
      transaction_type: req.body.transaction_type || undefined,
      deleteImage: req.body.deleteImage || undefined, // แปลงเป็น boolean
    });
  
    return transactionData;
  };
  
export { transactionConvertFormData,updateTransactionConvertFormData };
