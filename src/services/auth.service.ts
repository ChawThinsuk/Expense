import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/db';
import { CustomError, handleDbError } from '../utils/handle.error';
import { generateToken } from '../utils/auth.util';
import { LoginServiceResultDTO } from '../dto/auth.dto';

export class AuthService {
  async login (username: string,password:string,device_id:string):Promise<LoginServiceResultDTO> {
    const query = `
    SELECT * FROM "tbm_Users" WHERE username = $1;
  `;
    try {
      const UserResult = await pool.query(query, [username]);
      if (!UserResult.rows[0]) {
        throw new CustomError(
          "User not found",
          404
        );
      }
      console.log(" UserResult.rows[0]", UserResult.rows[0]);
      
      const userInformation =  UserResult.rows[0]
      const hashedPassword = UserResult.rows[0].password;
      const user_id = UserResult.rows[0].user_id;
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      if (!isPasswordValid) {
        throw new CustomError(
          "Password is not correct",
          401
        );
      }
      const token = generateToken(user_id)
      const expireAt = new Date(Date.now() + 60 * 60 * 1000);
      const insertSessionQuery = `
        INSERT INTO "tbm_Sessions" (user_id, token, device_id, created_at ,expires_at)
        VALUES ($1, $2, $3, NOW() ,$4)
      `;
      await pool.query(insertSessionQuery, [
        userInformation.user_id,
        token,
        device_id,
        expireAt
      ]);
      return {
        userId: userInformation.user_id,
        token: token,
        device_id:device_id
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while log in', 500);
    }
  }

  async logoutFromDevice (token:string,device_id:string):Promise<string> {
    const query = `
      DELETE FROM "tbm_Sessions"
      WHERE token = $1 AND device_id = $2
  `;
  try {
    const result = await pool.query(query, [token, device_id]);
    if (result.rowCount === 0) {
      throw new CustomError('No active session found for this device',404);
    }
    return 'Logged out from device successfully'
  } catch (error) {
    handleDbError(error)
    throw new CustomError('An error occurred during logout', 500);
  }
  }
  async logoutFromAllDevices (token:string):Promise<string> {
    const query = `
      SELECT * FROM "tbm_Sessions" WHERE token = $1
  `;
  try {
    const result = await pool.query(query, [token]);
    if (result.rowCount === 0) {
      throw new CustomError('No active session found',404);
    }
    const userId = result.rows[0].user_id;
    return 'Logged out from all devices successfully'
  } catch (error) {
    handleDbError(error)
    throw new CustomError('An error occurred during logout from all devices', 500);
  }
  }
}
