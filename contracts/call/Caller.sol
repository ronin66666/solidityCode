// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Caller {

    event Response(bool success, uint256 value);

    //传入目标合约地址即可调用
    function testCallFoo(address payable _addr) public payable {

        // 可以附加自定义gas和value
        (bool success, bytes memory data) = _addr.call(
            abi.encodeWithSignature("foo(string,uint256)", "call foo", 300)
        );
        require(success, "call error");
        uint256 value = abi.decode(data, (uint256));
        emit Response(success, value);
    }

    function testCallFooWithValueAndGas(address payable _addr) public payable {

        // 可以附加自定义gas和value
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: 5000}(
            abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
        );
        require(success, "call error");
        uint256 value = abi.decode(data, (uint256));
        emit Response(success, value);
    }

    // calling 一个不存在的方法目标函数会发生回退
    function testCallDoesNotExist(address _addr) public {
        (bool success, bytes memory data) = _addr.call(
            abi.encodeWithSignature("doesNotExist()")
        );
        require(success, "call error");
        uint256 value = abi.decode(data, (uint256));
        emit Response(success, value);
    }
}