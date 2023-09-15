import type { NextFunction, Request, Response } from "express";
import moment from "moment";
import type { User } from "../../../entities/user";
import { Session } from "../../../entities/session";

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const user = req.user as User;

  Session.create({
    user,
    deletedAt: moment().add(1, "M").toDate(),
  })
    .save()
    .then((session) => {
      res.cookie("__session", session.id, {
        httpOnly: true,
        expires: moment().add(1, "M").toDate(),
      });
      res.redirect("/dashboard");
    })
    .catch(next);
}
