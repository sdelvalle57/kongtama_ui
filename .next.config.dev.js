const path = require('path')

module.exports = {
    env: {
      NETWORK_ID: 5,
      ETH_SCAN: "https://goerli.etherscan.io/",
      ETH_GAS_STATION_API_KEY: "804c59ff78459c8ef9e31b4d2796c1ab0a98fa269038baea667045702805"
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
  }