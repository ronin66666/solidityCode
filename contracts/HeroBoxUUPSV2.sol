// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./HeroBoxUUPSV1.sol";

contract HeroBoxUUPSV2 is HeroBoxUUPSV1 {

    event Open(address owner, uint256 tokenId);

    function open(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "HeroBoxUUPSV2: not your tokenId");
        //...
        burn(tokenId);
        emit Open(msg.sender, tokenId);
    }
}