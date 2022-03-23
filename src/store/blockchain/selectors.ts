import { ethers } from "ethers";
import { Web3State } from "src/types/blockchain";
import { StoreState } from "../../types/store";

export const getWeb3State = (state: StoreState): Web3State => state.blockchain.web3State;
export const getNetworkId = (state:StoreState): number => state.blockchain.networkID;
export const getEthAccount = (state:StoreState): string => state.blockchain.ethAccount;
export const getWeb3ErrorMessage = (state: StoreState): string => state.blockchain.message;
export const getWeb3Provider = (state: StoreState): ethers.providers.Web3Provider => state.blockchain.provider;
export const getEstimatedTxTimeMs = (state: StoreState): number => state.blockchain.gasInfo.estimatedTimeMs;
export const getPrice= (state: StoreState): string => state.blockchain.kongtamaPrice
export const getMaxMintPerWallet = (state: StoreState): number | null => state.blockchain.maxMintPerWallet
export const getMaxMint= (state: StoreState): number | null => state.blockchain.maxMint
export const getKongtamaBalance = (state: StoreState): number | null => state.blockchain.kongtamaBalance