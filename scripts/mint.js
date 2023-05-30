require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");  //abi
console.log(JSON.stringify(contract.abi));

const contractAddress = "0x7896b40C5269051f82358C38720eBF8439e32a65";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI)
{
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
  const tx =
  {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => //call-back function
    {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction,function (err, hash)
        {
          if (!err)
          {
            console.log(
              "Transaction Hash: ",
              hash,
              "\nCheck Alchemy's Mempool To Check Status Of Transaction!"
            );
          } else {
            console.log(
              "Problem In The Transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) =>
    {
      console.log(" Promise Error:", err);
    });
}
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmVHADKFkLNBwtdyiK79gYrgbTNPe3WYqg4pdE7CP5kU3W"

  //metadata file link on pinta
);
