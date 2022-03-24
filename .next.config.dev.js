const path = require('path')

module.exports = {
    env: {
      NETWORK_ID: 4,
      ETH_SCAN: "https://rinkeby.etherscan.io",
      ETH_GAS_STATION_API_KEY: "804c59ff78459c8ef9e31b4d2796c1ab0a98fa269038baea667045702805",
      KONGTAMA: "0x4470C02f552b9Ecd52516f5967add5F68E6f80Bf",
      PINATA: "https://ipfs.io/ipfs/QmX7HPbhMSqyMxpr4rKagR7PGPYER9UAcbwG2GR4GpKtn6",
      OPENSEA: "https://testnets.opensea.io",
      INFURA_API_KEY: '8dc510ecf2ce4d368d64e6d77bed3280',
      INFURA_PROVIDER_URL: `https://rinkeby.infura.io/v3`,
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
  }