import { ethers, getNamedAccounts } from "hardhat";
import { HeroBoxV2 } from "../typechain";

async function mintMulti(num: number) {
    
    const contract = await ethers.getContract<HeroBoxV2>("HeroBox");
    const reuslt = await contract.mintMulti(num).then(tx => tx.wait());
    console.log("result = ", reuslt);
    
}

async function balanceOf(who: string) {
    
    const contract = await ethers.getContract<HeroBoxV2>("HeroBox");
    const balance = await contract.balanceOf(who);
    console.log("balance = ", balance.toNumber());
    
}

async function open(tokenId: number) {
    
  const contract = await ethers.getContract<HeroBoxV2>("HeroBox");
  const reuslt = await contract.open(tokenId).then(tx => tx.wait());
  console.log("result = ", reuslt);
  
}

async function main() {
    const { deployer } = await getNamedAccounts();
    // await mintMulti(2);

    await balanceOf(deployer);

    await open(1);

}
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  