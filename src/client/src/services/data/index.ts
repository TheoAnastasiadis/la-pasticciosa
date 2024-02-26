import { TRPCClientError, createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../../server/data/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const backend = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_BASE_URL + "data",
    }),
  ],
});

export type ClientError = TRPCClientError<AppRouter>;

export type InputTypes = inferRouterInputs<AppRouter>;

export type OutputTypes = inferRouterOutputs<AppRouter>;
