import { deployments, ethers, getNamedAccounts, network } from "hardhat";


export default async function heroBoxV1() {
    
    const { deployer } = await getNamedAccounts();
    const { deploy, catchUnknownSigner } = deployments;
    const result = await catchUnknownSigner(
        deploy("HeroBoxV1",{
            from: deployer,
            proxy: {
                owner: deployer,
                proxyContract: "OpenZeppelinTransparentProxy"
            },
        })
    )
    // const heroBox = await ethers.getContract<>

    console.log("heroBoxV1 =  ", result);
    
}

heroBoxV1.tags = ["heroBoxV1"];
