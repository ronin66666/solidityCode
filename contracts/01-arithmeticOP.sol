// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//算数运算符
contract ArithmeticOperators {

    //x + y
    function add(uint x, uint y) pure public returns (uint) {

        assembly {
            let result := add(x, y) //add 操作符
            mstore(0x0, result) // 用 位置0x0 ~ 0x0+32位置的内存储存result, result是uint类型站用32个字节
            return (0x0, 32) //返回0x0 ~ 0x0 + 32位置 的内存字节 
        }
    }

    //x - y
    function sub(uint x, uint y) pure public returns (uint) {

        assembly {
            let result := sub(x, y) 
            mstore(0x0, result) 
            return (0x0, 32) 
        }
    }

    // x * y
    function mul(uint x, uint y) pure public returns (uint) {

        assembly {
            let result := mul(x, y) 
            mstore(0x0, result) 
            return (0x0, 32) 
        }
    }

    //x / y or  0 if == 0
    function div(uint x, uint y) pure public returns (uint) {

        assembly {
            let result := div(x, y) 
            mstore(0x0, result) 
            return (0x0, 32) 
        }
    }

    // x / y，对于二进制补码中的有符号数，如果 y == 0，则为 0
    // 暂时未发现特别处: 如果x: int, y: int ,参数传入负数会报错：
    // Error encoding arguments: Error: value out-of-bounds (argument=null, value="-10", code=INVALID_ARGUMENT, version=abi/5.5.0)
    function sdiv(uint x, uint y) pure public returns (uint) {
            assembly {
                let result := sdiv(x, y) 
                mstore(0x0, result) 
                return (0x0, 32) 
            }
    }

    //x % y, 0 if y == 0
    function mod(uint x, uint y) pure public returns (uint) {
            assembly {
                let result := mod(x, y) 
                mstore(0x0, result) 
                return (0x0, 32) 
            }
    }

    //smod(x, y)
    //x % y, for signed numbers in two’s complement, 0 if y == 0
    function smod(uint x, uint y) pure public returns (uint) {
            assembly {
                let result := smod(x, y) 
                mstore(0x0, result) 
                return (0x0, 32) 
            }
    }
    //exp: x to the power of y
    //x 的 y 次方
    function exp(uint x, uint y) pure public returns (uint) {
            assembly {
                let result := exp(x, y) 
                mstore(0x0, result) 
                return (0x0, 32) 
            }
    }

    //-------------------------比较运算----------------

}