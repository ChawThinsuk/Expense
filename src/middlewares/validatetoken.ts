import { Request, Response, NextFunction } from 'express';
import pool from '../db/db';

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {

    const publicRoutes = ['/auth/login', '/register'];
    if (publicRoutes.includes(req.path)) {
      return next();
    }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token is required' });
    return;
  }

  try {
    const query = `SELECT * FROM "tbm_Sessions" WHERE token = $1 AND expires_at > NOW()`;
    const result = await pool.query(query, [token]);

    if (!result.rows[0]) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    (req as any).body.user_id = result.rows[0].user_id;
    console.log("result.rows[0].user_id",result.rows[0].user_id);
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while verifying token' });
  }
}