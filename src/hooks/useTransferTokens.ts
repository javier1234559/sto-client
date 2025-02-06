/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface TransferProps {
  address: string | undefined;
  getSigningStargateClient: () => Promise<any>;
}

export const useTransferTokens = ({
  address,
  getSigningStargateClient,
}: TransferProps) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");
  const [gasAmount, setGasAmount] = useState("50000");
  const [gasPrice, setGasPrice] = useState("200000");
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const { toast } = useToast();

  const handleTransfer = async () => {
    if (!address || !amount || !recipient) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      toast({
        title: "Processing Transaction",
        description: "Your transfer is being processed...",
      });

      const client = await getSigningStargateClient();
      if (!client) {
        throw new Error("Failed to get signing client");
      }
      const amountInUstoc = (Number(amount) * 1000000).toString();

      const result = await client.sendTokens(
        address,
        recipient,
        [{ denom: "ustoc", amount: amountInUstoc }],
        {
          amount: [{ denom: "ustoc", amount: gasAmount }],
          gas: gasPrice,
        }
      );

      console.log("Transaction result:", result);
      setTransactionResult(result);

      toast({
        title: "Success!",
        description: `Transaction completed. Hash: ${result.transactionHash}`,
      });

      setStatus("Transaction successful!");
      setAmount("");
      setRecipient("");
    } catch (error: unknown) {
      console.error("Transfer error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: `Error: ${errorMessage}`,
      });

      setStatus(`Transfer failed: ${errorMessage}`);
      setTransactionResult(null);
    }
  };

  return {
    amount,
    setAmount,
    recipient,
    setRecipient,
    status,
    setStatus,
    gasAmount,
    setGasAmount,
    gasPrice,
    setGasPrice,
    transactionResult,
    handleTransfer,
  };
};
