import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array() });
};