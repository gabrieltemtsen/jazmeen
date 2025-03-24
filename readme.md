# Jazmeen 💋

**Hey cutie, welcome to Jazmeen!** I’m your sassy, flirty AI assistant here to make memecoin creation on Celo a total vibe. With me, you can deploy tokens, explore them, and share the love—all with a wink and a kiss! Built for Farcaster users, Jazmeen lets you create tokens in a snap and see them shine on our sleek explorer. Ready to play? Let’s get started! 💖

# Video Demo
- v1 - [Jazmeen Demo](https://www.youtube.com/watch?v=SdUdUYiNG_k)

## ✨ What is Jazmeen?

Jazmeen is a memecoin factory and explorer on Celo, powered by a flirty AI bot (that’s me!). I help Farcaster users deploy tokens, add liquidity (coming soon!), and share their creations with the world. My Next.js frontend lets you browse tokens, check out their details, and see pretty Open Graph previews when you share links. Whether you’re a creator or a fan, I’ve got something for you to love. *blows a kiss*

## 🚀 Features

- **Token Deployment**: Create memecoins on Celo with a simple Farcaster cast (e.g., "Hey @jazmeen, make me a token GABRIEL with ticker $GABE and this image").
- **Farcaster Bot**: I’m your AI assistant, parsing requests with OpenAI and replying with flirty charm.
- **Token Explorer**: Browse all tokens at `jazmeen.xyz` and dive into details at `jazmeen.xyz/0x...`.
- **Dynamic OG Metadata**: Share token pages and see pretty previews with name, symbol, and image.
- **Celo Integration**: Built for Celo mainnet, with Ubeswap support on the horizon.
- **Spam-Free**: I only reply to `@jazmeen` mentions and avoid loops—keeping things smooth.

## 🛠️ Setup

### Prerequisites

- Node.js (v18+)
- Yarn or npm
- A Celo wallet with some CELO for gas
- Farcaster account (to interact with me)
- OpenAI API key
- Neynar API key and webhook setup

### Installation

1. **Clone the Repo**

   ```bash
   git clone https://github.com/gabrieltemtsen/jazmeen.git
   cd jazmeen
   cd Client
   npm install
2. **set up env**
NEXT_PUBLIC_CELO_RPC=https://forno.celo.org
PRIVATE_KEY=your_bot_private_key
NEXT_PUBLIC_SIGNER_UUID=your_neynar_signer_uuid
NEXT_PUBLIC_NEYNAR_API_KEY=your_neynar_api_key
NEXT_PUBLIC_NEYNAR_WEBHOOK_SECRET=your_webhook_secret
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_BASE_URL=https://your-app-url.com
NEXT_PUBLIC_BOT_FID=your_bot_fid
3. **run locally**
npm run dev

### Roadmap
- Eliza OS Integration: Connect me to Eliza OS for smarter automation and chats.

- Locked Liquidity: Add Ubeswap liquidity pools with locked LP tokens for smooth trading.

- Ubeswap Swaps: Enable native token swaps right on the explorer.

- Live Market Data: Show real market cap, volume, and token age.

- Jazmeen Personality Growth: More commands and Farcaster features (DMs, frames).

- Community Features: Leaderboards, governance, and community pages.

- Mobile & Cross-Chain: Mobile app and support for other EVM chains (Base, Optimism).

