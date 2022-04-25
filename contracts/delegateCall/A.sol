// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract A {
    uint public num;
    address public sender;
    uint public value;

    event SetValue(bool success, bytes data);

    function setVars(address _contract, uint _num) public payable {
        // A's storage is set, B is not modified.
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
        // require(success, "delegatecall error");
        // uint256 v = abi.decode(data,(uint256));
        emit SetValue(success, data);
    }
}