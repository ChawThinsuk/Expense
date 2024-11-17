import crypto from 'crypto';
import { Request } from "express";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined in the environment variables');
  }
  const secretKey = process.env.SECRET_KEY;

function generateToken(userId: number): string {
    
    const data = JSON.stringify({ user_id: userId});
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
function decodeToken(token: string): { user_id: number} | null {
    const parts = token.split(':'); 
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    try {
      const data = JSON.parse(decrypted);
      return { user_id: data.user_id };
    } catch (error) {
      return null;
    }
  }
function generateDeviceId (req:Request): string {
    const userAgent = req.headers['user-agent'] || 'unknown-user-agent';
    const ip = req.ip || 'unknown-ip';
    const combinedInfo = `${userAgent}-${ip}`;
    const deviceId = crypto.createHash('sha256').update(combinedInfo).digest('hex');
    return deviceId;
  };
  

export  { generateDeviceId,generateToken,decodeToken }