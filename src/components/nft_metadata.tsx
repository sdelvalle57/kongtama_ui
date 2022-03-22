import { Alert, Button, Card } from 'react-bootstrap'
import { PINATA } from 'src/common/constants'
import { NftMetadata } from 'src/types/blockchain'
import { getImageURI, getURLFromURI } from 'src/util/pinata'

interface Props {
  tokenId: number
  nftMetadata: NftMetadata
  nftMetadataError: boolean
  metadataURI: string,
  price: string,
  onMint: () => void
}

export const KongtamaMetadata: React.FC<Props> = ({
  tokenId,
  nftMetadata,
  nftMetadataError,
  metadataURI,
  price,
  onMint
}) => {
  if (nftMetadataError) {
    const url = getURLFromURI(metadataURI)
    return (
      <Alert className="not-admin" variant="danger">
        <Alert.Heading>Token #{tokenId}</Alert.Heading>
        <p>
          Ooops!! There was an error fetching the NFT metadata, please check it
          exists and try again!
        </p>
        <a href={url} target="_blank">
          {url}
        </a>
      </Alert>
    )
  }
  if (!nftMetadata) return null
  const data = nftMetadata as NftMetadata
  const src = `${data.image}`
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{data.name}</Card.Title>
      <Card.Subtitle>Token #{tokenId}</Card.Subtitle>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Text>{data.description}</Card.Text>
        <Card.Text>{`Price: ${price} ETH`}</Card.Text>
        <Button onClick={onMint}>Mint</Button>
      </Card.Body>
    </Card>
  )
}
