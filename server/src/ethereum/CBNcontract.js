/* eslint-disable import/extensions */
import web3 from './web3.js';
// import web3 from "./web3";
import CBNcontractABI from './CBNcontractABI.js';

//  Contract Address of the contract in the blockchain
// ON prodution, move this to .env file
const contractAddress = '0x0df6163Cab156e4794F789d9675959c15D0E5569';

// Function to create and instance of the contract

// TODO: Latter, convert Here to HDwallet to communicate with Infura
export default function createContract() {
  return new web3.eth.Contract(CBNcontractABI, contractAddress);
}
