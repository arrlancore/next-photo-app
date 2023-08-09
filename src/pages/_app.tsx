import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouteGuard,
  useRedirectUnauthorizedPaths,
} from "@/components/route-guard";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useRedirectUnauthorizedPaths();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
