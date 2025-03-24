'use client'
import React from 'react';
import HomeCard from '@/app/_components/card/HomeCard';
import { useTokens } from '@/app/hooks/useTokens';

const Home: React.FC = () => {
  const { filteredTokens, loading } = useTokens();

  if (loading) {
    return <div className="text-gray-100 px-4">Loading tokens...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden px-4">
      {filteredTokens.length === 0 ? (
        <div className="text-gray-100">No tokens found.</div>
      ) : (
        filteredTokens.map((token) => (
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
};

export default Home;
