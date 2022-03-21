import { Web3State } from "src/types/blockchain";
import { StoreState } from "../../types/store";

export const getWeb3State = (state: StoreState): Web3State => state.blockchain.web3State;
export const getNetworkId = (state:StoreState): number => state.blockchain.networkID;
export const getEthAccount = (state:StoreState): string => state.blockchain.ethAccount;
export const getWeb3ErrorMessage = (state: StoreState): string => state.blockchain.message;
