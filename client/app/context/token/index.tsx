'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';
import { JAZMEEN_FACTORY_ABI, JAZMEEN_FACTORY_ADDRESS } from '@/app/lib/contract';

interface TokenItem {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

export interface TokenContextType {
  tokens: TokenItem[];
  filteredTokens: TokenItem[];
  setFilteredTokens: React.Dispatch<React.SetStateAction<TokenItem[]>>;
  loading: boolean;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenItem[]>([]);
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
        setFilteredTokens(formattedTokens); // Initially, show all tokens
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, filteredTokens, setFilteredTokens, loading }}>
      {children}
    </TokenContext.Provider>
  );
};
