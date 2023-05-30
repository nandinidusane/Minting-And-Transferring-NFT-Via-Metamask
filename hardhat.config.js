require('@nomiclabs/hardhat-waffle');
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

module.exports = {
  solidity: '0.8.7',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/O2IsZfhi5Oom9CWRqSRe7skDPzblGZFy',
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
