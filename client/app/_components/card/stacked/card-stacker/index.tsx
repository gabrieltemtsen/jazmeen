import React, { SetStateAction, useState } from 'react';
import { TokenItem } from '@/app/context/token';
import CardFlipper from '../card-flipper';

interface CardStackerProps {
  data: TokenItem[];
}
const CardStacker = ({ data }: CardStackerProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative flex justify-center items-center py-16 px-6 ">
      {data.map((eachData, index) => {
        // Calculate vertical position based on index
        let translateY = "0px";
        if (index === 1 || index === 3) {
          translateY = "-20px"; // 2nd and 4th cards elevated
        } else if (index === 2) {
          translateY = "-40px"; // Middle card most elevated
        }

        // Set z-index: highest (10) when hovered, otherwise based on position
        const zIndex = hoveredIndex === index ? 10 : index === 2 ? 5 : index === 1 || index === 3 ? 4 : 3;

        return (
          <div
            key={index}
            className="relative mt-4"
            style={{
              transform: `translateY(${translateY})`,
              zIndex: zIndex,
              marginLeft: index !== 0 ? '-32px' : '0',
              transition: 'z-index 0ms' // Instant z-index change
            }}
            onMouseEnter={() => setHoveredIndex(index as unknown as SetStateAction<null>)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardFlipper
              eachData={eachData}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardStacker;