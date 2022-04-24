import { deployments, getNamedAccounts } from "hardhat";

export default async function mgfToken() {
    const { deployer } = await getNamedAccounts();
    const deploy = deployments.deploy;

    const result = await deploy("MGFToken", {from: deployer, log: true});
    console.log("result  = ", result.address);
    
}

mgfToken.tags = ["MGFToken"];