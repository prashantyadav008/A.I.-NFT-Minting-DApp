// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface INFTMinting {
    function mint(string memory _uri) external payable;

    function withdrawal() external;
}
