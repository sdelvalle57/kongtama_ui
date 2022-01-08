import React, { PureComponent } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NextRouter, withRouter } from 'next/router';

import { StoreState } from '../../../types/store';
import { Logo } from './logo';

interface StateProps {
}

interface OwnProps {
}

interface WithRouterProps {
    router: NextRouter
}

type Props = StateProps & WithRouterProps;

class ToolbarContent extends PureComponent<Props, OwnProps> {

    getContentFromWeb3State = (): React.ReactNode => {
        return <div className="wallet-dropdown separator">Web3 State Content</div>;
    };

    renderNetworkName = () => {
        return <div className="network-name">Network Name</div>
    }

    
    render() {
        const logo = <img className="logo-styled" src="/static/img/logo.svg"  />;

        return (
            <Navbar bg='light' expand="lg">
                <Navbar.Brand  >
                    <Logo
                        image={logo}
                        text={"Puzzle"}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                    
                        <Nav className="spacer"></Nav>
                        <Nav.Item>{this.renderNetworkName()}</Nav.Item>
                        <Nav.Item>{this.getContentFromWeb3State()}</Nav.Item>
                    </Nav>
                        
                </Navbar.Collapse>
            </Navbar>
        )
    }
};


const mapStateToProps = (state: StoreState): StateProps => {
    return {
        
    };
}

const ToolbarContentContainer = connect(
    mapStateToProps,
)(withRouter(ToolbarContent))

export { ToolbarContentContainer };
