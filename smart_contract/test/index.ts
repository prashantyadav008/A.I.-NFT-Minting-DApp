import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export async function basicMethod() {
  // random address
  const [deployer, ...users] = await ethers.getSigners();

  // Deploy Token Contract
  const NFTMinting = await ethers.getContractFactory("NFTMinting");
  const nft = await NFTMinting.deploy();

  return {
    deployer,
    users,
    nft,
  };
}
