// app/page.tsx (or wherever your Home component lives)
"use client";

import { ReactElement, useState, useEffect } from "react";
import HomeCard from "@/app/_components/card/HomeCard";
import Web3 from 'web3';
import { JAZMEEN_FACTORY_ABI, JAZMEEN_FACTORY_ADDRESS } from '@/app/lib/contract';

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

export default function Home(): ReactElement {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const web3 = new Web3(process.env.NEXT_PUBLIC_CELO_RPC || 'https://forno.celo.org');
        const contract = new web3.eth.Contract(
          JAZMEEN_FACTORY_ABI as any,
          JAZMEEN_FACTORY_ADDRESS
        );

        const tokenList: any[] = await contract.methods.getTokens().call();
        const formattedTokens = tokenList.map((token: any) => ({
          tokenAddress: token.tokenAddress,
          name: token.name,
          symbol: token.symbol,
          initiatorFid: token.initiatorFid.toString(), // Convert uint256 to string
          imageUrl: token.imageUrl,
        }));

        setTokens(formattedTokens);
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) {
    return <div className="text-gray-100 px-4">Loading tokens...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden px-4">
      {tokens.length === 0 ? (
        <div className="text-gray-100">No tokens found.</div>
      ) : (
        tokens.map((token) => (
          <HomeCard
            key={token.tokenAddress}
            token={token}
            marketCap="$223.34"    // Placeholder (replace with real data later)
            volume24h="$223.34k"   // Placeholder
            createdAt="4 hrs ago"  // Placeholder
          />
        ))
      )}
    </div>
  );
}