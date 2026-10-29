import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { SquadSection } from './components/SquadSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MusicPlayer } from './components/MusicPlayer';
import { SpookyAtmosphere } from './components/SpookyAtmosphere';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';

export function App() {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <AudioProvider>
        <CartProvider>
          <div className="min-h-screen relative selection:bg-red-600 selection:text-white transition-colors duration-300">
            {/* Subtle Ambient Spooky Bats & Atmosphere */}
            <SpookyAtmosphere />

            {/* Sticky Navigation */}
            <Navbar onNavigate={handleNavigate} />

            {/* Main Marketplace Content */}
            <main>
              <Hero
                onExplore={() => handleNavigate('catalog')}
                onMeetSquad={() => handleNavigate('squad')}
              />

              <ProductCatalog />

              <SquadSection />
            </main>

            {/* Cart Drawer */}
            <CartDrawer />

            {/* Fake Payment Gateway Modal */}
            <CheckoutModal />

            {/* Spotify-style Halloween Music Player */}
            <MusicPlayer />

            {/* Footer */}
            <Footer />
          </div>
        </CartProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
