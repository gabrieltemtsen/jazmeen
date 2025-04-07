'use client';
import React from 'react';
import { useTokens } from '@/app/hooks/useTokens';
import TokenCards from '@/app/_components/card/stacked';

const Home: React.FC = () => {
  const { filteredTokens, loading } = useTokens();
  if (loading) {
    return <div className="text-gray-100 px-4">Loading tokens...</div>;
  }

  return (
    <>
      {filteredTokens.length === 0 ? (
        <div className="text-gray-100">No tokens found.</div>
      ) :
        <TokenCards filteredTokens={filteredTokens} />
      }
    </>
  );
};

export default Home;
