import { deployments, ethers } from "hardhat";
import { Caller } from "../typechain";


//1. 不带gas或value
async function call() {
    const receiverAddr = (await deployments.get("Receiver")).address;

    const contract = await ethers.getContract<Caller>("Caller");
    const result = await contract.testCallFoo(
        receiverAddr,
    ).then(tx => tx.wait());

    console.log(result);
}


//2. 带gas和value
async function callWithGasAndValue() {

    const receiverAddr = (await deployments.get("Receiver")).address;

    const contract = await ethers.getContract<Caller>("Caller");
    const result = await contract.testCallFooWithValueAndGas(
        receiverAddr,
        { value: ethers.utils.parseEther("2") } //发送value
    ).then(tx => tx.wait());

    console.log(result);

}

//3. 调用不存在的方法
async function testCallDoesNotExist() {
    const receiverAddr = (await deployments.get("Receiver")).address;

    const contract = await ethers.getContract<Caller>("Caller");
    const result = await contract.testCallDoesNotExist(
        receiverAddr
    ).then(tx => tx.wait());

    console.log(result);
}

async function main() {
    //await  call();
    // await callWithGasAndValue();

    //调用不存在的方法, 目标合约会执行fallback函数
    await testCallDoesNotExist();
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})