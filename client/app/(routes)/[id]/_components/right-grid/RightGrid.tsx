// app/[id]/_components/right-grid/RightGrid.tsx
import React from 'react';
import RowOne from './row-one/RowOne';
import ActivityIndicator from '@/app/_components/activity-indicator/ActivityIndicator';
import BuyAndSell from './buy-and-sell/BuyAndSell';
import FromCard from '@/app/_components/card/FromCard';
import ToCard from '@/app/_components/card/ToCard';
import CustomButton from '@/app/_components/custom-button/CustomButton';

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

interface RightGridProps {
  token: TokenInfo;
}

const RightGrid: React.FC<RightGridProps> = ({ token }) => {
  return (
    <div className="flex flex-col">
      <RowOne token={token} />
      <div>
        <ActivityIndicator
          className="t border-none m-0 -ml-2"
          symbol={token.symbol}
          image={token.imageUrl}
        />
      </div>
      <BuyAndSell /> {/* Add token props later */}
      <FromCard />   {/* Add token props later */}
      <ToCard />     {/* Add token props later */}
      <CustomButton label="Connect Wallet" className="w-full mt-3" />
    </div>
  );
};

export default RightGrid;