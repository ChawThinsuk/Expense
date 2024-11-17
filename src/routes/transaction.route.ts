import express from 'express';
import upload from '../middlewares/multer';
import { TransactionController } from '../controllers/transaction.controller';

const router = express.Router();
const transactionController = new TransactionController();

router.post('/createtransaction', upload.single('slip_image_url'), (req, res) => transactionController.createTransaction(req, res));
router.get('/gettransaction/:transaction_id', (req, res) => transactionController.getTransaction(req, res));
router.put('/updatetransaction/:transaction_id', upload.single('slip_image_url'), (req, res) => transactionController.updateTransaction(req, res));
router.delete('/deletetransaction/:transaction_id', (req, res) => transactionController.deleteTransaction(req, res));

router.get('/getfiltertransaction', (req, res) => transactionController.getFilterTransaction(req, res));
router.get('/getsummarytransaction', (req, res) => transactionController.getSummaryTransaction(req, res));

export default router;