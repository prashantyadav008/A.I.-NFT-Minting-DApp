import { BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";

export async function basicMethod() {

  function numberToBigNumber(num: number) {
    return BigNumber.from(num);
  }

  function decimal(num: number) {
    return BigNumber.from(num).mul(1e8);
  }

  // random address
  const [deployer, ...users] = await ethers.getSigners();

  const NFTMinting = await ethers.getContractFactory("NFTMinting");
  const nft = await upgrades.deployProxy(NFTMinting, ["NFTMinting", "NM", decimal(1), deployer.address], {
    initializer: "initialize",
  });



  return {
    numberToBigNumber,
    decimal,

    deployer,
    users,
    nft,


  };
}
