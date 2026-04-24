import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import shopConfig from "@/shopConfig";

export const metadata = {
  title: shopConfig.shopName,
  description: shopConfig.tagline,
};

export const viewport = {
  themeColor: "#f97316",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FAFAF8] antialiased min-h-screen">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
