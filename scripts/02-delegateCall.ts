import { deployments, ethers } from "hardhat";
import { A, B } from "../typechain";

async function main() {

    const bAddr = (await deployments.get("B")).address;
    console.log("baddr = ", bAddr);
    
    const contract = await ethers.getContract<A>("A");
    const result = await contract.setVars(bAddr, 10, {value: ethers.utils.parseEther("1")}).then(tx => tx.wait());
    console.log(result);
    
    const BContract = await ethers.getContract<B>("B");
    const bValue  = await BContract.value();
    const bSender  = await BContract.sender();
    const bNum  = await BContract.num();
    console.log("b value = ", bValue, " bSender = ", bSender, " bNum = ", bNum.toNumber());


    const aValue = await contract.value();
    const aSender  = await contract.sender();
    const aNum  = await contract.num();
    console.log("a value = ", aValue, " aSender = ", aSender, " aNum = ", aNum.toNumber());
     
    /**
     * b value =  BigNumber { _hex: '0x00', _isBigNumber: true }  bSender =  0x0000000000000000000000000000000000000000  bNum =  0
a value =  BigNumber { _hex: '0x0de0b6b3a7640000', _isBigNumber: true }  aSender =  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266  aNum =  10
     */

    // 目标合约的值并未有发生改变，而调用者的值发生改变了
    // 说明使用delegatecall调用，不改变作用域，相当于在A合约的函数作用域中执行，改变的是A合约的储存状态
    // proxy代理合约就是根据这个特点来的
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})