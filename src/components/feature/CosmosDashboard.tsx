"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useBalanceQueries } from "@/hooks/useBalanceQueries";
import { useTransferTokens } from "@/hooks/useTransferTokens";
import { Toaster } from "@/components/ui/toaster";
import { formatJSON } from "@/utils/formatJSON";

const CosmosDashboard = () => {
  const {
    selectedChain,
    setSelectedChain,
    chains,
    wallet,
    chainStatus,
    address,
    getSigningStargateClient,
    handleConnect,
    disconnect,
  } = useWalletConnection();

  const {
    balanceStargate,
    balanceRest,
    isBalanceStargateLoading,
    isBalanceRestLoading,
  } = useBalanceQueries({
    address,
    selectedChain,
    chainStatus,
    getSigningStargateClient,
  });

  const {
    amount,
    setAmount,
    recipient,
    setRecipient,
    status: transferStatus,
    gasAmount,
    setGasAmount,
    gasPrice,
    setGasPrice,
    transactionResult,
    handleTransfer,
  } = useTransferTokens({
    address,
    getSigningStargateClient,
  });

  useEffect(() => {
    if (chains.length > 0 && !selectedChain) {
      setSelectedChain(chains[0].name);
    }
  }, [chains, selectedChain, setSelectedChain]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            STOC Wallet Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section className="border-b pb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Chain</label>
                <Select
                  value={selectedChain || chains[0]?.name}
                  onValueChange={(value) => setSelectedChain(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a chain" />
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map((chain) => (
                      <SelectItem key={chain.name} value={chain.name}>
                        <div className="flex items-center gap-2">
                          {chain.name}
                          <span className="text-xs text-muted-foreground">
                            ({chain.chain?.chain_id})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </section>

            {!address ? (
              <Button onClick={handleConnect} className="w-full">
                Connect Wallet
              </Button>
            ) : (
              <>
                <section className="bg-secondary/20 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="font-medium">Connected Address:</div>
                    <div className="text-sm break-all">{address}</div>
                    <div className="text-2xl font-medium mt-4 mb-2">
                      Balance:
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-background rounded-md">
                        <div className="text-sm text-muted-foreground mb-1">
                          Stargate
                        </div>
                        <div className="text-lg font-medium">
                          {isBalanceStargateLoading
                            ? "Loading..."
                            : `${(
                                Number(balanceStargate?.amount || 0) / 1000000
                              ).toFixed(6)} STOC`}
                        </div>
                      </div>
                      <div className="p-3 bg-background rounded-md">
                        <div className="text-sm text-muted-foreground mb-1">
                          REST API
                        </div>
                        <div className="text-lg font-medium">
                          {isBalanceRestLoading
                            ? "Loading..."
                            : `${(
                                Number(balanceRest?.amount || 0) / 1000000
                              ).toFixed(6)} STOC`}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Transfer Tokens</h3>
                  <div className="space-y-4">
                    <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Recipient Address
                          </label>
                          <div className="text-xs text-muted-foreground mb-2">
                            Enter the wallet address of the recipient (ex:
                            stoc1...)
                          </div>
                          <Input
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter recipient address"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Amount (STOC)
                          </label>
                          <div className="text-xs text-muted-foreground mb-2">
                            Amount of tokens to send in STOC (ex: 1.5 STOC =
                            1,500,000 ustoc)
                          </div>
                          <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount in STOC"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Gas Amount (ustoc)
                        </label>
                        <div className="text-xs text-muted-foreground mb-2">
                          Amount of gas units (ex: 5000 ustoc for standard
                          transfer)
                        </div>
                        <Input
                          type="number"
                          value={gasAmount}
                          onChange={(e) => setGasAmount(e.target.value)}
                          placeholder="Enter gas amount"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Gas Price
                        </label>
                        <div className="text-xs text-muted-foreground mb-2">
                          Price per unit of gas (ex: 20000 for standard price)
                        </div>
                        <Input
                          type="number"
                          value={gasPrice}
                          onChange={(e) => setGasPrice(e.target.value)}
                          placeholder="Enter gas price"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleTransfer}
                      disabled={!amount || !recipient}
                      className="w-full mt-4"
                    >
                      Send Tokens
                    </Button>

                    {transferStatus && (
                      <Alert>
                        <AlertDescription>{transferStatus}</AlertDescription>
                      </Alert>
                    )}

                    {transactionResult && (
                      <div className="mt-4 bg-secondary/20 p-4 rounded-lg">
                        <label className="block text-sm font-medium mb-2">
                          Transaction Result:
                        </label>
                        <pre className="bg-background p-4 rounded-lg overflow-auto">
                          <code>
                            {JSON.stringify(
                              formatJSON(transactionResult),
                              null,
                              2
                            )}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                </section>

                {chainStatus === "Connected" && (
                  <section className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Connected as: {wallet?.name}
                    </p>
                    <Button
                      onClick={() => disconnect()}
                      className="w-full"
                      variant="destructive"
                    >
                      Disconnect
                    </Button>
                  </section>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default CosmosDashboard;
