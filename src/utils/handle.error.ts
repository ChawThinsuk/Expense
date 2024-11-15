import { ValidationError } from "class-validator";
import { Response } from "express";

export function handleValidationError(
  res: Response,
  errors: ValidationError[]
): void {
  const errorMessages = errors.map(({ property, constraints }) => ({
    property,
    constraints,
  }));
  res.status(400).json({ message: "Validation failed", errors: errorMessages });
}

export function handleDbError(error: any): void {
  if (error instanceof CustomError) {
    throw error;
  }
  if (error.code === '23505') {
     throw new CustomError(error.detail, 409);
  }
  if (error.code === '23503') {
    throw new CustomError(error.detail, 404);
  }
  if (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT") {
    throw new CustomError('Unable to connect to the database. Please try again later.', 503);
  }
}

export class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}