import { TRPCError } from "@trpc/server";
import { middleware } from "../setup";
import { z } from "zod";
import assert from "assert";

export default middleware(async ({ ctx, meta, next, getRawInput }) => {
  const { session } = ctx;

  assert(
    typeof meta?.secure !== "undefined" &&
      typeof meta.adminOnly !== "undefined",
  );

  // in insecure contexts, onBehalf will be undefined.
  if (!meta.secure) return await next({ ctx: { ...ctx, onBehalf: undefined } });

  // In secure contexts, authentication must have been
  // succesfully completed before this middleware can run.
  // If not, this route should not return.
  if (
    typeof session === "undefined" ||
    typeof session.user === "undefined" ||
    typeof meta?.adminOnly === "undefined" ||
    typeof meta.secure === "undefined"
  )
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

  const caller = session.user; // caller is the user making the request
  if (meta.adminOnly && !caller.isAdmin()) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "This functionality is only available to administrators. Please log in with admin credentials.",
    });
  }

  if (caller.isAdmin()) {
    // Administrators can pass userIds in the (optional) 'onBehalf' field of their request. The request will then be proccessed as being initiated by the user themselves.
    const input = z
      .object({
        onBehalf: z.coerce.string().refine((uuid) => uuid !== "undefined"), // we have to coerce the parser to treat user ids as strings and not numbers. Unfortuantelly this will also coerce undefined to "undefined" so we have to explicitily check for that.
      })
      .safeParse(await getRawInput());
    if (input.success)
      return await next({ ctx: { ...ctx, onBehalf: input.data.onBehalf } });
  }

  // Simple users can only act 'on behalf' of themselves.
  return await next({ ctx: { ...ctx, onBehalf: caller.uuid } });
});
