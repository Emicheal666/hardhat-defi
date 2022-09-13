const { getNamedAccounts, ethers } = require("hardhat");

const AMOUNT = ethers.utils.parseEther("0.01");

async function getWeth() {
  const { deployer } = await getNamedAccounts(); //getting an account
  //to call the deposit function on the weth contrac
  // we need the abi and the address to be able to interact with the contract
  // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  const iweth = await ethers.getContractAt(
    "IWeth",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    deployer
  );

  const tx = await iweth.deposit({ value: AMOUNT });
  await tx.wait(1);
  const iwethBalance = await iweth.balanceOf(deployer);
  console.log(`you have ${iwethBalance.toString()} weth`);
}

module.exports = { getWeth, AMOUNT };
