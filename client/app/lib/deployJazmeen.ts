import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { JAZMEEN_FACTORY_ABI, JAZMEEN_FACTORY_ADDRESS } from './contract';

interface DeployParams {
  name: string;
  symbol: string;
  url: string; // Image URL
  fid: string; // Farcaster ID as string (converted to number)
}

interface DeployResult {
  success: boolean;
  contractAddress?: string; // Token address from event
  transactionHash?: string;
  webUrl?: string; // URL to view the token
  error?: string;
}

export async function deploySmartContract({
  name,
  symbol,
  url,
  fid,
}: DeployParams): Promise<DeployResult> {
  try {
    // Initialize Web3 with Celo provider
    const web3 = new Web3(process.env.NEXT_PUBLIC_CELO_RPC || 'https://forno.celo.org');

    // Get account from private key
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY; // Use PRIVATE_KEY, not NEXT_PUBLIC_ (server-side only)
    if (!privateKey) throw new Error('Private key not found in environment variables');
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);

    // Create contract instance for the already-deployed factory
    const contract = new web3.eth.Contract(
      JAZMEEN_FACTORY_ABI as AbiItem[],
      JAZMEEN_FACTORY_ADDRESS
    );

    // Convert FID to number (Solidity expects uint256)
    const initiatorFid = parseInt(fid, 10);
    if (isNaN(initiatorFid)) throw new Error('Invalid FID: must be a number');

    // Encode the deployToken function call
    const txData = contract.methods
      .deployToken(name, symbol, initiatorFid, url)
      .encodeABI();

    // Estimate gas
    const gasEstimate = await contract.methods
      .deployToken(name, symbol, initiatorFid, url)
      .estimateGas({ from: account.address });

    const gasPrice = await web3.eth.getGasPrice();

    // Build and sign the transaction
    const tx = {
      from: account.address,
      to: JAZMEEN_FACTORY_ADDRESS,
      data: txData,
      gas: gasEstimate.toString(),
      gasPrice: gasPrice.toString(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Extract the token address from the TokenDeployed event
    const event = receipt.logs.find((log: any) =>
      log.topics[0] === web3.utils.sha3('TokenDeployed(address,uint256,string,string,string)')
    );
    if (!event) throw new Error('TokenDeployed event not found in receipt');

    if (!event || !event.topics || event.topics.length < 2) throw new Error('Invalid event topics');
    const tokenAddress = web3.eth.abi.decodeParameter('address', event.topics[1].toString()) as string;

    return {
      success: true,
      contractAddress: tokenAddress,
      transactionHash: receipt.transactionHash.toString(),
      webUrl: `https://jazmeen.xyz/${tokenAddress}`,
    };
  } catch (error: any) {
    console.error('Contract deployment failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}