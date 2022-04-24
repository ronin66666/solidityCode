
## 启动本地网络
`npx hardhat node --network hardhat --no-deploy`

## 可升级合约

### 可升级智能合约

`openzeppelin`可升级合约和部署文档：[openzeppelin/upgrades](https://docs.openzeppelin.com/upgrades)

### proxy

[EIP1967](https://eips.ethereum.org/EIPS/eip-1967) 

`openzeppelin`官方文档：https://docs.openzeppelin.com/contracts/4.x/api/proxy

合约升级后，代理合约地址不变，只变更合约地址

数据储存在代理合约中，即使合约升级后，代理合约中也储存者原来的数据

## 部署

### hardhat 

[hardhat部署插件](https://github.com/wighawag/hardhat-deploy)

### openzeppelin-upgrades plugin

`openzeppelin`部署可升级合约插件 https://github.com/OpenZeppelin/openzeppelin-upgrades

```bash
npm install --save-dev @openzeppelin/hardhat-upgrades
```

然后再`hardhat.config.ts`中导入`import "@openzeppelin/hardhat-upgrades";`


使用`hardhat-deploy`部署可升级合约

https://github.com/wighawag/hardhat-deploy#deploying-and-upgrading-proxies

`hardhat-deploy`暂时不支持`UUPSUpgradeable`类型的部署

## BeaconProxy

由 Dharma 推广，允许在单个事务中将多个代理升级到不同的实现。


## other

[UUPSUpgradeable 漏洞分析](https://zhuanlan.zhihu.com/p/442101169)

EIP1967, EIP1822， eip-2535

[openzeppelin 在线合约代码生成](https://docs.openzeppelin.com/contracts/4.x/wizard)









