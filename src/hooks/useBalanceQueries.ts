/* eslint-disable @typescript-eslint/no-explicit-any */
import { NODE_URL } from "@/config/chain";
import { useQuery } from "@tanstack/react-query";

interface BalanceQueryProps {
  address: string | undefined;
  selectedChain: string;
  chainStatus: string;
  getSigningStargateClient: () => Promise<any>;
}

export const useBalanceQueries = ({
  address,
  selectedChain,
  chainStatus,
  getSigningStargateClient,
}: BalanceQueryProps) => {
  const { data: balanceStargate, isLoading: isBalanceStargateLoading } =
    useQuery({
      queryKey: ["balanceStargate", address, selectedChain],
      queryFn: async () => {
        console.log("Executing Stargate query");
        if (!address || !selectedChain) {
          console.log("Missing address or selectedChain");
          return null;
        }
        try {
          const client = await getSigningStargateClient();
          console.log("Client initialized:", !!client);
          const balance = await (client as any).getBalance(address, "ustoc");
          console.log("Balance from Stargate:", balance);
          return balance;
        } catch (error) {
          console.error("Error fetching Stargate balance:", error);
          return null;
        }
      },
      enabled: !!address && !!selectedChain && chainStatus === "Connected",
      retry: false,
      refetchInterval: 10000,
    });

  const { data: balanceRest, isLoading: isBalanceRestLoading } = useQuery({
    queryKey: ["balanceRest", address, selectedChain],
    queryFn: async () => {
      console.log("Executing REST query");
      if (!address || !selectedChain) {
        console.log("Missing address or selectedChain");
        return null;
      }
      try {
        const response = await fetch(
          `${NODE_URL}:1317/cosmos/bank/v1beta1/balances/${address}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("REST API response:", data);
        const ustocBalance = data.balances.find(
          (b: { denom: string }) => b.denom === "ustoc"
        );
        console.log("Balance from REST:", ustocBalance);
        return ustocBalance || { amount: "0" };
      } catch (error) {
        console.error("Error fetching REST balance:", error);
        return { amount: "0" };
      }
    },
    enabled: !!address && !!selectedChain && chainStatus === "Connected",
    retry: false,
    refetchInterval: 5000,
  });

  return {
    balanceStargate,
    balanceRest,
    isBalanceStargateLoading,
    isBalanceRestLoading,
  };
};
