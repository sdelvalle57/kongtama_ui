import React, {PureComponent} from 'react'
import { Container } from "react-bootstrap"
import { WalletConnectButtonContainer } from 'src/components/wallet_connect_button';


class Index extends PureComponent{

    render () {
        return (
            <Container className="root_container">
                <WalletConnectButtonContainer />
            </Container>
        );
    }
}





export default Index