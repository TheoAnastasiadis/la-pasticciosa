// @ts-nocheck
import { AssertionError } from "assert";
import authenticate from "../../../src/server/data/router/middleware/authenticate";
import authorize from "../../../src/server/data/router/middleware/authorize";
import { TRPCError } from "@trpc/server";
import { Session } from "../../../src/server/entities/session";

describe("authenticate callback", () => {
  const middleware = authenticate._middlewares[0];
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws error if meta is undefined", async () => {
    const meta = undefined;
    const ctx = { sessionId: "session_id" };
    await expect(middleware({ ctx, next, meta })).rejects.toThrow(TRPCError);
    expect(next).not.toHaveBeenCalled();
  });

  it("throws error if meta.secure is true but sessionId is null", async () => {
    const meta = { secure: true };
    const ctx = { sessionId: null };
    await expect(middleware({ ctx, next, meta })).rejects.toThrow(TRPCError);
    expect(next).not.toHaveBeenCalled();
  });

  it("throws error if no active session found for provided sessionId", async () => {
    const meta = { secure: true };
    const ctx = { sessionId: "session_id" };
    jest.spyOn(Session, "find").mockResolvedValueOnce([]);
    await expect(middleware({ ctx, next, meta })).rejects.toThrow(TRPCError);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with updated context if secure and active session found", async () => {
    const meta = { secure: true, adminOnly: false };
    const ctx = { sessionId: "session_id" };
    const activeSession = {
      id: "session_id",
      user: { name: "test_user" },
    } as unknown as Session;
    jest.spyOn(Session, "find").mockResolvedValueOnce([activeSession]);
    await middleware({ ctx, next, meta });
    expect(next).toHaveBeenCalledWith({
      ctx: { ...ctx, session: activeSession },
    });
  });

  it("calls next with original context if not secure", async () => {
    const meta = { secure: false, adminOnly: false };
    const ctx = { sessionId: "session_id" };
    await middleware({ ctx, next, meta });
    expect(next).toHaveBeenCalledWith({ ctx });
  });
});

describe("authorize callback", () => {
  const middleware = authorize._middlewares[0];
  const next = jest.fn();
  const rawInput = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws error if meta is not defined", async () => {
    const meta = {};
    const ctx = {
      session: { user: { isAdmin: () => false, uuid: "user_uuid" } },
    };
    await expect(
      middleware({
        ctx,
        meta,
        next,
        getRawInput: () => Promise.resolve(rawInput),
      }),
    ).rejects.toThrow(AssertionError);
    expect(next).not.toHaveBeenCalled();
  });

  it("skips middleware if not secure", async () => {
    const meta = { secure: false, adminOnly: false };
    const ctx = {
      session: { user: { isAdmin: () => false, uuid: "user_uuid" } },
    };
    await middleware({
      ctx,
      meta,
      next,
      getRawInput: () => Promise.resolve(rawInput),
    });
    expect(next).toHaveBeenCalledWith({ ctx: { ...ctx, onBehalf: undefined } });
  });

  it("throws error if session or user is not defined", async () => {
    const meta = { secure: true, adminOnly: false };
    const ctx = {
      session: undefined,
    };
    await expect(
      middleware({
        ctx,
        meta,
        next,
        getRawInput: () => Promise.resolve(rawInput),
      }),
    ).rejects.toThrow(TRPCError);
    expect(next).not.toHaveBeenCalled();
  });

  it("throws error if meta.adminOnly is true and user is not admin", async () => {
    const meta = { secure: true, adminOnly: true };
    const ctx = {
      session: { user: { isAdmin: () => false, uuid: "user_uuid" } },
    };
    await expect(
      middleware({
        ctx,
        meta,
        next,
        getRawInput: () => Promise.resolve(rawInput),
      }),
    ).rejects.toThrow(TRPCError);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with onBehalf set to userId if user is admin and onBehalf is provided", async () => {
    const meta = { secure: true, adminOnly: false };
    const ctx = {
      session: { user: { isAdmin: () => true, uuid: "user_uuid" } },
    };
    const rawInput = { onBehalf: "other_user_uuid" };
    await middleware({
      ctx,
      meta,
      next,
      getRawInput: () => Promise.resolve(rawInput),
    });
    expect(next).toHaveBeenCalledWith({
      ctx: { ...ctx, onBehalf: rawInput.onBehalf },
    });
  });

  it("calls next with onBehalf set to caller userId if user is admin and onBehalf is not provided", async () => {
    const meta = { secure: true, adminOnly: false };
    const ctx = {
      session: { user: { isAdmin: () => true, uuid: "user_uuid" } },
    };
    const rawInput = { onBehalf: undefined };
    await middleware({
      ctx,
      meta,
      next,
      getRawInput: () => Promise.resolve(rawInput),
    });
    expect(next).toHaveBeenCalledWith({
      ctx: { ...ctx, onBehalf: ctx.session.user.uuid },
    });
  });

  it("calls next with onBehalf set to caller userId if user is not admin", async () => {
    const meta = { secure: true, adminOnly: false };
    const ctx = {
      session: { user: { isAdmin: () => false, uuid: "user_uuid" } },
    };
    const rawInput = { onBehalf: "other_user_uuid" };
    await middleware({
      ctx,
      meta,
      next,
      getRawInput: () => Promise.resolve(rawInput),
    });
    expect(next).toHaveBeenCalledWith({
      ctx: { ...ctx, onBehalf: ctx.session.user.uuid },
    });
  });
});
