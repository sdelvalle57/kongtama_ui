import { DEFAULT_ESTIMATED_TRANSACTION_TIME_MS, DEFAULT_GAS_PRICE } from 'src/common/constants';
import { getType } from 'typesafe-actions';

import { Blockchain, Web3State } from '../../types/blockchain'
import * as actions from '../actions';
import { RootAction } from '../reducers';

const initialBlockchainState: Blockchain = {
    ethAccount: "",
    ethBalance: "0",
    provider: null,
    web3State: Web3State.Loading,
    message: null, 
    networkID: 0,
    gasInfo: {
        gasPriceInWei: DEFAULT_GAS_PRICE.toString(),
        estimatedTimeMs: DEFAULT_ESTIMATED_TRANSACTION_TIME_MS,
    },
    kongtamaPrice: null,
    kongtamaBalance: null,
    maxMintPerWallet: null,
    maxMint: null,
    nextTokenId: null
};

export default function blockchain(state: Blockchain = initialBlockchainState, action: RootAction): Blockchain {
    switch (action.type) {
        case getType(actions.setProvider):
            return { ...state, provider: action.payload }
        case getType(actions.setWeb3State):
            return { ...state, web3State: action.payload.web3State, message: action.payload.message };
        case getType(actions.setNetworkID):
            return { ...state, networkID: action.payload}
        case getType(actions.initializeBlockchainData):
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
