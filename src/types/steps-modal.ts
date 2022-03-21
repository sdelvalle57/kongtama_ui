
export type Step = StepMintWithSolution | StepAnotherCall

export enum StepKind {
    MintWithSolution = 'MintWithSolution',
    AnotherCall = "AnotherCall"
}

export interface StepMintWithSolution {
    kind: StepKind.MintWithSolution,
    solution: string
    onDoneCallback: (txHash: string) => void
}

export interface StepAnotherCall {
    kind: StepKind.AnotherCall
}

export interface StepsModalState {
    readonly doneSteps: Step[],
    readonly currentStep: Step | null,
    readonly pendingSteps: Step[]
}