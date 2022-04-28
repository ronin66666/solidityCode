import { deployments, getNamedAccounts } from "hardhat";
import { AssemeblyAdd } from "../typechain";

export default async function assemeblyAdd() {
    const { deployer } = await getNamedAccounts();
    const result = await deployments.deploy("AssemeblyAdd", {
        from: deployer,
        log: true
    })
    console.log("result address = ", result.address);
}   

assemeblyAdd.tags = ["assemeblyAdd"];