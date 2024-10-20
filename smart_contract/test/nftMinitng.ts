/** @format */

import { exit } from "process";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";

import { basicMethod } from "./index";
import { expect } from "chai";

describe("NFTMinting Contract", () => {
  describe("Initializer Method", () => {
    it("Should check Token Detail", async () => {
      const { deployer, nft, } = await loadFixture(basicMethod);

      expect(await nft.name()).to.equal("NFTMinting");
      expect(await nft.symbol()).to.equal("NM");
      expect(await nft.owner()).to.equal(
        deployer.address
      );
    });

    it("Should check State Variables Detail", async () => {
      const { deployer, numberToBigNumber, decimal } = await loadFixture(basicMethod);


      const NFTMinting = await ethers.getContractFactory("NFTMinting");
      const nft = await upgrades.deployProxy(NFTMinting, ["NFTMinting", "NM", decimal(1), deployer.address], {
        initializer: "initialize",
      });

      expect(await nft.totalNFT()).to.equal(numberToBigNumber(0));
      expect(await nft.mintPrice()).to.equal(decimal(1));
      expect(await nft.mintPaused()).to.equal(
        false
      );
    });

    it("Should check Initialize Method", async () => {
      const { deployer, nft, numberToBigNumber, decimal } = await loadFixture(basicMethod);

      expect(await nft.totalNFT()).to.equal(numberToBigNumber(0));
      expect(await nft.mintPrice()).to.equal(decimal(1));
      expect(await nft.mintPaused()).to.equal(
        false
      );
    });

    it("Should check Already Initialize Method", async () => {
      const { deployer, nft, decimal } = await loadFixture(basicMethod);

      await expect(nft.initialize("NFTMinting", "NM", decimal(1), deployer.address)).to.reverted;
    });
  });
});