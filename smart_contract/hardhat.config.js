//

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/jVPEZR5A1W7xC2IKz6FkkWI6LxmOfv4c",
      accounts: [
        "a04a2c96774b37052e313f4dec047c04b284ba2ff4cd9e04f81cc7b8e5850e3c",
      ],
    },
  },
};
