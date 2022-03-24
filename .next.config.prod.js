const path = require('path')

module.exports = {
    env: {
      NETWORK_ID: 1,
      ETH_SCAN: "https://etherscan.io",
      ETH_GAS_STATION_API_KEY: "804c59ff78459c8ef9e31b4d2796c1ab0a98fa269038baea667045702805",
      KONGTAMA: "0xE0917bc9D801BAbB789F444995f7c87F8fb5FA3E",
      PINATA: "https://kongtama.mypinata.cloud/ipfs/QmQD7UhsSkf986aR4ie9SzmJpYNnE2tjJUReDaorR37WZJ",
      OPENSEA: "https://opensea.io",
      INFURA_API_KEY: '8dc510ecf2ce4d368d64e6d77bed3280',
      INFURA_PROVIDER_URL: `https://mainnet.infura.io/v3`,
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
  }