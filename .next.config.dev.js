const path = require('path')

module.exports = {
    env: {
      NETWORK_ID: 4,
      ETH_SCAN: "https://rinkeby.etherscan.io",
      ETH_GAS_STATION_API_KEY: "804c59ff78459c8ef9e31b4d2796c1ab0a98fa269038baea667045702805",
      KONGTAMA: "0xED9D23Fd6ab143B26e4526C9A536E1120a2DCc63",
      PINATA: "https://ipfs.io/ipfs/QmX7HPbhMSqyMxpr4rKagR7PGPYER9UAcbwG2GR4GpKtn6",
      OPENSEA: "https://testnets.opensea.io"
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
  }