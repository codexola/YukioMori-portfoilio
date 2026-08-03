import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "森 幸夫 | Mori Yukio — Full-Stack & AI Engineer / Technical Lead",
  description:
    "森幸夫のポートフォリオ。FinTech・GovTech・SaaS・生成AI領域で8年以上の実務経験を持つフルスタックエンジニア／AIエンジニア／テクニカルリード。",
  metadataBase: new URL("https://mori-yukio-portfolio.vercel.app"),
  openGraph: {
    title: "森 幸夫 | Mori Yukio — Full-Stack & AI Engineer",
    description:
      "FinTech・GovTech・SaaS・生成AI領域で8年以上の実務経験を持つフルスタックエンジニア／AIエンジニア／テクニカルリード。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.variable} ${notoSansJP.variable} washi-texture antialiased`}>
        {children}
      </body>
    </html>
  );
}
