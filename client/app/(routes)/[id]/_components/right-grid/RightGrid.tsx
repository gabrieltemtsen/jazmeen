'use client';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
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

interface DeployResponse {
  success: boolean;
  contractAddress?: string;
  transactionHash?: string;
  webUrl?: string;
  error?: string;
}

const RightGrid: React.FC<RightGridProps> = ({ token }) => {
  const [response, setResponse] = useState<DeployResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);

    const formData = {
      name: token.name,
      symbol: token.symbol,
      fid: token.initiatorFid,
      url: token.imageUrl,
    };

    try {
      const res = await axios.post<DeployResponse>('/api/deploy', formData);
      setResponse(res.data);
      console.log(response);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<DeployResponse>;
      setError(axiosError.response?.data?.error || 'Failed to deploy contract');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 p-4 overflow-hidden" style={{ borderRadius: '20px' }}>
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
      <CustomButton
        label={loading ? "Deploying..." : "Deploy"}
        className="w-full mt-3"
        onClick={handleDeploy}
        disabled={loading}
      />
      <CustomButton label="Connect Wallet" className="w-full mt-3" />
      {/* {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )} */}
      {error && (
        <div>
          <p className='text-red-500 text-xs mt-1'>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RightGrid;
