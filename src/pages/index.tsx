import { BigNumber, ContractReceipt, utils } from 'ethers';
import React, { PureComponent } from 'react'
import { Alert, Container } from "react-bootstrap"
import { connect } from 'react-redux';
import { ETH_SCAN, KONGTAMA, OPENSEA_ASSETS, PINATA } from 'src/common/constants';
import { KongtamaMetadata } from 'src/components/nft_metadata';
import { WalletConnectButtonContainer } from 'src/components/wallet_connect_button';
import { getPinataMetadata } from 'src/services/web.service';
import { startMintWithValueStep } from 'src/store/actions';
import { getNextTokenId, getPrice, getWeb3State } from 'src/store/blockchain/selectors';
import { NftMetadata, Web3State } from 'src/types/blockchain';
import { StoreState } from 'src/types/store';

interface OwnProps {
    receipt: ContractReceipt | null
    nftMetadata: NftMetadata | null
    nftMetadataError: boolean,
}

interface StateProps {
    web3State: Web3State,
    nextTokenId: number,
    price: string | null
}

interface DispatchProps {
    startMintStep: (
        address: string, 
        value: BigNumber,
        callback: (receipt: ContractReceipt) => void
    ) => Promise<void>
}

type Props = StateProps & DispatchProps

class Index extends PureComponent<Props, OwnProps> {

    state = {
        receipt: null,
        nftMetadata: null,
        nftMetadataError: false
    }

    componentDidMount(): void {
        const { nextTokenId } = this.props
        if (nextTokenId) this.fetchNftMetadata(nextTokenId)
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (
            !prevProps.nextTokenId &&
            this.props.nextTokenId &&
            !this.state.nftMetadataError
        ) {
            return this.fetchNftMetadata(this.props.nextTokenId)
        }

        if(this.state.receipt && prevProps.nextTokenId < this.props.nextTokenId) {
            this.fetchNftMetadata(this.props.nextTokenId)
        }
    }

    fetchNftMetadata = async (tokenId: number) => {
        try {
            const nftMetadata = await getPinataMetadata(tokenId, PINATA)
            this.setState({ nftMetadata, nftMetadataError: false })
        } catch (e) {
            this.setState({ nftMetadataError: true })
        }
    }

    onMint = () => {
        this.setState({receipt: null})
        this.props.startMintStep(KONGTAMA, utils.parseEther(this.props.price), this.onMinted)
    }

    onMinted = (receipt: ContractReceipt) => {
        this.setState({receipt})
    }

    renderEvent = () => {
        const { receipt } = this.state
        if (!receipt) return null

        const event = receipt.events.find(evt => evt.event === 'Transfer')
        if (!event) return null
        const { tokenId } = event.args
        const name = "Kongtama #"+tokenId.toString().padStart(4, '0');
        return (
          <div >
              <Alert>
                <Alert.Heading>{`${name} successfully mimnted` } </Alert.Heading>
                <a href={`${OPENSEA_ASSETS}/${KONGTAMA}/${tokenId}`} target="_blank">View it on Opensea</a>
                <p/>
                <a href={`${ETH_SCAN}/tx/${receipt.transactionHash}`}  target="_blank">View your transaction</a>
              </Alert>
            
          </div>
        )
      }


    renderMintContainer = () => {
        const { web3State, nextTokenId, price } = this.props;
        if (web3State !== Web3State.Done) return null;
        const { nftMetadata, nftMetadataError } = this.state
        return (
            <KongtamaMetadata 
                tokenId={nextTokenId}
                metadataURI={PINATA}
                nftMetadata={nftMetadata}
                nftMetadataError={nftMetadataError}
                price={price}
                onMint={this.onMint}
            />
        )

    }

    render() {
        return (
            <Container className="root_container">
                <WalletConnectButtonContainer />
                {this.renderMintContainer()}
                {this.renderEvent()}
            </Container>
        );
    }
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        web3State: getWeb3State(state),
        nextTokenId: getNextTokenId(state),
        price: getPrice(state)
    }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        startMintStep: (
            address: string, 
            value: BigNumber,
            callback: (receipt: ContractReceipt) => void
        ) => dispatch(startMintWithValueStep(address, value, callback))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Index)