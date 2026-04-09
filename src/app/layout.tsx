import type { Metadata } from "next";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: "NBA Game Picker",
  description: "NBA 경기 데이터를 기반으로 오늘 가장 볼 만한 경기를 추천하는 서비스",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ko">
      <body>
      <PwaRegister />
      {children}
      </body>
      </html>
  );
}