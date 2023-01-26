const { ethers, BigNumber } = require("ethers");
const { formatEther } = require("ethers/lib/utils");

const abiSource = require("./abi.json");

const INFURA_ID = "ca11249dabe247c1a6e0877c24376dda";
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${INFURA_ID}`
);

const senderAccount = "0x8b257EBe1bb097C63E3fbcb2e4354abaBf1A538A";
const receiverAccount = "0xE26b352D9cd1A7B4fAD8027278A5c64c94f3a729";
const senderPrivateKey =
  "38aff756cc06a19741074b9dec79424612d07ba6301c8218e9dc7bb40fa81a33"; // Private key of account 1

const requestedAmount = "500";

const wallet = new ethers.Wallet(senderPrivateKey, provider);

const TokenContract = new ethers.Contract(
  abiSource.token.address,
  abiSource.token.abi,
  provider
);

const PresaleContract = new ethers.Contract(
  abiSource.presale.address,
  abiSource.presale.abi,
  provider
);

const sendToken = async () => {
  const contractWithWallet = TokenContract.connect(wallet);

  const balance = await contractWithWallet.balanceOf(senderAccount);
  const tx = await contractWithWallet.transfer(
    receiverAccount,
    ethers.utils.parseUnits(requestedAmount)
  );
  await tx.wait();
  console.log(formatEther(balance.toString()));
};

const ClaimToken = async () => {
  console.log(`\nReading from ${abiSource.presale.address}\n`);
  const contractWithWallet = PresaleContract.connect(wallet);
  const tx = await contractWithWallet.claimToken(
    abiSource.token.address,
    ethers.utils.parseUnits("1000")
  );
  await tx.wait();
};

// sendToken();
// ClaimToken();
