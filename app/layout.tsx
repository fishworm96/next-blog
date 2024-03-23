import type { Metadata } from "next";
import '@/css/tailwind.css'
import constantsData from "@/data/constants";
import Header from "components/Header";
import Footer from "components/Footer";

export const metadata: Metadata = {
  title: constantsData.TITLE,
  description: constantsData.DESCRIPTION,
  keywords: constantsData.KEYWORDS,
  icons: {
    icon: {
      url: constantsData.Avatar_Link
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <link rel="icon" type="image/png" href="/public/static/favicon.png"></link>
      <meta name="google-adsense-account" content="ca-pub-6299127739381139"></meta>
      <body>
        <Header />
        <div className="flex flex-col flex-1 bg-indigo-50">
          <main className='flex flex-col flex-1'>
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
