async function main() {
  const AutifyNFT = await ethers.getContractFactory("AutifyNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const autifyNFT = await AutifyNFT.deploy()
  await autifyNFT.deployed()
  console.log("Contract deployed to address:", autifyNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
