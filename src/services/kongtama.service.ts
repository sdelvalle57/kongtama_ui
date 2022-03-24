import { BigNumber, ContractTransaction, ethers, Signer } from "ethers";
import { KongtamaController } from "kongtama_core";

export const getURIOf = async (
    address: string,
    tokenId: number,
    web3: ethers.providers.Web3Provider
): Promise<string> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.uri(tokenId)
}


export const getPrice = async (
    address: string,
    web3: ethers.providers.Web3Provider
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.getPrice()
}

export const prefetchPrice = async (
    address: string,
    signer: Signer
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, signer);
    return erc721Controller.getPrice()
}

export const mint = async (
    address: string,
    amount: number,
    web3: ethers.providers.Web3Provider,
    value?: BigNumber
): Promise<ContractTransaction> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.mint(amount, value)
}

export const getBalanceOf = async (
    address: string,
    account: string,
    web3: ethers.providers.Web3Provider,
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.balanceOf(account)
}

export const getMaxMintPerWallet = async (
    address: string,
    web3: ethers.providers.Web3Provider,
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.getMaxMintperWallet()
}

export const getMaxMint= async (
    address: string,
    web3: ethers.providers.Web3Provider,
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.getMaxMint()
}

export const prefetchMaxMint= async (
    address: string,
    signer: Signer,
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, signer);
    return erc721Controller.getMaxMint()
}

export const getNextTokenId= async (
    address: string,
    web3: ethers.providers.Web3Provider,
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.nextTokenId()
}

export const prefetchNextTokenId= async (
    address: string,
    signer: Signer,
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, signer);
    return erc721Controller.nextTokenId()
}
