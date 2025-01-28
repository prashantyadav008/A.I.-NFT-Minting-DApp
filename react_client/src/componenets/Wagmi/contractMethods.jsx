/** @format */

import NFTMinting from "./ABI/NFTMinting.json";
import { config, walletClient } from "./wagmiConfig";
// eslint-disable-next-line no-unused-vars
import { parseEther } from "viem";
import {
  getAccount,
  readContract,
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { sepolia } from "viem/chains";

// import swal from "sweetalert";

export const ContractMethods = () => {
  // eslint-disable-next-line no-unused-vars
  const { address } = getAccount(config);
  // eslint-disable-next-line no-undef
  const nftContract = process.env.REACT_APP_NFTMinting;

  const balanceOf = async (walletAddress) => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "balanceOf",
      args: [walletAddress],
      chainId: sepolia.id,
    });

    return result;
  };

  const mintPaused = async () => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "mintPaused",
      chainId: sepolia.id,
    });

    return result;
  };

  const nftMintPrice = async (walletAddress, tokenId) => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "mintPrice",
      args: [walletAddress, tokenId],
      chainId: sepolia.id,
    });

    return result;
  };

  const userTotalMintedCost = async (walletAddress, tokenId) => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "mintedCost",
      args: [walletAddress, tokenId],
      chainId: sepolia.id,
    });

    return result;
  };

  const userTotalMintedCount = async (walletAddress, tokenId) => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "mintedCount",
      args: [walletAddress, tokenId],
      chainId: sepolia.id,
    });

    return result;
  };

  const ownerOf = async (tokenId) => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "ownerOf",
      args: [tokenId],
      chainId: sepolia.id,
    });

    return result;
  };

  const tokenURI = async () => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "tokenURI",
      chainId: sepolia.id,
    });

    return String(result);
  };

  const totalNFT = async () => {
    const result = await readContract(config, {
      abi: NFTMinting,
      address: nftContract,
      functionName: "totalNFT",
      chainId: sepolia.id,
    });

    return Number(result);
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
      // Simulate the contract call to ensure parameters are correct
      const { request } = await simulateContract(config, {
        abi: NFTMinting,
        address: nftContract,
        functionName: "mint",
        value: parseEther("0.1"),
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

  const toggleMintPaused = async (status) => {
    await walletClient.switchChain({ id: sepolia.id });

    if (address === undefined) {
      return {
        status: false,
        message: "Please Connect Wallet",
      };
    }

    let result;

    try {
      // Simulate the contract call to ensure parameters are correct
      const { request } = await simulateContract(config, {
        abi: NFTMinting,
        address: nftContract,
        functionName: "toggleMintPaused",
        args: [status],
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
          message: status
            ? "Mint Paused Successfully"
            : "Mint Un-Paused Successfully",
        };
      } else {
        result = {
          status: false,
          message: "Something went wrong! Minting Paused-UnPaused Failed",
        };
      }
    } catch (error) {
      console.error("Error minting NFT:", error);

      result = {
        status: false,
        message: "Something went wrong! Minting Pause Updation Failed",
      };
    }

    return result;
  };

  return {
    // read method
    balanceOf: balanceOf,
    mintPaused: mintPaused,
    nftMintPrice: nftMintPrice,
    userTotalMintedCost: userTotalMintedCost,
    userTotalMintedCount: userTotalMintedCount,
    ownerOf: ownerOf,
    tokenURI: tokenURI,
    totalNFT: totalNFT,

    // write method
    mintNFT: mintNFT,
    toggleMintPaused: toggleMintPaused,
    // releasedCategoryToken: releasedCategoryToken,
  };
};
