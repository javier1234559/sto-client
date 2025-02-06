import { useState } from "react";
import { useChain, useManager } from "@cosmos-kit/react";

export const useWalletConnection = () => {
  const [status, setStatus] = useState("");
  const [selectedChain, setSelectedChain] = useState<string>("");

  const manager = useManager();
  const chains = manager.chainRecords;

  const {
    connect,
    disconnect,
    wallet,
    status: chainStatus,
    address,
    getSigningStargateClient,
  } = useChain(selectedChain || chains[0]?.name);

  const handleConnect = async () => {
    try {
      console.log("Connecting wallet...");
      console.log("Current status:", chainStatus);
      if (chainStatus !== "Connected") {
        await connect();
        console.log("Connected successfully");
        console.log("New status:", chainStatus);
        console.log("Address:", address);
      }
    } catch (error) {
      console.error("Connection error:", error);
      setStatus("Failed to connect wallet");
    }
  };

  return {
    status,
    setStatus,
    selectedChain,
    setSelectedChain,
    chains,
    wallet,
    chainStatus,
    address,
    getSigningStargateClient,
    handleConnect,
    disconnect,
  };
};
