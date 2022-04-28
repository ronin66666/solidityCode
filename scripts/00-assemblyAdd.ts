import { ethers } from "hardhat";
import { AssemeblyAdd } from "../typechain";

async function addAssemebly() {
    const contract = await ethers.getContract<AssemeblyAdd>("AssemeblyAdd");
    const value = await contract.addAssemebly(10, 30);
    console.log("assmeblyAdd value = ", value.toNumber());
    
}

async function addSolidity() {
    const contract = await ethers.getContract<AssemeblyAdd>("AssemeblyAdd");
    const value = await contract.addSolidity(10, 30);
    console.log("solidity value = ", value.toNumber());
}

async function main() {
    await addAssemebly(); //execution cost： 21915 gas 
    await addSolidity();  //execution cost： 22313 gas

    //在remix上调用可以看到 assemebly执行函数所需的gas更少
    

}

main().then((error) => {
    console.log(error);
    process.exit(1);
})