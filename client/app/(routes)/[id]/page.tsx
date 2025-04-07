/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[id]/page.tsx
import React from 'react';
import RightGrid from './_components/right-grid/RightGrid';
import { TradingViewWidget } from './_components/left-grid/trading-view/TradingView';
import Web3 from 'web3';
import { JAZMEEN_FACTORY_ABI, JAZMEEN_FACTORY_ADDRESS } from '@/app/lib/contract';
import { Metadata } from 'next';

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

interface UserProps {
  params: Promise<{ id: string; }>;
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

// Generate metadata for the token page
export async function generateMetadata({ params }: UserProps): Promise<Metadata> {
  const { id } = await params; // Token address
  const tokenData = await fetchTokenData(id);

  if (!tokenData) {
    return {
      title: 'Token Not Found | Jazmeen',
      description: 'This token does not exist on Jazmeen.',
      openGraph: {
        title: 'Token Not Found | Jazmeen',
        description: 'This token does not exist on Jazmeen.',
        images: ['/default-og-image.jpg'], // Fallback image (add to public/)
      },
    };
  }

  const { name, symbol, initiatorFid, imageUrl } = tokenData;
  const reviewDescription = `${name} ($${symbol}) is a memecoin on Celo, created by FID ${initiatorFid}. Market cap: $223.34 (placeholder). Check it out on Jazmeen!`;

  return {
    title: `${name} ($${symbol}) | Jazmeen`,
    description: reviewDescription,
    openGraph: {
      title: `${name} ($${symbol}) | Jazmeen`,
      description: reviewDescription,
      images: [
        {
          url: `/api/og?address=${id}`, // Dynamic OG image route
          width: 1200,
          height: 630,
          alt: `${name} Token Preview`,
        },
      ],
      url: `https://jazmeen.xyz/${id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} ($${symbol}) | Jazmeen`,
      description: reviewDescription,
      images: [`/api/og?address=${id}`],
    },
  };
}

const User = async ({ params }: UserProps) => {
  const { id } = await params; // Token address
  const tokenData = await fetchTokenData(id);

  if (!tokenData) {
    return <div className="text-gray-100 p-4">Token not found</div>;
  }

  return (
    <div className="border-gray-700 rounded p-4 -mt-8">
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