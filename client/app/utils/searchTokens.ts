interface TokenItem {
    tokenAddress: string;
    name: string;
    symbol: string;
    initiatorFid: string;
    imageUrl: string;
  }

  export function searchItems(items: TokenItem[], query: string): TokenItem[] {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.tokenAddress.toLowerCase().includes(query.toLowerCase()) ||
      item.initiatorFid.includes(query)
    );
  }
  