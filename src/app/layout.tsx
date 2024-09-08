import "@/style/global.scss";
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import Header from "./(components)/header";

// 메타데이터 설정
export const metadata: Metadata = {
  title: "Maro Webtoons",
  description: "Maro Webtoons List Page",
  metadataBase: new URL("https://maro-webtoons.vercel.app"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Maro Webtoons",
    siteName: "Maro Webtoons",
    url: "https://maro-webtoons.vercel.app",
    description: "Maro Webtoons List Page",
    images: "/tumb.jpg",
    type: "website",
  },
};

// 폰트 IBM_Plex_Sans 설정
const IBM = IBM_Plex_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={IBM.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
