import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Efeito Web — Presença digital que gera resultado",
  description: "Sites estratégicos, responsivos e memoráveis para empresas que querem ser encontradas, transmitir autoridade e conquistar oportunidades.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
