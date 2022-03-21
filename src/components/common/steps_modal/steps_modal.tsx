import React from 'react';
import { connect } from 'react-redux';
import Modal, { Styles } from 'react-modal';

import { Step, StepKind } from '../../../types/steps-modal';
import { getStepTitle } from '../../../util/steps';
import { StepItem } from './steps_progress';
import { CloseModalButton } from '../icons/close_modal_button';
import { ModalContent } from './steps_common';
import { StoreState } from '../../../types/store';
import { getStepsModalCurrentStep, getStepsModalDoneSteps, getStepsModalPendingSteps } from '../../../store/ui/selectors'
import { stepsModalReset } from '../../../store/actions';
import {  StepMintWithSolutionContainer } from './step_mint_with_solution';
import { getWeb3Provider } from 'src/store/blockchain/selectors';
import { ethers } from 'ethers';

const modalThemeStyle = {
    content: {
        backgroundColor: '#fff',
        borderColor: '#dedede',
        bottom: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '0',
        left: 'auto',
        maxHeight: '90%',
        minWidth: '350px',
        overflow: 'hidden',
        padding: '16px',
        position: 'relative',
        right: 'auto',
        top: 'auto',
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '12345',
    },
};

interface StateProps {
    currentStep: Step | null;
    doneSteps: Step[];
    pendingSteps: Step[];
    provider: ethers.providers.Web3Provider
}

interface DispatchProps {
    reset: () => void;
}

type Props = StateProps & DispatchProps;

class StepsModal extends React.Component<Props> {
    public render = () => {
        const { currentStep, doneSteps, pendingSteps, reset, provider } = this.props;
        const isOpen = currentStep !== null;

        const buildStepsProgress = (currentStepItem: StepItem): StepItem[] => [
            ...doneSteps.map(doneStep => ({
                title: getStepTitle(doneStep),
                progress: 100,
                active: false,
                isLong: false,
            })),
            currentStepItem,
            ...pendingSteps.map(pendingStep => ({
                title: getStepTitle(pendingStep),
                progress: 0,
                active: false,
                isLong: false,
            })),
        ];


        // this is used to avoid an issue with two consecutive steps of the same kind
        const stepIndex = doneSteps.length;



        return (
            <Modal ariaHideApp={false} isOpen={isOpen} style={modalThemeStyle as Styles}>   
                <CloseModalButton onClick={reset} />
                    <ModalContent >
                        {currentStep && currentStep.kind === StepKind.MintWithSolution && (
                            <StepMintWithSolutionContainer provider={provider} key={stepIndex} buildStepsProgress={buildStepsProgress} />
                        )}
                    </ModalContent>
            </Modal>
        );
    };
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        currentStep: getStepsModalCurrentStep(state),
        doneSteps: getStepsModalDoneSteps(state),
        pendingSteps: getStepsModalPendingSteps(state),
        provider: getWeb3Provider(state)
    };
};

const StepsModalContainer = connect(mapStateToProps, { reset: stepsModalReset })(StepsModal)


export { StepsModal, StepsModalContainer };
