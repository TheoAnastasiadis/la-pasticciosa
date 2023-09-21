import type { Request, Response } from "express";
import { Session } from "../../entities/session";
import assert from "assert";
import { MoreThanOrEqual } from "typeorm";

export async function sessionAuth(req: Request, res: Response): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { __session } = req.cookies;

  // assert cookie is properly set
  if (typeof __session !== "string" || __session.length === 0)
    throw new Error("No session, or wrong session id provided");

  // assert session user is administrator
  const session = await Session.findOneOrFail({
    where: { id: __session, deletedAt: MoreThanOrEqual(new Date()) },
    relations: { user: true },
    withDeleted: true,
  });

  assert(session.user);

  if (!session.user?.isAdmin())
    throw new Error("You are not authorized to access this endpoint");

  req.user = session.user;
}
