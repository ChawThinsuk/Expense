import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../utils/handle.error";
import { LoginServiceResultDTO } from "../dto/auth.dto";
import { generateDeviceId } from "../utils/auth.util";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    const device_id = generateDeviceId(req)
    try {
      const result: LoginServiceResultDTO = await authService.login(
        username,
        password,
        device_id
      );
      const { userId, token } = result;
      res.status(200).json({ userId, token,device_id });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
  async logoutFromDevice(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];
    const { device_id } = req.body;
    if (!token || !device_id) {
      res.status(400).json({ message: "Token and device ID are required" });
      return;
    }
    try {
      const result: string = await authService.logoutFromDevice(token, device_id);
      res.status(200).json({ message: result });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
  async logoutFromAllDevices(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }
    try {
      const result: string = await authService.logoutFromAllDevices(token);
      res.status(200).json({ message: result });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
}
