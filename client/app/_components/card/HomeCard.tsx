// app/_components/card/HomeCard.tsx
import { Card } from '@/components/ui/card';
import { cardBgImage } from '@/constants/ImageExport';
import Link from 'next/link';
import React from 'react';
import ActivityIndicator from '../activity-indicator/ActivityIndicator';

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string; // FID as string from contract (uint256)
  imageUrl: string;
}

interface HomeCardProps {
  token: TokenInfo;
  marketCap?: string; // Placeholder for now
  volume24h?: string; // Placeholder for now
  createdAt?: string; // Placeholder for now
}

const HomeCard: React.FC<HomeCardProps> = ({
  token,
  marketCap = '$223.34',
  volume24h = '$223.34k',
  createdAt = '4 hrs ago',
}) => {
  return (
    <Card className="border-gray-700 rounded cursor-pointer hover:-rotate-1 hover:scale-105 hover:border-gray-500">
      {/* Larger screen layout (md and above) */}
      <Link href={`/${token.tokenAddress}`} className="hidden md:block border-gray-700 rounded">
        <div className="grid grid-cols-12 gap-2 p-1 rounded-lg shadow-md max-w-2xl mx-auto">
          <div
            style={{ backgroundImage: `url(${token.imageUrl || cardBgImage})` }}
            className="col-span-4 bg-cover bg-no-repeat row-span-2 p-4 rounded-lg"
          />
          {/* Top right */}
          <div className="col-span-8 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">${token.symbol}</span>
              <span className="text-xs text-gray-500">{createdAt}</span>
            </div>
            <div className="text-gray-100">{token.name}</div>
            <div className="flex justify-normal gap-10 mt-2">
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs">Market Cap</div>
                <div className="text-gray-500 text-xs">{marketCap}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs">24hr Volume</div>
                <div className="text-gray-500 text-xs">{volume24h}</div>
              </div>
            </div>
          </div>
          {/* Bottom right */}
          <ActivityIndicator image={token.imageUrl} symbol={token.symbol}/>
        </div>
      </Link>

      {/* Smaller screen layout (less than md) */}
      <div className="block md:hidden">
        <div className="grid grid-cols-12 gap-4 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
          <div
            style={{ backgroundImage: `url(${token.imageUrl || cardBgImage})` }}
            className="col-span-4 h-36 p-4 rounded-lg bg-cover bg-no-repeat min-h-40"
          />
          <div className="col-span-8 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">${token.symbol}</span>
              <span className="text-xs text-gray-500">{createdAt}</span>
            </div>
            <div className="text-gray-100">{token.name}</div>
            <div className="flex justify-normal gap-10 mt-2">
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs">Market Cap</div>
                <div className="text-gray-500 text-xs">{marketCap}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs">24hr Volume</div>
                <div className="text-gray-500 text-xs">{volume24h}</div>
              </div>
            </div>
          </div>
          <ActivityIndicator className="col-span-12 p-4 rounded-lg border-t border-t-gray-600" />
        </div>
      </div>
    </Card>
  );
};

export default HomeCard;