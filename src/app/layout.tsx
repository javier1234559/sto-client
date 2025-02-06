import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/provider/ClientProvider";
import "@interchain-ui/react/styles";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Cosmos Wallet App",
  description: "Interact with Cosmos chains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ClientProvider>{children}</ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
