import { deployments, ethers, getNamedAccounts, upgrades } from "hardhat";
import heroBoxV1 from "../deploy/01-heroBoxV1";
import { HeroBoxV1, HeroBoxV1__factory } from "../typechain";

// 使用hardhat-deploy + hardhat-upgrade 部署后，调用方法直接使用合约名就可以


async function init() {
  const { user1 } = await getNamedAccounts();
  const token =  (await deployments.get("MGFToken")).address;
  const heroBoxV1 = await ethers.getContract<HeroBoxV1>("HeroBoxV1");
  console.log("heroBoxV1 address ", heroBoxV1.address);
  
  const result = await heroBoxV1.initialize(token, ethers.utils.parseEther("1"), user1).then(tx => tx.wait());
  console.log(result);
}

async function getCurrToken() {
    const heroBoxV1 = await ethers.getContract<HeroBoxV1>("HeroBoxV1");
    console.log("heroBoxV1 address ", heroBoxV1.address);
    
    const currToken = await heroBoxV1.currToken();
    console.log(currToken);
}

async function getReciveAccount() {
  const heroBoxV1 = await ethers.getContract<HeroBoxV1>("HeroBoxV1");
  const receiveAddr = await heroBoxV1.tokenReceiveAddress();
  console.log(receiveAddr);
}

async function mintMulti() {
    const heroBoxV1 = await ethers.getContract<HeroBoxV1>("HeroBoxV1");
    const result = await heroBoxV1.mintMulti(3).then(tx => tx.wait());
    console.log("result = ", result);
    
}

async function main() {
    await init();
    await getReciveAccount()
}
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });