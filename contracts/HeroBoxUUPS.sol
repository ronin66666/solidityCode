// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "hardhat/console.sol";

contract HeroBoxUUPS is
    Initializable,
    ContextUpgradeable,
    AccessControlEnumerableUpgradeable,
    ERC721EnumerableUpgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    CountersUpgradeable.Counter private _tokenIdTracker;
    IERC20Upgradeable public currToken;

    uint256 public nftPrice;
    address public tokenReceiveAddress;

    event MintMulti(address indexed _to, uint256 _amount);
    event Mint(address _to, uint256 tokenid_);

    modifier onlyEOA() {
        require(msg.sender == tx.origin, "Blindbox: not eoa");
        _;
    }

    constructor() {}

    //可升级权限控制
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner() {

    }

    function initialize(
        IERC20Upgradeable currToken_,
        uint256 nftPrice_,
        address tokenReceiveAddress_
    ) public initializer {
        __AccessControlEnumerable_init();
        __ERC721_init_unchained("EPK Hero Box", "HEROBOX");
        __ERC721Enumerable_init_unchained();
        __UUPSUpgradeable_init();
        __Ownable_init();

        currToken = currToken_;
        nftPrice = nftPrice_;
        tokenReceiveAddress = tokenReceiveAddress_;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(
            AccessControlEnumerableUpgradeable,
            ERC721EnumerableUpgradeable
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mintMulti(uint256 amount) external onlyEOA {
        require(amount > 0, "BlindBox: missing amount");

        for (uint256 i = 0; i < amount; i++) {
            _mint(_msgSender(), _tokenIdTracker.current());
            emit Mint(_msgSender(), _tokenIdTracker.current());
            _tokenIdTracker.increment();
        }
        uint256 cost = nftPrice * amount;
        console.log("cost = ", cost);
        IERC20Upgradeable(currToken).safeTransferFrom(
            _msgSender(),
            tokenReceiveAddress,
            cost
        );
        emit MintMulti(_msgSender(), amount);
    }
}
