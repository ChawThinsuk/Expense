import express from 'express';
import { AccountController } from '../controllers/account.controller';


const router = express.Router();
const accountController = new AccountController();

router.post('/createaccount', (req, res) => accountController.createAccount(req, res));
router.get('/getaccount/:account_id', (req, res) => accountController.getAccount(req, res));
router.put('/updateaccount/:account_id', (req, res) => accountController.updateAccount(req, res));
router.delete('/deleteaccount/:account_id', (req, res) => accountController.deleteAccount(req, res));


export default router;