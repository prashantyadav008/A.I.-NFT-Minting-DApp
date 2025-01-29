/** @format */

import NFTMinting from "./ABI/NFTMinting.json";
import { config } from "./wagmiConfig";
import { WagmiContractConfig } from "./wagmiContractConfig";
// eslint-disable-next-line no-unused-vars
import { parseEther } from "viem";
import {
  getAccount,
  readContract,
  readContracts,
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { sepolia } from "viem/chains";

import dummyImage from "../../assets/dummyImage.png";

// import swal from "sweetalert";

export const ContractMethods = () => {
  // eslint-disable-next-line no-unused-vars
  const { address } = getAccount(config);
  // eslint-disable-next-line no-undef
  const nftContract = process.env.REACT_APP_NFTMinting;

  const totalNFT = async () => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "totalNFT",
      chainId: sepolia.id,
    });

    return Number(result);
  };

  const mintPrice = async () => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "mintPrice",
      chainId: sepolia.id,
    });

    return Number(result);
  };

  const ownerOf = async (tokenId) => {
    try {
      const result = await readContract(config, {
        abi: NFTMinting,
        address: nftContract,
        functionName: "ownerOf",
        args: [tokenId],
        chainId: sepolia.id,
      });

      return result;
    } catch (error) {
      return "0x0000000000000000000000000000000000000000";
    }
  };

  const getUserDetails = async (walletAddress) => {
    try {
      const totalNFTs = await totalNFT();

      let result = [];

      for (let tokenId = 1; tokenId <= totalNFTs; tokenId++) {
        const nftOwner = await ownerOf(tokenId);

        if (walletAddress == nftOwner) {
          let userDetail = await readContracts(config, {
            contracts: [
              {
                ...WagmiContractConfig,
                functionName: "mintedCost",
                args: [walletAddress, tokenId],
              },
              {
                ...WagmiContractConfig,
                functionName: "mintedAt",
                args: [tokenId],
              },
              {
                ...WagmiContractConfig,
                functionName: "tokenURI",
                args: [tokenId],
              },
            ],
          });

          result.push({
            nftId: tokenId,
            mintedCost: Number(userDetail[0]?.result),
            mintedAt: new Date(
              Number(userDetail[1]?.result) * 1000
            ).toLocaleDateString("sv"),
            tokenURI: await renderFilePreview(userDetail[2]?.result),
          });
        }
      }

      return {
        status: true,
        result: result,
      };
    } catch (error) {
      console.log("getUserDetails error --->>> ", error);
      return {
        status: false,
        result: [],
      };
    }
  };

  const detectFileType = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" }); // Metadata fetch karne ke liye HEAD request
      const contentType = response.headers.get("Content-Type");

      console.log("contentType --->>> ", contentType);

      if (contentType.includes("image")) {
        return "image";
      } else if (contentType.includes("video")) {
        return "video";
      } else if (contentType.includes("pdf")) {
        return "pdf";
      } else {
        return "other";
      }
    } catch (error) {
      console.error("Error detecting file type:", error);
      return "unknown";
    }
  };

  const renderFilePreview = async (url) => {
    let fileUrl;
    try {
      let response = await fetch(url);
      let data = await response.json();

      response = await fetch(data.image);

      fileUrl = response.url;

      if (!fileUrl) {
        return <img src={dummyImage} alt="NFT Minting" width="150" />;
      }

      const fileType = await detectFileType(fileUrl);

      if (["other"].includes(fileType)) {
        return <img src={dummyImage} alt="NFT Minting" width="150" />;

        // return <img src={fileUrl} alt="NFT" width="150" />;
      } else {
        return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View NFT
          </a>
        );
      }
    } catch (error) {
      return <img src={dummyImage} alt="NFT Minting" width="150" />;
    }
  };

  const mintNFT = async (walletAddress, imageUri) => {
    if (address === undefined) {
      return {
        status: false,
        message: "Please Connect Wallet",
      };
    }

    console.log("walletAddress, imageUri --->>", walletAddress, imageUri);
    let result;

    try {
      let mintingPrice = await mintPrice();

      // Simulate the contract call to ensure parameters are correct
      const { request } = await simulateContract(config, {
        abi: NFTMinting,
        address: nftContract,
        functionName: "mint",
        value: parseEther((mintingPrice / 1e18).toString()),
        args: [walletAddress, imageUri],
        chainId: sepolia.id,
      });

      // Perform the actual contract write operation
      const transactionHash = await writeContract(config, request);

      // Wait for the transaction receipt
      result = await waitForTransactionReceipt(config, {
        chainId: sepolia.id,
        hash: transactionHash,
      });

      if (result.status == "success") {
        result = {
          status: true,
          message: "Mint Minted Successfully",
        };
      } else {
        result = {
          status: false,
          message: "Something went wrong! Minting Failed1",
        };
      }
    } catch (error) {
      console.error("Error minting NFT:", error);

      result = {
        status: false,
        message: "Something went wrong! Minting Failed",
      };
    }

    return result;
  };

  const withdrawalNFT = async (walletAddress, nftId) => {
    if (address === undefined) {
      return {
        status: false,
        message: "Please Connect Wallet",
      };
    }

    if (address !== walletAddress) {
      return {
        status: false,
        message: "Only Owner Can Withdrawal NFT",
      };
    }

    let result;

    try {
      // Simulate the contract call to ensure parameters are correct
      const { request } = await simulateContract(config, {
        abi: NFTMinting,
        address: nftContract,
        functionName: "withdrawNFT",
        args: [nftId],
        chainId: sepolia.id,
      });

      // Perform the actual contract write operation
      const transactionHash = await writeContract(config, request);

      // Wait for the transaction receipt
      result = await waitForTransactionReceipt(config, {
        chainId: sepolia.id,
        hash: transactionHash,
      });

      if (result.status == "success") {
        result = {
          status: true,
          message: "Withdrawal NFT Successfully",
        };
      } else {
        result = {
          status: false,
          message: "Something went wrong! Withdrawal NFT Failed",
        };
      }
    } catch (error) {
      console.error("Error Withdrawing NFT:", error);

      result = {
        status: false,
        message: "Something went wrong! Withdrawal NFT Failed",
      };
    }

    return result;
  };

  return {
    // read method
    getUserDetails: getUserDetails,

    // write method
    mintNFT: mintNFT,
    withdrawalNFT: withdrawalNFT,
  };
};
