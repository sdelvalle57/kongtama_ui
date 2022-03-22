import React from 'react';
import { connect } from 'react-redux';

import { getStepsModalCurrentStep } from '../../../store/ui/selectors';
import { StepMintWithValue } from '../../../types/steps-modal';
import { StoreState } from '../../../types/store';
import { BaseStepModal } from './base_step_modal';
import { StepItem } from './steps_progress';
import { getEstimatedTxTimeMs } from '../../../store/blockchain/selectors'
import { STEP_MODAL_DONE_STATUS_VISIBILITY_TIME } from '../../../common/constants'
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { sleep } from 'src/util/common';
import { fetchWalletData, mintWithValue } from 'src/store/actions';

interface ReceivedProps {
    buildStepsProgress: (currentStepItem: StepItem) => StepItem[];
    provider: ethers.providers.Web3Provider
}

interface StateProps {
    estimatedTxTimeMs: number;
    step: StepMintWithValue;
}

interface DispatchProps {
    onSubmit: (address: string, value: BigNumber) => Promise<ContractTransaction>,
    fetchWalletData: () => Promise<void>
}

type Props = ReceivedProps & StateProps & DispatchProps;

class MintWithValue extends React.Component<Props> {
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
                runAction={this._mint}
                showPartialProgress={true}
            />
        );
    };

    private readonly _mint = async ({ onLoading, onDone, onError }: any) => {
        const { 
            step: { value, address, onDoneCallback }, 
            onSubmit, 
            fetchWalletData,
            provider
        } = this.props;

        try {
            const contractTransaction = await onSubmit(address, value);
            onLoading();
            const contractReceipt = await contractTransaction.wait()

            await provider.waitForTransaction(contractReceipt.transactionHash);
            await sleep(STEP_MODAL_DONE_STATUS_VISIBILITY_TIME);
            

            onDone();
            onDoneCallback(contractReceipt);
            fetchWalletData()

        } catch (err) {
            onError(err);
            fetchWalletData()
        }
    };
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        estimatedTxTimeMs: getEstimatedTxTimeMs(state),
        step: getStepsModalCurrentStep(state) as StepMintWithValue,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (address: string, value: BigNumber) => dispatch(mintWithValue(address, value)),
        fetchWalletData: () =>  dispatch(fetchWalletData())

    }
}

const StepMintWithValueContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MintWithValue);

export { StepMintWithValueContainer };
