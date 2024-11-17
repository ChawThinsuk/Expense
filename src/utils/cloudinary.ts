import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (!cloud_name) {
    throw new Error('CLOUDINARY_CLOUD_NAME is not defined in the environment variables');
  }
  
  if (!api_key) {
    throw new Error('CLOUDINARY_API_KEY is not defined in the environment variables');
  }
  
  if (!api_secret) {
    throw new Error('CLOUDINARY_API_SECRET is not defined in the environment variables');
  }

cloudinary.config({
  cloud_name: cloud_name,  
  api_key: api_key,  
  api_secret: api_secret,  
});

export default cloudinary;