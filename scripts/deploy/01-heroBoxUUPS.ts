import { deployments, ethers, getNamedAccounts, upgrades } from "hardhat";
import { HeroBoxUUPS__factory } from "../../typechain";
import { HeroBoxV2__factory } from "../../typechain/factories/HeroBoxV2__factory";
//v1: 0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC

//首次部署
async function heroBoxUUPS() {

    const { deployer, user1 } = await getNamedAccounts();

    const HeroBoxUUPS = await ethers.getContractFactory<HeroBoxUUPS__factory>("HeroBoxUUPS");

    const token = (await deployments.get("MGFToken")).address;

    const contract = await upgrades.deployProxy(HeroBoxUUPS, [token, ethers.utils.parseEther("1"), user1], {
        initializer: "initialize",
        // constructorArgs: [token, ethers.utils.parseEther("1"), user1],
        kind: "uups"
    });

    const result = await contract.deployed();
    console.log(result.address);
}

//升级
async function heroBoxUpgrade() {
    const { deployer, user1 } = await getNamedAccounts();

    const HeroBoxUUPSV2 = await ethers.getContractFactory("HeroBoxUUPSV2");

    //0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC v1 proxy 地址
    const contract = await upgrades.upgradeProxy("0x2C33568A931F41Bb0e749552D3476fBfB5DAfbaC", HeroBoxUUPSV2, {kind: "uups"});
    const result = await contract.deployed();

    console.log(result.address);

    const currentToken = await contract.currToken();
    console.log("currentToken = ", currentToken);
    
}

async function main() {
    await heroBoxUpgrade();
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})