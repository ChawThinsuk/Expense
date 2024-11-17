import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/logoutfromdevice', (req, res) => authController.logoutFromDevice(req, res));
router.post('/logoutfromalldevices', (req, res) => authController.logoutFromAllDevices(req, res));
export default router;