import BigNumber from "bignumber.js";

export const GWEI_IN_WEI = new BigNumber(1000000000);
export const DEFAULT_GAS_PRICE = GWEI_IN_WEI.multipliedBy(6);

export const ONE_MINUTE_MS = 1000 * 60;
export const DEFAULT_ESTIMATED_TRANSACTION_TIME_MS = ONE_MINUTE_MS / 4;

export const NETWORK_ID = process.env.NETWORK_ID || 5;

export const STEP_MODAL_DONE_STATUS_VISIBILITY_TIME: number = 3500;
