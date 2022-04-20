// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, getNamedAccounts } from "hardhat";
import { HeroBoxV1, MGFToken } from "../typechain";

async function init() {
  const {deployer} = await getNamedAccounts();
  console.log(deployer);

  // We get the contract to deploy
  const token = await ethers.getContract<MGFToken>("MGFToken", deployer);
  const result = await token.mint(deployer, ethers.utils.parseEther("1000000000")).then(tx => tx.wait())

  console.log(result)
}

async function approve() {
  const {deployer, user1} = await getNamedAccounts();
  console.log(deployer);

  
  const heroBoxv1 = await ethers.getContract<HeroBoxV1>("HeroBoxV1", user1);

  // We get the contract to deploy
  const token = await ethers.getContract<MGFToken>("MGFToken", user1);
  const result = await token.approve(heroBoxv1.address, ethers.utils.parseEther("100000000000")).then(tx => tx.wait());

  console.log(result);
}

async function allowance() {
  const {deployer, game} = await getNamedAccounts();
  console.log(deployer);

  
  const heroBoxv1 = await ethers.getContract<HeroBoxV1>("HeroBoxV1", deployer);

  // We get the contract to deploy
  const token = await ethers.getContract<MGFToken>("MGFToken", game);

  let approveAmount = await token.allowance(game, heroBoxv1.address);
  let amount = ethers.utils.formatEther(approveAmount)
  console.log("amount = ", amount);
}

async function transfer(to: string) {
  const {deployer, game} = await getNamedAccounts();
  const token = await ethers.getContract<MGFToken>("MGFToken", deployer);
  const reuslt = await token.transferFrom(deployer, game, ethers.utils.parseEther("10000")).then(tx => tx.wait());
  console.log(reuslt);

}

async function main() {
  // await init()
  await approve();
  // await allowance();
  // await transfer("");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
