import type { Request, Response } from "express";

export default function (req: Request, res: Response): void {
  res.clearCookie("__session");
  res.redirect("/");
}
