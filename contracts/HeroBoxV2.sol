// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./HeroBoxV1.sol";

contract HeroBoxV2 is HeroBoxV1 {

    event Open(address owner, uint256 tokenId);

    function open(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "HeroBoxUUPSV2: not your tokenId");
        //...

        burn(tokenId);
        emit Open(msg.sender, tokenId);
    }
}