import { ethers } from "ethers";

export enum Web3State {
    Done = 'Done',
    Error = 'Error',
    Network = 'Network',
    Loading = 'Loading',
    NotInstalled = 'NotInstalled',
    Locked = 'Locked',
}

export enum Network {
    Mainnet = 1,
    Rinkeby = 4,
    Goerli = 5,
    Kovan = 42,
    Ganache = 50,
    Matic = 137,
    Mumbai = 80001,
    STN = 18122
}

export interface GasInfo {
    gasPriceInWei: string;
    estimatedTimeMs: number;
}

export interface Blockchain {
    readonly provider: ethers.providers.Web3Provider,
    readonly ethAccount: string;
    readonly ethBalance: string;
    readonly web3State: Web3State;
    readonly message: string;
    readonly networkID: number;
    readonly gasInfo: GasInfo;
    readonly nextTokenId: number | null;
    readonly kongtamaPrice: string | null;
}

export interface NftMetadata {
    name: string
    description: string
    image: string
  }