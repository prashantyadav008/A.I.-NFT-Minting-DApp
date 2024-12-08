/** @format */

import hre, { ethers, upgrades } from "hardhat";

async function main() {
    //Deploy NFT Miniting Contract
    const NFTMinting = await ethers.getContractFactory("NFTMinting");
    const nft = await upgrades.deployProxy(NFTMinting, ["NFTMinting", "NM", 1, "0xADAbBb860C99ea6A7619F263c673ecC1f06e9A89"], {
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