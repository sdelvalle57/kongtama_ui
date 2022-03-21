import { PureComponent } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initWallet } from 'src/store/actions';
import { getWeb3ErrorMessage, getWeb3State } from 'src/store/blockchain/selectors';
import { Web3State } from 'src/types/blockchain';
import { StoreState } from 'src/types/store';

interface StateProps {
    web3State: Web3State,
    web3Message: string
}

interface DispatchProps {
    initWallet: () => void
}

type Props = StateProps & DispatchProps

class WalletConnectButton extends PureComponent<Props> {

    connectWallet = () => {
        this.props.initWallet()
    }

    renderError = () => {
        return <div className="web3_error"><Alert variant='danger'>{this.props.web3Message}</Alert></div>

    }

    renderLocked = () => {
        const done = this.props.web3State === Web3State.Done ;
        const caption = done ? "Connected" : "Connect Wallet"
        return <div className='wallet_connect'><Button disabled={done} onClick={this.connectWallet}>{caption}</Button></div>
        
    }

    renderLoading = () => {
        return <div>Loading...</div>

    }

    render() {
        switch(this.props.web3State) {
            case Web3State.NotInstalled:
            case Web3State.Error:
                return this.renderError();
            case Web3State.Loading:
                return this.renderLoading();
            default: return this.renderLocked()
        }
    }
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        web3State: getWeb3State(state),
        web3Message: getWeb3ErrorMessage(state)
    }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        initWallet: () => dispatch(initWallet())
    }
}

const WalletConnectButtonContainer = connect(mapStateToProps, mapDispatchToProps)(WalletConnectButton);

export { WalletConnectButtonContainer }