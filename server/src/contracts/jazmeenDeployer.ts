/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { JAZMEEN_FACTORY_ABI } from "./contracts.js";

// Replace with your deployed Jazmeen Factory address
const FACTORY_ADDRESS = "0xYourDeployedFactoryAddressHere";

// Replace with your RPC URL
const RPC_URL = "https://your-network-rpc-url";

// Initialize provider and signer
const provider = new ethers.JsonRpcProvider(RPC_URL);
const privateKey = "0xYourPrivateKeyHere"; // Replace with your private key
const signer = new ethers.Wallet(privateKey, provider);

// Initialize the factory contract
const factoryContract = new ethers.Contract(
  FACTORY_ADDRESS,
  JAZMEEN_FACTORY_ABI,
  signer
);

export async function deployJazmeenToken(
  name: string,
  symbol: string,
  initialSupply: number,
  imageUrl: string
) {
  try {
    console.log("Deploying Jazmeen Token...");

    // Call the deployToken function from the factory contract
    const tx = await factoryContract.deployToken(
      name,
      symbol,
      initialSupply,
      imageUrl
    );

    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Token deployed successfully. Transaction receipt:", receipt);

    // Get the TokenDeployed event from the transaction receipt
    const event = receipt.logs.find((log: any) => {
      const parsedLog = factoryContract.interface.parseLog(log);
      return parsedLog && parsedLog.name === "TokenDeployed";
    });

    if (event) {
      const parsedLog = factoryContract.interface.parseLog(event);
      if (parsedLog) {
        const { creator, tokenAddress } = parsedLog.args;
        console.log(`Token deployed by: ${creator}`);
        console.log(`Token address: ${tokenAddress}`);
      } else {
        console.log("Failed to parse the event log.");
      }
    } else {
      console.log("No TokenDeployed event found.");
    }
  } catch (error) {
    console.error("Error deploying token:", error);
  }
}
