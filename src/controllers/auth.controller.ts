import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
