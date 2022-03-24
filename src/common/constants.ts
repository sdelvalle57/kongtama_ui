import BigNumber from "bignumber.js";

export const GWEI_IN_WEI = new BigNumber(1000000000);
export const DEFAULT_GAS_PRICE = GWEI_IN_WEI.multipliedBy(6);

export const ONE_MINUTE_MS = 1000 * 60;
export const DEFAULT_ESTIMATED_TRANSACTION_TIME_MS = ONE_MINUTE_MS / 4;

export const NETWORK_ID = process.env.NETWORK_ID || 5;

export const STEP_MODAL_DONE_STATUS_VISIBILITY_TIME: number = 3500;

export const KONGTAMA = process.env.KONGTAMA || "0x4470C02f552b9Ecd52516f5967add5F68E6f80Bf"

export const PINATA = process.env.PINATA || "https://ipfs.io/ipfs/QmX7HPbhMSqyMxpr4rKagR7PGPYER9UAcbwG2GR4GpKtn6"

export const OPENSEA  = process.env.OPENSEA || "https://testnets.opensea.io"

export const ETH_SCAN = process.env.ETH_SCAN || "https://rinkeby.etherscan.io"

export const OPENSEA_COLLECTION = `${OPENSEA}/collection/kongtama`
