import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
  next();
};
