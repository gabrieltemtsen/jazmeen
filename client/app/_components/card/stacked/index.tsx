// App.tsx

import React, { useState, useEffect } from 'react';
import CardStacker from './card-stacker';
import { handleResize } from '@/app/utils/handleResize';
import { chunkArray } from '@/app/utils/general';
import { Img1, Img2, Img3, Img4, Img5 } from '@/constants/ImageExport';
import { TokenItem } from '@/app/context/token';
import "./style.css";

interface TokenCardsProps {
  filteredTokens: TokenItem[];
}
const TokenCards = ({ filteredTokens }: TokenCardsProps) => {
  const data = [
    {
      title: 'Kirby',
      subtitle: 'Star Allies',
      rating: '4.7',
      image: Img1,
    },
    {
      title: 'Mario',
      subtitle: 'Super Bros',
      rating: '4.8',
      image: Img2,
    },
    {
      title: 'Pokemon',
      subtitle: 'Bulbasaur',
      rating: '4.9',
      image: Img3,
    },
    {
      title: 'Sonic',
      subtitle: 'Blue Sonic',
      rating: '4.9',
      image: Img4,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      image: Img5,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      image: Img5,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      image: Img5,
    },
    {
      title: 'Pokemon',
      subtitle: 'Bulbasaur',
      rating: '4.9',
      image: Img3,
    },
    {
      title: 'Sonic',
      subtitle: 'Blue Sonic',
      rating: '4.9',
      image: Img4,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      image: Img5,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      image: Img5,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      image: Img5,
    },
  ];

  // Background colors array
  const backgroundColors = [
    { top: '#51D1F7', bottom: '#5B8FEF' },
    { top: '#F85B6B', bottom: '#E83842' },
    { top: '#28DFAB', bottom: '#26CBCF' },
    { top: '#6F3FF1', bottom: '#6E3CCA' },
    { top: '#FBDA35', bottom: '#E3A237' },
  ];

  const [chunkSize, setChunkSize] = useState(5);

  useEffect(() => {
    const resizeHandler = () => handleResize(setChunkSize);

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const chunkedData = chunkArray(data, chunkSize);

  return (
    <div className=" overflow-hidden flex flex-col items-center justify-center">
      {chunkedData.map((chunk, index) => (
        <div key={`card-stacker-${index}`} className="mb-8">
          <CardStacker
            data={chunk}
            filteredTokens={filteredTokens}
          />
        </div>
      ))}
    </div>
  );
};

export default TokenCards;
