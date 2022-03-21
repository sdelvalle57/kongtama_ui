import { createAction } from 'typesafe-actions';
import { 
    Step, 
    StepKind,
    StepMintWithSolution, 
} from '../../types/steps-modal';
import { ThunkCreator } from '../../types/store';


export const setStepsModalPendingSteps = createAction('ui/steps_modal/PENDING_STEPS_set', resolve => {
    return (pendingSteps: Step[]) => resolve(pendingSteps);
});

export const setStepsModalDoneSteps = createAction('ui/steps_modal/DONE_STEPS_set', resolve => {
    return (doneSteps: Step[]) => resolve(doneSteps);
});

export const setStepsModalCurrentStep = createAction('ui/steps_modal/CURRENT_STEP_set', resolve => {
    return (currentStep: Step | null) => resolve(currentStep);
});

export const stepsModalAdvanceStep = createAction('ui/steps_modal/advance_step');

export const stepsModalReset = createAction('ui/steps_modal/reset');

export const startSubmitPuzzleSolutionStep: ThunkCreator = (
    solution: string, 
    callback?: any
) => {
    return async (dispatch, getState) => {

        const submitTx: StepMintWithSolution = {
            kind: StepKind.MintWithSolution,
            solution,
            onDoneCallback: callback
        };

        dispatch(setStepsModalCurrentStep(submitTx));
        dispatch(setStepsModalPendingSteps([]));
        dispatch(setStepsModalDoneSteps([]));
    }
}




