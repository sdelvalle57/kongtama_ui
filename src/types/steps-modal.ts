import { BigNumber, ContractReceipt } from "ethers"

export type Step = StepMintWithValue | StepAnotherCall

export enum StepKind {
    MintWithValue = 'MintWithValue',
    AnotherCall = "AnotherCall"
}

export interface StepMintWithValue {
    kind: StepKind.MintWithValue,
    address: string,
    value: BigNumber
    onDoneCallback: (receipt: ContractReceipt) => void
}

export interface StepAnotherCall {
    kind: StepKind.AnotherCall
}

export interface StepsModalState {
    readonly doneSteps: Step[],
    readonly currentStep: Step | null,
    readonly pendingSteps: Step[]
}