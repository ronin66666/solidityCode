import { getNamedAccounts, ethers, upgrades } from "hardhat";
import { HeroBoxUUPS, HeroBoxUUPSV2, HeroBoxV1 } from "../../typechain";
import { HeroBoxV2 } from "../../typechain/HeroBoxV2";

const prox = "0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC";


async function mintMulti() {
    const { deployer, user1} = await getNamedAccounts();
    const contract = await ethers.getContractAt<HeroBoxUUPSV2>("HeroBoxUUPSV2", prox);
    const result = await contract.mintMulti(3).then(tx => tx.wait());
    console.log("result1 = ", result);
}

async function balanceOf() {
    
    const { deployer, user1} = await getNamedAccounts();

    const contract = await ethers.getContractAt<HeroBoxUUPSV2>("HeroBoxUUPSV2", prox);
    const balance =  (await contract.balanceOf(deployer)).toNumber();

    console.log(balance);
    for (let index = 0; index < balance; index++) {
      const tokenId =  await contract.tokenOfOwnerByIndex(deployer, index);
      console.log("tokenId = ", tokenId.toNumber());
      
    }
}

async function upgradeTo(newAddress: string) {
 
    const contract = await ethers.getContractAt<HeroBoxUUPSV2>("HeroBoxUUPSV2", prox);
    const result = await contract.upgradeTo(newAddress).then(tx => tx.wait());
    console.log(result);
}

async function open() {
    const contract = await ethers.getContractAt<HeroBoxUUPSV2>("HeroBoxUUPSV2", prox);
    const result = await contract.open(3).then(tx => tx.wait());
    console.log(result);
}

async function getImpleAddress() {
    const implAddress = await upgrades.erc1967.getImplementationAddress(prox);
    console.log("implAddress = ", implAddress);


}

async function main() {
    
    // await mintMulti();
    // await balanceOf();
    // await open();
    //0x98Cf4E2DDb0f61Cb1bb1327e5Bd3678D5b83aD7F v1
    await getImpleAddress();
    // await upgradeTo("0x98Cf4E2DDb0f61Cb1bb1327e5Bd3678D5b83aD7F");
    // await getImpleAddress();
}


main().catch((error) => {
    console.log(error);
    process.exit(1);
})