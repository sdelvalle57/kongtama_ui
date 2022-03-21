import React from 'react';
import { connect } from 'react-redux';

import { getStepsModalCurrentStep } from '../../../store/ui/selectors';
import { StepMintWithSolution } from '../../../types/steps-modal';
import { StoreState } from '../../../types/store';
import { BaseStepModal } from './base_step_modal';
import { StepItem } from './steps_progress';
import { getEstimatedTxTimeMs } from '../../../store/blockchain/selectors'
import { STEP_MODAL_DONE_STATUS_VISIBILITY_TIME } from '../../../common/constants'
import { ContractTransaction, ethers } from 'ethers';
import { sleep } from 'src/util/common';

interface ReceivedProps {
    buildStepsProgress: (currentStepItem: StepItem) => StepItem[];
    provider: ethers.providers.Web3Provider
}
interface StateProps {
    estimatedTxTimeMs: number;
    step: StepMintWithSolution;
}

interface DispatchProps {
    onSubmit: (solution: string) => Promise<ContractTransaction>,
}

type Props = ReceivedProps & StateProps & DispatchProps;

class MintWithSolution extends React.Component<Props> {
    public render = () => {
        const { buildStepsProgress, estimatedTxTimeMs, step } = this.props;

        const title = `Sign To Claim Your New NFT`;
        const confirmCaption = `Confirm on Metamask to Mint Token`;
        const loadingCaption = `Minting token`;
        const doneCaption = "Token minted";
        const errorCaption = `Failed to mint token`;
        const loadingFooterCaption = `Waiting for transaction... `;
        const doneFooterCaption = `Token minted`;

        return (
            <BaseStepModal
                step={step}
                title={title}
                confirmCaption={confirmCaption}
                loadingCaption={loadingCaption}
                doneCaption={doneCaption}
                errorCaption={errorCaption}
                loadingFooterCaption={loadingFooterCaption}
                doneFooterCaption={doneFooterCaption}
                buildStepsProgress={buildStepsProgress}
                estimatedTxTimeMs={estimatedTxTimeMs}
                runAction={this._addAssets}
                showPartialProgress={true}
            />
        );
    };

    private readonly _addAssets = async ({ onLoading, onDone, onError }: any) => {
        const { 
            step: { solution, onDoneCallback }, 
            onSubmit, 
            provider
        } = this.props;

        try {
            const contractTransaction = await onSubmit(solution);
            onLoading();
            const contractReceipt = await contractTransaction.wait()

            const receipt = await provider.waitForTransaction(contractReceipt.transactionHash);
            await sleep(STEP_MODAL_DONE_STATUS_VISIBILITY_TIME);
            

            onDone();
            onDoneCallback(receipt.transactionHash);

        } catch (err) {
            onError(err);
        }
    };
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        estimatedTxTimeMs: getEstimatedTxTimeMs(state),
        step: getStepsModalCurrentStep(state) as StepMintWithSolution,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        //TODO: distpatch to mint tokens
        onSubmit: (solution: string) => dispatch()

    }
}

const StepMintWithSolutionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MintWithSolution);

export { StepMintWithSolutionContainer };
