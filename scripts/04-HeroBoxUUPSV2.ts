import { ethers, getNamedAccounts } from "hardhat"
import { HeroBoxUUPSV2 } from "../typechain";

async function mintMulti(num: number) {
    
  const contract = await ethers.getContract<HeroBoxUUPSV2>("HeroBoxUUPS");
  const reuslt = await contract.mintMulti(num).then(tx => tx.wait());
  console.log("result = ", reuslt);
  
}

async function balanceOf(who: string) {
  const contract = await ethers.getContract<HeroBoxUUPSV2>("HeroBoxUUPS");
  const balance =  (await contract.balanceOf(who)).toNumber();
  console.log("balance = ", balance);

  for (let index = 0; index < balance; index++) {
      const tokenId =  (await contract.tokenOfOwnerByIndex(who,index)).toNumber();
      console.log("tokenid = ", tokenId);
      
  }
}
async function setApprovalForAll() {
  const contract = await ethers.getContract<HeroBoxUUPSV2>("HeroBoxUUPS");
  const reuslt = await contract.setApprovalForAll(contract.address, true).then(tx => tx.wait());
  console.log("result = ", reuslt);
}
async function open(tokenId: number) {
    
  const contract = await ethers.getContract<HeroBoxUUPSV2>("HeroBoxUUPS");
  const reuslt = await contract.open(tokenId).then(tx => tx.wait());
  console.log("result = ", reuslt);
  
}
async function main() {
  const { deployer } = await getNamedAccounts();
  // await mintMulti(2);
  await balanceOf(deployer);
  await open(2);
}
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });