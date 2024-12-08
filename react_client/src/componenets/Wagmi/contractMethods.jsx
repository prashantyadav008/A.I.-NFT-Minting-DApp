/** @format */

import NFTMinting from "./ABI/NFTMinting.json";
import { config } from "./wagmiConfig";
import { encodeFunctionData } from "viem";

import {
  getAccount,
  readContract,
  sendTransaction,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { Link } from "react-router-dom";
import { sepolia } from "viem/chains";

// import swal from "sweetalert";

export const ContractMethods = () => {
  const { address } = getAccount(config);
  const nftContract = process.env.NFTMinting;

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
    // startDistribution: startDistribution,
    // released: releasedToken,
    // releasedCategoryToken: releasedCategoryToken,
  };
};
