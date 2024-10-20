// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./INFTMinting.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract NFTMinting is
    INFTMinting,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    uint256 public totalNFT;

    uint256 public mintPrice;
    bool public mintPaused;

    mapping(address => uint256[]) public mintedCount;
    mapping(address => mapping(uint => uint256)) public mintedCost;

    function initialize(
        string memory name,
        string memory symbol,
        uint256 mintPrice_,
        address intializeOwner
    ) public initializer {
        __ERC721_init(name, symbol);
        __ERC721URIStorage_init();
        __Ownable_init(intializeOwner);

        mintPrice = mintPrice_;
    }

    function mint(
        address recipient,
        string memory baseURI
    ) external payable nonReentrant returns (uint256) {
        require(!mintPaused, "Minting is paused");
        require(msg.value >= mintPrice, "Insufficient payment");

        unchecked {
            totalNFT++;
        }

        uint256 newTokenId = totalNFT;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, baseURI);

        mintedCount[recipient].push(newTokenId);
        mintedCost[recipient][newTokenId] = msg.value;

        return newTokenId;
    }

    function withdrawNFT(uint tokenId) external {
        uint256 balance = mintedCost[msg.sender][tokenId];

        require(balance > 0, "Nothing to withdraw!");

        _burn(tokenId);

        mintedCost[msg.sender][tokenId] = 0;

        payable(msg.sender).transfer(balance);
    }

    function setMintPrice(uint256 mintPrice_) external onlyOwner {
        mintPrice = mintPrice_;
    }

    function toggleMintPaused(bool mintPaused_) external onlyOwner {
        mintPaused = mintPaused_;
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
