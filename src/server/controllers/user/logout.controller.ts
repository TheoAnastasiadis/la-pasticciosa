import type { Session } from "../../entities/session.entity";
import { deleteSession } from "../../middleware/session";

export const logOutController: (session: Session) => Promise<void> = async (
  session,
) => {
  await deleteSession(session);
};
