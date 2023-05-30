async function main() {
  const NFT = await ethers.getContractFactory("NFT");

  // Start deployment, returning a promise that resolves to a contract object
  const nft = await NFT.deploy();
  await nft.deployed(); // Ensure the contract deployment is confirmed

  console.log("Contract deployed to address:", nft.address); // Display the contract address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //0x7896b40C5269051f82358C38720eBF8439e32a65