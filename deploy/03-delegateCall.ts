import { deployments, getNamedAccounts } from "hardhat";


export default async function delegateCall() {
    
    const { deployer } = await getNamedAccounts();
    const result = await deployments.deploy("A", {
        from: deployer,
        log: true,
    });
    console.log("A address = ", result.address);
    

    const result1 = await deployments.deploy("B", {
        from: deployer,
        log: true,
    });
    console.log("B address = ", result1.address);
}

delegateCall.tags = ["delegateCall"];