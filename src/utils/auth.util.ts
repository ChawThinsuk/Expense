import crypto from 'crypto';

function generateCustomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export  { generateCustomToken }