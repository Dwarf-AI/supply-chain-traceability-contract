const hre = require("hardhat");

async function main() {

  const AutifyNFT = await hre.ethers.getContractFactory("AutifyNFT");
  const autifyNFT = await AutifyNFT.deploy();

  await autifyNFT.deployed();

  console.log("Contract deployed to:", autifyNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });