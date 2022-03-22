import { BigNumber, ethers, utils } from "ethers";
import { KONGTAMA, NETWORK_ID } from "src/common/constants";
import { getBalanceOf, getPrice, mint } from "src/services/kongtama.service";
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
  return (web3State: Web3State, message?: string) => resolve({ web3State, message });
});

export const initializeBlockchainData = createAction('blockchain/WALLET_DATA_set', resolve => {
  return (blockchainData: Partial<Blockchain>) => resolve(blockchainData);
});

export const initWeb3: ThunkCreator<Promise<any>> = () => {
  return async (dispatch, getState, { }) => {
    dispatch(setWeb3State(Web3State.Loading))
    if (!isMetamaskInstalled()) {
      return dispatch(
        setWeb3State(Web3State.NotInstalled, 'Web3 provider not installed')
      )
    }

    const provider = await initializeWeb3Wrapper()
    if (provider) {
      dispatch(setProvider(provider))
      const networkId = (await provider.getNetwork()).chainId
      dispatch(setNetworkID(networkId))

      if (networkId !== NETWORK_ID) {
        listenNetwork()
        return dispatch(
          setWeb3State(
            Web3State.Error,
            `Please select ${Network[NETWORK_ID]} network`
          )
        )
      } else {
        try {
          const signer = provider.getSigner()
          const address = await signer.getAddress()
          utils.getAddress(address)
          dispatch(initWallet())
        } catch (e) {
          dispatch(setWeb3State(Web3State.Network))
        }
      }
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

export const fetchWalletData: ThunkCreator<Promise<any>> = () => {
  return async (dispatch, getState) => {

    try {
      const provider = getState().blockchain.provider;
      const ethAccount = (await provider.getSigner().getAddress()).toLowerCase();
      const ethBalance = (await provider.getBalance(ethAccount)).toString();
      const kongtamaPrice = utils.formatEther(await getPrice(KONGTAMA, provider));
      const kongtamaBalance = (await getBalanceOf(KONGTAMA, ethAccount, provider)).toNumber();

      dispatch(
        initializeBlockchainData({
          ethAccount,
          web3State: Web3State.Done,
          ethBalance,
          kongtamaPrice,
          kongtamaBalance
        }),
      );
    } catch (error) {
      throw error
    }
  };
};

export const mintWithValue: ThunkCreator<Promise<any>> = (address: string, amount: number, value: BigNumber) => {
  return async (dispatch, getState) => {
    try {
      const provider = getState().blockchain.provider;
      return mint(address, amount, provider, value)
    } catch (e) {
      throw e
    }
  }
}