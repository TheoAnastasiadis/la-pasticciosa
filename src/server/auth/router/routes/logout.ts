import type { Request, Response } from "express";

export default function (req: Request, res: Response): void {
  res.clearCookie("sessionId");
  res.redirect("/");
}
