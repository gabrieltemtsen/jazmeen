// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';
import Web3 from 'web3';
import { JAZMEEN_FACTORY_ABI, JAZMEEN_FACTORY_ADDRESS } from '@/app/lib/contract';

export const runtime = 'edge'; // Run on Edge for faster rendering

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

async function fetchTokenData(tokenAddress: string): Promise<TokenInfo | null> {
  try {
    const web3 = new Web3(process.env.NEXT_PUBLIC_CELO_RPC || 'https://forno.celo.org');
    const contract = new web3.eth.Contract(JAZMEEN_FACTORY_ABI as any, JAZMEEN_FACTORY_ADDRESS);
    const tokens: any[] = await contract.methods.getTokens().call();

    const token = tokens.find((t: any) => t.tokenAddress.toLowerCase() === tokenAddress.toLowerCase());
    if (!token) return null;

    return {
      tokenAddress: token.tokenAddress,
      name: token.name,
      symbol: token.symbol,
      initiatorFid: token.initiatorFid.toString(),
      imageUrl: token.imageUrl,
    };
  } catch (error) {
    console.error('Error fetching token data for OG:', error);
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: 'white',
            background: '#1a1a1a',
            width: '100%',
            height: '100%',
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Jazmeen</h1>
          <p>Token not found</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  const tokenData = await fetchTokenData(address);
  if (!tokenData) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: 'white',
            background: '#1a1a1a',
            width: '100%',
            height: '100%',
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Jazmeen</h1>
          <p>Token not found</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  const { name, symbol, initiatorFid, imageUrl } = tokenData;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'white',
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          padding: '40px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Token Image */}
        <div style={{ display: 'flex', width: '300px', height: '300px', marginRight: '40px' }}>
          <img
            src={imageUrl || 'https://via.placeholder.com/300'} // Fallback image
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
            alt={`${name} token image`}
          />
        </div>

        {/* Right: Token Info */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h1 style={{ fontSize: 60, margin: 0, color: '#e879f9' }}>{name} (${symbol})</h1>
          <p style={{ fontSize: 30, margin: '10px 0', color: '#d1d5db' }}>
            Created by FID: {initiatorFid}
          </p>
          <p style={{ fontSize: 30, margin: '10px 0', color: '#d1d5db' }}>
            Market Cap: $223.34 (placeholder)
          </p>
          <p style={{ fontSize: 24, margin: '10px 0', color: '#9ca3af' }}>
            A memecoin on Celo, brought to you by Jazmeen! 💋
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}