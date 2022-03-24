import React, { PureComponent } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NextRouter, withRouter } from 'next/router';

import { StoreState } from '../../../types/store';
import { Logo } from './logo';
import { getEthAccount, getNetworkId, getWeb3State } from 'src/store/blockchain/selectors';
import { Network, Web3State } from 'src/types/blockchain';
import { WalletConnectButtonContainer } from 'src/components/wallet_connect_button';
import { truncateAddress } from 'src/util/common';

interface StateProps {
    networkId: number,
    ethAccount: string,
    web3State: Web3State
}

interface OwnProps {
}

interface WithRouterProps {
    router: NextRouter
}

type Props = StateProps & WithRouterProps;

class ToolbarContent extends PureComponent<Props, OwnProps> {

    getContentFromWeb3State = () => {
        return <div className="wallet-dropdown separator">{truncateAddress(this.props.ethAccount)}</div>;
    };

    renderNetworkName = () => {
        const networkName = Network[this.props.networkId];
        return <div className="network-name">{networkName}</div>
    }

    renderNetworkData = () => {
        const { web3State } = this.props
        switch (web3State) {
            case Web3State.Done: 
                return (
                    <>
                        <Nav.Item>{this.renderNetworkName()}</Nav.Item>
                        <Nav.Item>{this.getContentFromWeb3State()}</Nav.Item>
                    </>
                ) 
            default:
                return (
                    <>
                        <WalletConnectButtonContainer />
                    </>
                )
        }
       
        
    }

    
    render() {
        const logo = <img className="logo-styled" src="/static/img/LOGO.png"  />;

        return (
            <Navbar bg='dark' expand="lg">
                <Container><Navbar.Brand><Logo image={logo}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav >
                        <Nav.Item>{this.renderNetworkData()}</Nav.Item>
                    </Nav>
                        
                </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
};


const mapStateToProps = (state: StoreState): StateProps => {
    return {
        networkId: getNetworkId(state),
        ethAccount: getEthAccount(state),
        web3State: getWeb3State(state)
    };  
}

const ToolbarContentContainer = connect(
    mapStateToProps,
)(withRouter(ToolbarContent))

export { ToolbarContentContainer };
