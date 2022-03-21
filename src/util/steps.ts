import { Step, StepKind } from "../types/steps-modal";

export const getStepTitle = (step: Step): string => {
    switch (step.kind) {
        case StepKind.MintWithSolution:
            return 'Claim NFT';
        case StepKind.AnotherCall:
            return "Another Call"
        default:
            const _exhaustiveCheck: StepKind = step;
            return _exhaustiveCheck;
    }
};

export const makeGetProgress = (beginning: number, estimatedTxTimeMs: number) => (now: number) => {
    const elapsedMs = now - beginning;

    const progress = Math.round((elapsedMs / estimatedTxTimeMs) * 100);

    return Math.max(0, Math.min(progress, 95));
};
