// 0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC

import { ethers, getNamedAccounts, upgrades } from "hardhat";
import { HeroBoxUUPS, HeroBoxUUPS__factory } from "../../typechain";

async function testHeroBoxUUPS() {
    
    // const factory  = await ethers.getContractFactory<HeroBoxUUPS__factory>("HeroBoxUUPS");
    // const contract = await upgrades.deployProxy(factory);
    const contract = await ethers.getContractAt<HeroBoxUUPS>("HeroBoxUUPS", "0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC");
    const result = await contract.currToken();
    console.log("result = ", result);
    

}

async function mintMulti() {
    const { deployer, user1} = await getNamedAccounts();
    const contract = await ethers.getContractAt<HeroBoxUUPS>("HeroBoxUUPS", "0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC");
    const result = await contract.mintMulti(3).then(tx => tx.wait());
    console.log("result1 = ", result);
    
}

async function balanceOf() {
    
    const { deployer, user1} = await getNamedAccounts();
    const contract = await ethers.getContractAt<HeroBoxUUPS>("HeroBoxUUPS", "0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC");
    const balance =  (await contract.balanceOf(deployer)).toNumber();
    console.log(balance);
    for (let index = 0; index < balance; index++) {
      const tokenId =  await contract.tokenOfOwnerByIndex(deployer, index);
      console.log("tokenId = ", tokenId);
      
    }
}



async function main() {
    
    await mintMulti();
    await balanceOf();
}


main().catch((error) => {
    console.log(error);
    process.exit(1);
})