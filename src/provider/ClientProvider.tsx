"use client";

import { ChainProvider } from "@cosmos-kit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains, assets } from "chain-registry";
import { wallets as cosmosWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { localChain, localAssets } from "@/config/chain";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const allChains = [localChain, ...chains];
const allAssets = [localAssets, ...assets];

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChainProvider
        chains={allChains}
        assetLists={allAssets}
        wallets={[...cosmosWallets, ...leapWallets]}
      >
        {children}
      </ChainProvider>
    </QueryClientProvider>
  );
}
