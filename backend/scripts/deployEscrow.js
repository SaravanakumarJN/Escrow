const hre = require("hardhat");

async function main() {
  const [lawyer, payer, payee] = await hre.ethers.getSigners()
  const amount = 100000000
  
  const Escrow = await hre.ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(payer.address, payee.address, amount)
  await escrow.deployed()

  console.log(escrow.address)

  // payer adding fund to contract
  await escrow.connect(payer).deposit({value: amount})

  const contractBalanceAfterDeposit = await escrow.getContractBalance()
  console.log(contractBalanceAfterDeposit)

  // payee submitting work
  await escrow.connect(payee).submitWork()
  const payeeBalanceBefore = await hre.ethers.provider.getBalance(payee.address)

  // lawyer releasing fund 
  await escrow.releaseFunds()

  const payeeBalanceAfter = await hre.ethers.provider.getBalance(payee.address)
  console.log(payeeBalanceBefore, payeeBalanceAfter)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
