import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'PEACH FLOWERS',
  description: 'Flores que transformam momentos em memórias.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>
          <div className="min-h-screen bg-cream text-brown">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
