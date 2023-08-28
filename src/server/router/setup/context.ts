import type * as trpcExpress from "@trpc/server/adapters/express";
import type { Session } from "../../entities/session";

export interface Context {
  sessionId: string | null;
  setCookie: trpcExpress.CreateExpressContextOptions["res"]["cookie"];
  session?: Session;
}

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> {
  return {
    sessionId: req.cookies.sessionId,
    setCookie: res.cookie.bind(res),
  };
}
