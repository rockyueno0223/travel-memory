import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/layouts/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Travel Memory",
  description: "Save your beautiful travels memories. Create account and save your photos of your travels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className="bg-background text-foreground font-barlow">
        <Header/>
        <main className="max-w-screen-xl mx-auto min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
