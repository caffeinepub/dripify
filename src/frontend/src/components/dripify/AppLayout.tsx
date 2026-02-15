import type { ReactNode } from 'react';
import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'dripify-app';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/dripify-bg-texture.dim_2048x2048.png)',
          backgroundSize: '512px 512px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {children}

        <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                © {currentYear} Dripify. Built with ❤️ using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 transition-colors"
                >
                  caffeine.ai
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiX className="w-4 h-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
