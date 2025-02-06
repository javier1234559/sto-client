// import { useChainWallet } from '@cosmos-kit/react';
// import { StdFee } from '@cosmjs/amino';

// export const useGasEstimation = (chainName: string = 'stochain') => {
//   const { estimateFee } = useChainWallet(chainName);

//   const estimateGasAndFees = async (
//     fromAddress: string,
//     toAddress: string,
//     amount: string,
//     denom: string = 'ustoc'
//   ) => {
//     try {
//       const messages = [{
//         typeUrl: "/cosmos.bank.v1beta1.MsgSend",
//         value: {
//           fromAddress,
//           toAddress,
//           amount: [{ denom, amount }]
//         }
//       }];

//       const fee: StdFee = await estimateFee(messages);
//       const gasLimit = parseInt(fee.gas);
//       const gasFee = fee.amount[0].amount;

//       return {
//         isEnough: true, // You might want to add balance check here
//         requiredGas: gasLimit,
//         estimatedFee: `${gasFee} ${denom}`,
//         availableBalance: "0", // You might want to add balance check here
//         canProceed: true,
//         fee
//       };
//     } catch (error) {
//       console.error("Gas estimation failed:", error);
//       throw error;
//     }
//   };

//   return { estimateGasAndFees };
// }; 