import { Request, Response } from "express";
import path from "path";

export const indexHandler = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
};
