// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface INFTMinting {
    function totalNFT() external view returns (uint256);

    function mint(
        address recipient,
        string memory baseURI
    ) external payable returns (uint256);

    function withdrawNFT(uint tokenId) external;
}
