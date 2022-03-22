import { BigNumber, ContractTransaction, ethers } from "ethers";
import { KongtamaController } from "kongtama_core";

export const getURIOf = async (
    address: string,
    tokenId: number,
    web3: ethers.providers.Web3Provider
): Promise<string> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.uri(tokenId)
}

export const getNextTokenId = async (
    address: string,
    web3: ethers.providers.Web3Provider
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.nextTokenId()
}

export const getPrice = async (
    address: string,
    web3: ethers.providers.Web3Provider
): Promise<BigNumber> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.getPrice()
}

export const mint = async (
    address: string,
    to: string,
    web3: ethers.providers.Web3Provider,
    value?: BigNumber
): Promise<ContractTransaction> => {
    const erc721Controller = new KongtamaController(address, web3.getSigner());
    return erc721Controller.mint(to, value)
}