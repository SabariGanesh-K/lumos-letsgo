require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ftmtest: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
      chainId: 4002
    },
    polygontestmumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
      chainId: 80001
    },
  },
};
