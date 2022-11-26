// Deployed contract address : 0xb959FFf5A9a363Db3011F58F4e69B329cd862161
const hre = require("hardhat");

async function main() {
  const amount = 2000000000000000
  const payerAddress = "0xE84E1847EF3a662412885F2b65cc7c2f9d6b1322"
  const payeeAddress = "0x57a7134E58c279506282ab9211F6d9C14ab28AB1"
  
  const Escrow = await hre.ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(payerAddress, payeeAddress, amount)
  await escrow.deployed()

  console.log(escrow.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});