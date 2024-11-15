import express from 'express';
import { UserController } from '../controllers/user.controller';


const router = express.Router();
const userController = new UserController();

router.post('/createuser', (req, res) => userController.createUser(req, res));
router.get('/getuser/:user_id', (req, res) => userController.getUser(req, res));
router.put('/updateUser/:user_id', (req, res) => userController.updateUser(req, res));
router.delete('/deleteUser/:user_id', (req, res) => userController.deleteUser(req, res));


export default router;