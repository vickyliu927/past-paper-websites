import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { client } from "../../lib/sanity";
import { getHeaderQuery } from "../../lib/queries";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Expert CIE A-Level Study Notes | TutorChoose",
  description: "Comprehensive notes and resources tailored for Cambridge International A-Level students to achieve academic excellence. Expert study materials for Biology, Chemistry, Physics, Mathematics, and more.",
  keywords: "A-Level notes, CIE study materials, Cambridge International, tutoring, past papers, study guides",
  authors: [{ name: "TutorChoose" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

async function getHeader() {
  const header = await client.fetch(getHeaderQuery);
  return header;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = await getHeader();

  return (
    <html lang="en" className={`${lexend.variable} font-sans antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header data={header} />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
