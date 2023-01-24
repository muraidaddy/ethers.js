const ETHEREUM_NETWORK = "goerli";
const INFURA_API_KEY = "ca11249dabe247c1a6e0877c24376dda";
const SIGNER_PRIVATE_KEY =
  "38aff756cc06a19741074b9dec79424612d07ba6301c8218e9dc7bb40fa81a33";

const { ethers } = require("ethers");

async function main() {
  // Configuring the connection to an Ethereum node
  const network = ETHEREUM_NETWORK;
  const provider = new ethers.providers.InfuraProvider(network, INFURA_API_KEY);
  // Creating a signing account from a private key
  const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);

  // Creating and sending the transaction object
  const tx = await signer.sendTransaction({
    to: "0xE26b352D9cd1A7B4fAD8027278A5c64c94f3a729",
    value: ethers.utils.parseUnits("0.1", "ether"),
  });
  console.log("Mining transaction...");
  console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
  // Waiting for the transaction to be mined
  const receipt = await tx.wait();
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}
main();
