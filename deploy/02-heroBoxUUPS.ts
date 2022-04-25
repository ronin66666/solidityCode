import { deployments, ethers, getNamedAccounts } from "hardhat";


export default async function heroBoxUUPS() {
    
    const { deployer, user1 } = await getNamedAccounts();
    const { deploy, catchUnknownSigner } = deployments;

    const token =  (await deployments.get("MGFToken")).address;

    // const result1 = await deploy("HeroBoxUUPS", {
    //   contract: "HeroBoxUUPSV1",
    //     from: deployer,
    //     log: true,
    //     proxy: {//如果已部署过TransparentProxy， 下次就会走升级
    //         proxyContract: "ERC1967Proxy",
    //         proxyArgs: ['{implementation}', '{data}'],
    //         execute: {
    //             init: {
    //                 methodName: "initialize",
    //                 args: [token, ethers.utils.parseEther("1"), user1]
    //             }
    //         }
    //     }
    // })
    // console.log("heroBoxV1 =  ", result1.address);

    // //升级合约
    const result2 = await deploy("HeroBoxUUPS", {
      contract: "HeroBoxUUPSV2",
      from: user1,
        log: true,
        proxy: {//如果已部署过TransparentProxy， 下次就会走升级
            proxyContract: "ERC1967Proxy",
            proxyArgs: ['{implementation}', '{data}'],
        }
    })
    console.log("result2 = ", result2.address);


    
}

heroBoxUUPS.tags = ["heroBoxUUPS"];

/**
 * 
 * 
 export type ProxyOptions =
  | (ProxyOptionsBase & {
      methodName?: string; // method to be executed when the proxy is deployed for the first time or when the implementation is modified. Use the deployOptions args field for arguments
    })
  | (ProxyOptionsBase & {
      execute?:
        | {
            //首次部署代理或修改实现时要执行的方法。
            methodName: string; // method to be executed when the proxy is deployed for the first time or when the implementation is modified.
            args: any[];
          }
        | {
            init: {
             //部署代理时要执行的方法
              methodName: string; // method to be executed when the proxy is deployed
              args: any[];
            };
            //升级代理时要执行的方法（不是第一次部署）
            onUpgrade?: {
              methodName: string; // method to be executed when the proxy is upgraded (not first deployment)
              args: any[];
            };
          };
    });
 */