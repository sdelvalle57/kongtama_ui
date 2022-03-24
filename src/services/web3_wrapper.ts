import { ethers, Signer } from 'ethers';
import Web3 from 'web3';

export const isMetamaskInstalled = (): boolean => {
    const { ethereum, web3 } = window;
    return ethereum || web3;
};

export const initializeWeb3Wrapper = async (): Promise<ethers.providers.Web3Provider | null> => {
    const { ethereum, web3 } = window;

    if (ethereum) {
        return new ethers.providers.Web3Provider(ethereum);
    } else if (web3) {
        return  new ethers.providers.Web3Provider(web3.currentProvider);
    } else {
        return null;
    }
};


export const listenNetwork = (): any => {
    const { ethereum, location } = window;
    ethereum.on('networkChanged', async (network: number) => {
        location.reload();
    });
}

export const enableWeb3 = async (): Promise<boolean> => {
    const { ethereum, location } = window;
    try {

        await ethereum.request({ method: 'eth_requestAccounts' });

        // Subscriptions register
        ethereum.on('accountsChanged', async (accounts: []) => {
            location.reload();
        });

        ethereum.on('networkChanged', async (network: number) => {
            location.reload();
        });
        
        return true;
    } catch (error) {
        // The user denied account access
        return false;
    }
}

export const getExternalProvider = (): Signer => {
    const providerUrl = `${process.env.INFURA_PROVIDER_URL}/${process.env.INFURA_API_KEY}`
    const provider = new ethers.providers.JsonRpcProvider(providerUrl)
    const wallet = ethers.Wallet.createRandom()
    const signer = new ethers.VoidSigner(wallet.address, provider)
    return signer as ethers.Signer
  }