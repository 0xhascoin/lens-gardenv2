const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('LGNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // let txn = await nftContract.mintDynamicNFT("https://lens-garden-api.hasanelmi.repl.co/api/address/0x913261b57E93F4Ca245f09006D56AA764D1a8C2e")
  // // Wait for it to be mined.
  // await txn.wait()
  // console.log("Minted Dynamic NFT.");

  // txn = await nftContract.mintDynamicNFT("https://lens-garden-api.hasanelmi.repl.co/api/address/0x913261b57E93F4Ca245f09006D56AA764D1a8C2e")
  // // Wait for it to be mined.
  // await txn.wait()
  // console.log("Minted Dynamic NFT.");

  txn = await nftContract.mintLevelNFT("https://lens-garden-api.hasanelmi.repl.co/api/nft/7", 7)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #7.");

  txn = await nftContract.mintLevelNFT("https://lens-garden-api.hasanelmi.repl.co/api/nft/7", 7)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #7.");

  txn = await nftContract.mintLevelNFT("https://lens-garden-api.hasanelmi.repl.co/api/nft/6", 6)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT # 6.");

  txn = await nftContract.mintLevelNFT("https://lens-garden-api.hasanelmi.repl.co/api/nft/6", 6)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT # 6.");

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();