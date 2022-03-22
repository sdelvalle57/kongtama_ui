import { NftMetadata } from "src/types/blockchain"
import axios from "axios"

export const getPinataMetadata = async (
    tokenId: number,
    url: string
  ): Promise<NftMetadata> => {
      console.log(url)
    try {
      const request = await axios.get(`${url}/${tokenId}`)
      return request.data as NftMetadata
    } catch (e) {
        console.log(e)
      throw e
    }
  }