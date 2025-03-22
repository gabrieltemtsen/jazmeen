import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { TokenProvider } from "./context/token";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jazmeen",
  description: "Your best AI DeFi tool!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <TokenProvider>
          {children}
        </TokenProvider>
      </body>
    </html>
  );
}