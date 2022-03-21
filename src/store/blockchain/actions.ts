import { ethers } from "ethers";
import { NETWORK_ID } from "src/common/constants";
import { enableWeb3, initializeWeb3Wrapper, isMetamaskInstalled, listenNetwork } from "src/services/web3_wrapper";
import { Blockchain, Network, Web3State } from "src/types/blockchain";
import { readError } from "src/util/common";
import { createAction } from "typesafe-actions";

import { ThunkCreator } from "../../types/store";

export const setProvider = createAction('blockchain/PROVIDER_set', resolve => {
    return (provider: ethers.providers.Web3Provider) => resolve(provider);
});

export const setNetworkID = createAction('blockchain/NETWORK_ID_set', resolve => {
    return (networkID: number) => resolve(networkID);
});

export const setWeb3State = createAction('blockchain/WEB3_STATE_set', resolve => {
    return (web3State: Web3State, message?: string) => resolve({web3State, message});
});

export const initializeBlockchainData = createAction('blockchain/WALLET_DATA_set', resolve => {
    return (blockchainData: Partial<Blockchain>) => resolve(blockchainData);
});

export const initWeb3: ThunkCreator<Promise<any>> = () => {
    return async (dispatch, getState, {}) => {
        dispatch(setWeb3State(Web3State.Loading));
        if(!isMetamaskInstalled()) {
            return dispatch(setWeb3State(Web3State.NotInstalled, 'Web3 provider not installed'));
        }
        
        const web3Wrapper = await initializeWeb3Wrapper();
        if(web3Wrapper) {
            dispatch(setProvider(web3Wrapper))
            const networkId = (await web3Wrapper.getNetwork()).chainId
            dispatch(setNetworkID(networkId))
            
            if(networkId !== NETWORK_ID) {
                listenNetwork();
                return dispatch(setWeb3State(Web3State.Error, `Please select ${Network[NETWORK_ID]} network`));
            } else return dispatch(setWeb3State(Web3State.Network))
        } 
    }
}

export const initWallet: ThunkCreator<Promise<any>> = () => {
    return async (dispatch, getState) => {
        try {
            
            const enableMetamask = await enableWeb3();
            if (enableMetamask) {
                dispatch(fetchWalletData())
                
            } else {
                return dispatch(setWeb3State(Web3State.Locked, `Please enable Metamask`));
            }

        } catch (error) {
            dispatch(setWeb3State(Web3State.Error, readError(error)));
        }
    };
};

const fetchWalletData: ThunkCreator<Promise<any>> = () => {
    return async (dispatch, getState) => {
        
        try {
            const provider = getState().blockchain.provider;
            const ethAccount = (await provider.getSigner().getAddress()).toLowerCase();
            const ethBalance = (await provider.getBalance(ethAccount)).toString();
            console.log("ethBala", ethBalance)

            dispatch(
                initializeBlockchainData({
                    ethAccount,
                    web3State: Web3State.Done,
                    ethBalance
                }),
            );
        } catch (error) {
            throw error
        }
    };
};