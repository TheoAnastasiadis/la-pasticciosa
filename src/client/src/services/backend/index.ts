import {
  TRPCClientError,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client";
import type { AppRouter } from "../../../../server/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const backend = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8080/data",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export type ClientError = TRPCClientError<AppRouter>;

export type InputTypes = inferRouterInputs<AppRouter>;

export type OutputTypes = inferRouterOutputs<AppRouter>;
