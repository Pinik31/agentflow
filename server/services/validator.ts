
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { AppError } from "./errorHandler";

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(new AppError(400, 'Validation Error'));
    }
};
