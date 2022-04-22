import { ethers, upgrades } from "hardhat";


export default async function heroBoxUUPS() {
    
    const HeroBoxUUPS = await ethers.getContractFactory("HeroBoxUUPS");
    await upgrades.deployProxy(HeroBoxUUPS, [], {kind: "uups"})
}