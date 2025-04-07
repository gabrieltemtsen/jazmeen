'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export interface TokenItem {
  tokenAddress: string;
  name: string;
  symbol: string;
  initiatorFid: string;
  imageUrl: string;
}

export const TokenCardMinimal = ({ token }: { token: TokenItem }) => {
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className="w-64 h-full flex flex-col border rounded-xl overflow-hidden">
      <div className="h-24 dark:from-gray-800 dark:to-gray-900 relative" style={{
        background: `linear-gradient(to bottom, #1f2937, #5B8FEF)`,
      }}>
        {token.imageUrl && (
          <Image
            src={token.imageUrl}
            alt={token.name}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-16 h-16 rounded-full border-4 border-background object-cover"
            width={64} // Adjust width as needed
            height={64} // Adjust height as needed
          />
        )}
      </div>

      <CardContent className="flex flex-col items-center justify-between pt-12 pb-4 flex-1">
        <div className="text-center space-y-1">
          <h3 className="font-bold">{token.name}</h3>
          <Badge variant="secondary" className="font-mono">{token.symbol}</Badge>
        </div>

        <div className="w-full space-y-3 mt-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>FID: {token.initiatorFid}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Info className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">
              {truncateAddress(token.tokenAddress)}
            </span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
