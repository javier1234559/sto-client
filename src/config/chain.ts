import { Chain, AssetList } from "@chain-registry/types";

export const NODE_URL = process.env.NEXT_PUBLIC_NODE_URL;

export const localChain: Chain = {
  chain_type: "cosmos",
  chain_name: "stoc",
  status: "live",
  network_type: "testnet",
  pretty_name: "Stochain",
  chain_id: "stoc",
  bech32_prefix: "stoc",
  daemon_name: "stocd",
  node_home: "/root/.stoc",
  key_algos: ["secp256k1"],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "ustoc",
        fixed_min_gas_price: 0.0001,
        low_gas_price: 0.0001,
        average_gas_price: 0.0001,
        high_gas_price: 0.0001,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: "ustoc",
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: `http://localhost:26657`,
      },
    ],
    rest: [
      {
        address: `http://localhost:1317`,
      },
    ],
  },
};
  
export const localAssets: AssetList = {
  chain_name: "stoc",
  assets: [
    {
      description: "The native token of Stochain",
      denom_units: [
        {
          denom: "ustoc",
          exponent: 0,
        },
        {
          denom: "STOC",
          exponent: 6,
        },
      ],
      base: "ustoc",
      name: "Stochain Token",
      display: "STOC",
      symbol: "STOC",
      type_asset: "sdk.coin",
    }
  ],
};
