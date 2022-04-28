
# 内联汇编

[Solidity 中编写内联汇编(assembly)的那些事[译]](https://learnblockchain.cn/article/675)

以太坊虚拟机EVM有自己的指令集，该指令集中目前包含了 144个操作码，详情参考[Geth代码](https://github.com/ethereum/go-ethereum/blob/15d09038a6b1d533bc78662f2f0b77ccf03aaab0/core/vm/opcodes.go#L223-L388)

## 为什么使用：

1. 可以使用操作码直接与EVM进行交互，需要对执行操作进行更精细控制

   执行某些仅靠solidity不可能实现的逻辑，例如：指向特定的内存插槽。

   - String Utils](https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol)by [Nick Johnson](https://github.com/Arachnid) (Ethereum Foundation开发)
   - Bytes Utils](https://github.com/GNSPS/solidity-bytes-utils/blob/master/contracts/BytesLib.sol) by [Gonçalo Sá](https://github.com/GNSPS) (Consensys开发)

2. 更少的gas消耗

   同样的功能用汇编做会更省gas

3. 增强功能

   有一些事情在EVM汇编中可以做，而没法在 Solidity 中实现。

   关于这一点 Nick Johnson 有[很好的解释](https://ethereum.stackexchange.com/questions/3157/what-are-some-examples-of-how-inline-assembly-benefits-smart-contract-developmen)

## 引入汇编

```
assembly {
 // some assembly code here
}
```

> 在`assembly`块内的代码开发语言被称为Yul，为了简化我们称其为 汇编、汇编代码或EVM汇编。

Yul文档：https://docs.soliditylang.org/en/latest/yul.html

## 变量定义与赋值

```assembly
assembly {
 let x := 2
}
```

如果没有使用`:=`操作符给变量赋值，那么该变量自动初始化为0值

## 字面量

在Solidity汇编中字面量的写法与Solidity一致。不过，字符串字面量最多可以包含32个字符。

```
assembly { 
 let a := 0x123             // 16进制
 let b := 42                // 10进制
 let c := "hello world"     // 字符串

 let d := "very long string more than 32 bytes" // 超长字符串，出错！
}
```

## 汇编中的块和作用域

在Solidity汇编中，变量的作用范围遵循标准规则。一个块的范围使用由一对大括号标识。

```assembly
assembly { 
 let x := 3          // x在各处可见
  
 // Scope 1 
 { 
 let y := x     // ok 
 }  // 到此处会销毁y

 // Scope 2 
 { 
 let z := y     // Error 
 } // 到此处会销毁z
}
```

## 内存、Calldata变量、状态变量

## 汇编中的循环

### For循环

```assembly
function for_loop_assembly(uint n, uint value) public pure returns (uint) {
     assembly {
       for { let i := 0 } lt(i, n) { i := add(i, 1) } { 
           value := mul(2, value) 
       }
           
       mstore(0x0, value)
       return(0x0, 32)
   }
}
```

###  while循环

```assembly
assembly {
    let x := 0
    let i := 0
    for { } lt(i, 0x100) { } {     // 等价 while(i < 0x100)
        x := add(x, mload(i))
        i := add(i, 0x20)
    }
}
```

## 在Solidity汇编的判断语句

### If

Solidity内联汇编支持使用`if`语句来设置代码执行的条件，但是没有其他语言中的`else`部分。

`if`语句强制要求代码块使用大括号

```assembly
assembly {
    if slt(x, 0) { x := sub(0, x) }  // Ok
            
    if eq(value, 0) revert(0, 0)    // Error, 需要大括号
}
```

如果需要在Solidity内联汇编中检查多种条件，可以考虑使用 `switch` 语句。

### switch语句

`switch`语句支持 一个默认分支`default`

- 所有的分支条件值必须 具有**相同的类型** 和 具有不**同的值**
- 如果分支条件已经涵盖所有可能的值，那么不允许再出现`default`条件

```assembly
assembly {
    let x := 0
    switch calldataload(4)
    case 0 {
        x := calldataload(0x24)
    }
    default {
        x := calldataload(0x44)
    }
    sstore(0, div(x, 2))
}

```

## Solidity汇编的函数

可以在 Solidity内联汇编中定义底层函数，他们可以包含自己的逻辑，调用这些自定义的函数和使用内置的操作码一样。

下面的汇编函数用来分配指定长度`length`的内存，并返回内存指针`pos`：

```assembly
assembly {
    
    function allocate(length) -> pos {
        pos := mload(0x40)
        mstore(0x40, add(pos, length))
    }
    let free_memory_pointer := allocate(64)
}

```

它还可以声明参数。它们的类型不需要像 `Solidity` 函数一样指定。

```assembly
assembly {

    function my_assembly_function(param1, param2) {  
        // assembly code here
    }
}
```

### 函数返回值

像 Rust一样，返回值用`->` 指定会返回一个值.

```assembly
assembly {
    
    function my_assembly_function(param1, param2) -> my_result {
        
        // param2 - (4 * param1)
        my_result := sub(param2, mul(4, param1))
    
    }
    let some_value = my_assembly_function(4, 9)  // 4 - (9 * 4) = 32
}
```

不需要显式返回语句。为了返回一个值，只需在最终语句中将其分配给返回变量（如前面的示例中`my_result`）。

> **重要提示**：EVM 包含了 `return` 的内置操作代码。如果在汇编函数中编写了`return` 操作码，它将停止完全执行当前上下文（内部消息调用），而不仅仅是当前汇编函数。

### 退出函数

`leave` 关键字可以放置在汇编函数体的任意位置，以停止其执行流并退出它。它的工作原理与空返回语句完全相同，有一个例外：函数将返回上次复制的变量给返回变量。

> 注意：`leave` 关键字只能在函数内使用

## 操作码(Opcodes)和汇编

### 操作码简介

EVM 操作码可以分为以下几类：

- 算数和比较操作
- 位操作
- 密码学计算，目前仅包含`keccak256`
- 环境操作码，主要指与区块链相关的全局信息，例如：`blockhash`或`coinbase`
- 存储、内存和栈操作
- 交易与合约调用操作
- 停机操作
- 日志操作

### 有哪些操作码

操作码列表可以查看[Solidity文档](https://docs.soliditylang.org/en/latest/yul.html#evm-dialect)，有关这个表的更多详细信息：

- 操作码始终从堆栈顶部获取参数（在括号中给出）。

- 标有 `-`（第二列）的操作码不会将项推送到栈上。这些操作码的大多数是返回内存中的值。

- 所有其他操作码会将项（其"返回"值）压入到堆栈上。

- 标有`F`、`H`、`B`和`C`的操作码，表示从相应的版本：Frontier、Homestead、Byzantium和Constantinople（君士坦丁堡）加入。

  > 译者注： 以太坊经历了哪些升级版本，可以查看：[以太坊发展简史](https://learnblockchain.cn/2019/06/15/eth-history1/)

- `mem[a...b)` 表示从位置 a 开始到（但不包括位置 b）开始的内存字节。

- `storage[p]` 表示位置 p 处的存储内容。