/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/deploy/route.ts
import { deploySmartContract } from '@/app/lib/deployJazmeen';
import { NextResponse } from 'next/server';

interface RequestBody {
  name: string;
  symbol: string;
  fid: string;
  url: string;

}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: RequestBody = await request.json();
    const { name, symbol, url, fid } = body;

    // Validate parameters
    if (!name || !symbol || !url || !fid) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const result = await deploySmartContract({ name, symbol, url, fid });

    if (result.success) {
      return NextResponse.json({
        contractAddress: result.contractAddress,
        transactionHash: result.transactionHash,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}