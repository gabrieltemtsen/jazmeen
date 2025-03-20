import React from 'react';
import RightGrid from './_components/right-grid/RightGrid';
import { TradingViewWidget } from './_components/left-grid/trading-view/TradingView';
import Web3 from 'web3';
import { JAZMEEN_FACTORY_ABI, JAZMEEN_FACTORY_ADDRESS } from '@/app/lib/contract';

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

interface UserProps {
  params: Promise<{ id: string }>;
}

async function fetchTokenData(tokenAddress: string): Promise<TokenInfo | null> {
  try {
    const web3 = new Web3(process.env.NEXT_PUBLIC_CELO_RPC || 'https://forno.celo.org');
    const contract = new web3.eth.Contract(JAZMEEN_FACTORY_ABI as any, JAZMEEN_FACTORY_ADDRESS);
    const tokens: any[] = await contract.methods.getTokens().call();

    const token = tokens.find((t: any) => t.tokenAddress.toLowerCase() === tokenAddress.toLowerCase());
    if (!token) return null;

    return {
      tokenAddress: token.tokenAddress,
      name: token.name,
      symbol: token.symbol,
      initiatorFid: token.initiatorFid.toString(),
      imageUrl: token.imageUrl,
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
}

const User = async ({ params }: UserProps) => {
  const { id } = await params; // Token address
  const tokenData = await fetchTokenData(id);

  if (!tokenData) {
    return <div className="text-gray-100 p-4">Token not found</div>;
  }

  return (
    <div className="border-gray-700 rounded p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8 rounded-lg">
          <TradingViewWidget symbol={tokenData.symbol} />
        </div>
        <div className="col-span-12 xl:col-span-4 rounded-lg order-first md:order-none">
          <RightGrid token={tokenData} />
        </div>
      </div>
    </div>
  );
};

export default User;