import moment from "moment";
import { Session } from "../entities/session.entity";
import type { User } from "../entities/user.entity";
import { TRPCError } from "@trpc/server";

export const findSessionById: (id: string) => Promise<Session> = async (id) => {
  const sessions = await Session.find({
    where: { id },
    relations: { user: true },
  });
  if (sessions.length < 1) throw new TRPCError({ code: "BAD_REQUEST" });
  return sessions[0];
};

export const generateSession: (user: User) => Promise<string> = async (
  user,
) => {
  const session = Session.create({
    user,
    deletedAt: moment(new Date()).add(1, "M").toDate(),
  });
  await Session.insert(session);
  return session.id;
};

export const populateSession: (
  id: string | null,
) => Promise<Session | null> = async (id) => {
  if (id == null) return await Promise.resolve(null);
  else return await findSessionById(id);
};

export const deleteSession: (session: Session) => Promise<void> = async (
  session,
) => {
  await session.softRemove();
};
