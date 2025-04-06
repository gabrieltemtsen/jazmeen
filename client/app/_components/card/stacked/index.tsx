import React, { useState, useEffect } from 'react';
import CardStacker from './card-stacker';
import { handleResize } from '@/app/utils/handleResize';
import { TokenItem } from '@/app/context/token';
import "./style.css";

interface TokenCardsProps {
  filteredTokens: TokenItem[];
}

const TokenCards = ({ filteredTokens }: TokenCardsProps) => {
  const [chunkSize, setChunkSize] = useState(5);

  useEffect(() => {
    const resizeHandler = () => handleResize(setChunkSize);

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const chunkedData = chunkArray(filteredTokens, chunkSize);

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center">
      {chunkedData.map((chunk, index) => (
        <div key={`card-stacker-${index}`} className="mb-8">
          <CardStacker
            data={chunk}
          />
        </div>
      ))}
    </div>
  );
};

export default TokenCards;

// Function to chunk an array into groups of specified size
 const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
