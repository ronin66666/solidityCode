import { deployments, getNamedAccounts } from "hardhat";


export default async function caller() {
    
    const { deployer } = await getNamedAccounts();
    const result = await deployments.deploy("Caller", {
        from: deployer,
        log: true,
    });
    console.log("receiver address = ", result.address);
    
}

caller.tags = ["caller"];