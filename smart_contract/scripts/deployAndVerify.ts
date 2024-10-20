/** @format */

import hre, { ethers, upgrades } from "hardhat";

async function main() {

    //Deploy Admin Contract
    const NFTMinting = await ethers.getContractFactory("NFTMinting");
    const nft = await upgrades.deployProxy(NFTMinting, ["NFTMinting", "NM", 1e18, "0xa9571EA2EA168A6e10a69f1278fD0AC2C518cccd"], {
        initializer: "initialize",
    });

    await nft.deployed();
    console.log("NFT Minting Contract Address", nft.address);


    await hre.run("verify:verify", {
        address: nft.address,
        contract: "contracts/NFTMinting.sol:NFTMinting",
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("Deploy error-> ", error);
        process.exit(1);
    });

// Set Assets: [Art,Watch,Gold,SPV,Fund]
// Set Investments: ["Sale","Loan","Parcel","Fraction"]