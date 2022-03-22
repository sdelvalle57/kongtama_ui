const path = require('path')

module.exports = {
    env: {
      NETWORK_ID: 4,
      ETH_SCAN: "https://rinkeby.etherscan.io",
      ETH_GAS_STATION_API_KEY: "804c59ff78459c8ef9e31b4d2796c1ab0a98fa269038baea667045702805",
      KONGTAMA: "0x87DF0b49574D06cdB1be497babEd0Cda2273A686",
      PINATA: "https://ipfs.io/ipfs/QmX7HPbhMSqyMxpr4rKagR7PGPYER9UAcbwG2GR4GpKtn6",
      OPENSEA_ASSETS: "https://testnets.opensea.io/assets/0x87df0b49574d06cdb1be497babed0cda2273a686"
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
  }