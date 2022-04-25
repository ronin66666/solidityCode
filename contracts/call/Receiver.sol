// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Receiver {
    
    event Received(address caller, uint amount, string message);

    fallback() external payable {
        console.log("fallback address = %s, msg.value = %d", msg.sender, msg.value);
        emit Received(msg.sender, msg.value, "Fallback was called");
    }

    function foo(string memory _message, uint _x) public payable returns (uint) {
        emit Received(msg.sender, msg.value, _message);

        return _x + 1;
    }
}