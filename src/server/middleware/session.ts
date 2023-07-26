import moment from "moment";
import { sessionRepo } from "../database/repos/session.repo";
import type { Session } from "../entities/session.entity";
import type { User } from "../entities/user.entity";
import { TRPCError } from "@trpc/server";

export const findSessionById: (id: string) => Promise<Session> = async (id) => {
  const sessions = await sessionRepo.find({
    where: { id },
    relations: { user: true },
  });
  if (sessions.length < 1) throw new TRPCError({ code: "BAD_REQUEST" });
  return sessions[0];
};

export const generateSession: (user: User) => Promise<string> = async (
  user,
) => {
  const session = sessionRepo.create({
    user,
    deletedAt: moment(new Date()).add(1, "M").toDate(),
  });
  return (await sessionRepo.insert(session)).generatedMaps[0].id;
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
  session.deletedAt = new Date();
  await session.save();
};
