import { BigNumber, ContractReceipt, utils } from 'ethers';
import React, { PureComponent } from 'react'
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { connect } from 'react-redux';
import { ETH_SCAN, KONGTAMA, OPENSEA, OPENSEA_COLLECTION } from 'src/common/constants';
import { startMintWithValueStep } from 'src/store/actions';
import { getEthAccount, getKongtamaBalance, getMaxMint, getMaxMintPerWallet, getNextTokenId, getPrice, getWeb3State } from 'src/store/blockchain/selectors';
import { Web3State } from 'src/types/blockchain';
import { StoreState } from 'src/types/store';

interface OwnProps {
    amount: number, 
    receipt: ContractReceipt | null,
}

interface StateProps {
    web3State: Web3State,
    price: string | null,
    ethAccount: string,
    maxMintPerWallet: number | null;
    maxMint: number | null;
    kongtamaBalance: number | null;
    nextTokenId: number | null
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
        amount: 1,
        receipt: null
    }

    onMint = () => {
        this.setState({receipt: null})
        const { amount } = this.state
        if(amount === 0) return;

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
        const { receipt } = this.state
        return (
            <>
                <h1>Congrats on minting your KONGTAMA NFT!</h1>
                <p>
                    Click <a target="_blank" href={`${OPENSEA}/${this.props.ethAccount}`}>here</a> to view and sell your NFT at Opensea:
                </p>
                <p>
                    Click <a target="_blank" href={`${ETH_SCAN}/tx/${(receipt as ContractReceipt).transactionHash}`}>here</a> to view your transaction on Etherscan:
                </p>

                
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
                <h1>Welcome to KONGTAMA</h1>
                <p>
                    KONGTAMA IS A COLLECTION OF 1,000 UNIQUE WELL DESIGNED KONGS UNITED TOGETHER ON THE ETHEREUM BLOCKCHAIN.
                </p>
                <p>
                    EACH NFT IS UNIQUE AND EXCLUSIVE BASED ON DIFFERENT FACIAL EXPRESSIONS AND BACKGROUNDS AND CLOTHING.
                </p>
                {this.renderForm()}
              </>
          )
      }

      minus = () => {
        const { amount } = this.state
        if(amount > 1) this.setState({ amount: amount-1})
      } 

      plus = () => {
        const {maxMintPerWallet, kongtamaBalance, maxMint, nextTokenId } = this.props;
        const { amount} = this.state

        if(maxMintPerWallet >= (kongtamaBalance + amount + 1) && amount <= (maxMint - nextTokenId - 1)) this.setState({ amount: amount+1})

      }

      renderForm = () => {
          const { amount } = this.state
          const { price, web3State, maxMint, nextTokenId } = this.props
          if(web3State !== Web3State.Done) return null;
          return (
            <div>
                <div className="counter">
                    {amount}/{maxMint - nextTokenId - 1}  <small>({(Number(price)*amount).toFixed(2)} ETH/{amount} NFT)</small>
                </div>
                <div className='counter-manager'>
                    <Image className="image-button" onClick={this.plus} src="/static/img/plus-button.png" />
                    {amount}
                    <Image className="image-button" onClick={this.minus} src="/static/img/minus-button.png" />
                </div>
               
               <div className='image-button form-buttons'>
                   <Image className="image-button" src="/static/img/mint-button.png" onClick={this.onMint} />
                   <Image className="image-button" src="/static/img/opensea-button.png" onClick={() => window.open(OPENSEA_COLLECTION, '_blank')} />

               </div>
                
            </div>
          )
      }

    

    render() {
        return (
            <Container className="root_container">
                {this.renderContent()}
            </Container>
        );
    }
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        web3State: getWeb3State(state),
        price: getPrice(state),
        ethAccount: getEthAccount(state),
        maxMintPerWallet: getMaxMintPerWallet(state),
        maxMint: getMaxMint(state),
        kongtamaBalance: getKongtamaBalance(state),
        nextTokenId: getNextTokenId(state)
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