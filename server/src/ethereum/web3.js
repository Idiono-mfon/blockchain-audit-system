import Web3 from 'web3';
// import dotenv from 'dotenv';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import HDWalletProvider from '@truffle/hdwallet-provider';

// eslint-disable-next-line import/extensions
import { MNEMONIC, INFURA_API } from './secret.js';

// const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_API));

// eslint-disable-next-line no-underscore-dangle
// const __dirname = dirname(fileURLToPath(import.meta.url));

// dotenv.config({ path: `${__dirname}/.env` });

// // console.log(process.env.MNEMONIC);
// process.env.MNEMONIC

// process.env.INFURA_API

const wsProvider = new Web3.providers.WebsocketProvider(INFURA_API);
HDWalletProvider.prototype.on = wsProvider.on.bind(wsProvider);
const provider = new HDWalletProvider(MNEMONIC, wsProvider);

// const web3 = new Web3(provider)

// const provider = new HDWalletProvider({
//   mnemonic: { phrase: MNEMONIC },
//   providerOrUrl: INFURA_API,
// });

// export default web3;

export default new Web3(provider);

// Provider used by Web3.js to connect with the private Blockchain process
// export default new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
