import { BigNumber, ContractReceipt, utils } from 'ethers';
import React, { PureComponent } from 'react'
import { Alert, Button, Col, Container, FormControl, Image, InputGroup, Row } from "react-bootstrap"
import { connect } from 'react-redux';
import { ETH_SCAN, KONGTAMA, OPENSEA } from 'src/common/constants';
import { WalletConnectButtonContainer } from 'src/components/wallet_connect_button';
import { startMintWithValueStep } from 'src/store/actions';
import { getEthAccount, getPrice, getWeb3State } from 'src/store/blockchain/selectors';
import { Web3State } from 'src/types/blockchain';
import { StoreState } from 'src/types/store';

interface OwnProps {
    amount: number, 
    amountError: boolean,
    receipt: ContractReceipt | null,
}

interface StateProps {
    web3State: Web3State,
    price: string | null,
    ethAccount: string
}

interface DispatchProps {
    startMintStep: (
        address: string, 
        amount: number,
        value: BigNumber,
        callback: (receipt: ContractReceipt) => void
    ) => Promise<void>
}

type Props = StateProps & DispatchProps

class Index extends PureComponent<Props, OwnProps> {

    state = {
        amount: 0,
        amountError: false,
        receipt: null,
    }

    onMint = () => {
        this.setState({receipt: null})
        const { amount } = this.state
        if(amount === 0) return this.setState({amountError: true})

        this.props.startMintStep(
            KONGTAMA, 
            amount, 
            utils.parseEther(this.props.price).mul(BigNumber.from(amount)), 
            this.onMinted
        )
    }

    onMinted = (receipt: ContractReceipt) => {  
        this.setState({receipt})
    }

    renderMinted = () => {
        return (
            <>
                Congrats on minting your KONGTAMA NFT!

                Click <a target="_blank" href={`${OPENSEA}/${this.props.ethAccount}`}>here</a> to view and sell your NFT at Opensea:
                <Button onClick={()=> this.setState({receipt: null})} variant="outline-secondary">Back</Button>
            </>
        )
        
        
      }

      renderContent = () => {
        const { receipt } = this.state
        return (
            <Row className="content">
                <Col className="gif-content">
                    <Image src="/static/img/Kongtama.gif" />

                </Col>
                <Col className="mint-content">
                    {receipt? this.renderMinted() : this.renderMintSite()}
                </Col>
            </Row>
        )
        
      }

      renderMintSite = () => {
          return (
              <>
                <h4>Welcome to KONGTAMA</h4>
                <p>
                    KOKTAMA IS A COLLECTIONOF 1,000 UNIQUE WELL DESIGNED KONGS UNITED TOGETHER ON THE ETHEREUM BLOCKCHAIN.
                </p>
                <p>
                    EACH NFT IS UNIQUE AND EXCLUSIVE BASED ON DIFFERENT FACIAL EXPRESSIONS AND BACKGROUNDS AND CLOTHING.
                </p>
                {this.renderForm()}
              </>
          )
      }



      renderForm = () => {
          return (
            <div>
                <InputGroup className="mb-4 xy">
                    <InputGroup.Text>Amount</InputGroup.Text>
                    <FormControl
                        value={this.state.amount}
                        type="number"
                        onChange={({ target }) =>
                            this.setState({ amount: parseInt(target.value), amountError: false })
                        }
                        placeholder="Amount"
                        isInvalid={this.state.amountError}
                        aria-label="Amount  "
                        aria-describedby="basic-addon2" />
                </InputGroup>
                <Button
                    onClick={this.onMint}
                    variant="outline-secondary" >
                    Mint
                </Button>
            </div>
          )
      }

    

    render() {
        return (
            <Container className="root_container">
                <WalletConnectButtonContainer />
                {this.renderContent()}
            </Container>
        );
    }
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        web3State: getWeb3State(state),
        price: getPrice(state),
        ethAccount: getEthAccount(state)
    }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        startMintStep: (
            address: string, 
            amount: number,
            value: BigNumber,
            callback: (receipt: ContractReceipt) => void
        ) => dispatch(startMintWithValueStep(address, amount, value, callback))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Index)