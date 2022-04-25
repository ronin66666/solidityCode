import { deployments, getNamedAccounts } from "hardhat";


export default async function reciver() {
    
    const { deployer } = await getNamedAccounts();
    const result = await deployments.deploy("Receiver", {
        from: deployer,
        log: true,
    });
    console.log("receiver address = ", result.address);
    
}

reciver.tags = ["reciver"];