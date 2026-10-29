import React, { useState } from 'react';
import { ShoppingBag, Music, Volume2, VolumeX, Menu, X, Skull, Ghost, Sparkles, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { totalItems, setIsCartOpen, soundEnabled, setSoundEnabled } = useCart();
  const { isPlaying, togglePlay, currentTrack, togglePlaylist } = useAudio();
  const { toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Halloween Contest Announcement Bar */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black border-b border-red-800/40 text-xs py-1.5 px-4 text-center text-red-200 flex items-center justify-center gap-2 font-medium tracking-wide">
        <span className="flex items-center gap-1.5 animate-pulse text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>¡CONCURSO HALLOWEEN TRIBU TI DIGITAL!</span>
        </span>
        <span className="hidden sm:inline text-red-400">•</span>
        <span className="hidden sm:inline">Vota por el Squad Cheff Market Digital del Terror 🎃🔪</span>
        <span className="bg-red-700/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-500/30">
          Edición 2026
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-[#090A0F]/90 backdrop-blur-md border-b border-red-900/30 transition-all shadow-lg shadow-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo with Brand Continuity */}
            <div 
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-red-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                <img 
                  src="./images/logo.png" 
                  alt="Cheff Market Digital" 
                  className="relative h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(229,25,32,0.6)]"
                />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="font-['Creepster'] text-2xl text-red-500 tracking-wider leading-none text-glow-red group-hover:text-red-400 transition">
                  DEL TERROR
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                  Tribu TI Digital
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <button 
                onClick={() => handleNavClick('catalog')} 
                className="text-sm font-semibold text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Skull className="w-4 h-4 text-red-500" />
                Mercado Maldito
              </button>

              <button 
                onClick={() => handleNavClick('squad')} 
                className="text-sm font-semibold text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Ghost className="w-4 h-4 text-orange-500" />
                Los 28 Chefs (Squad TI)
              </button>

              <button 
                onClick={() => handleNavClick('soundtrack')} 
                className="text-sm font-semibold text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Music className="w-4 h-4 text-emerald-400" />
                Banda Sonora
              </button>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Theme Switcher Button (Blanco / Negro) */}
              <button
                onClick={toggleTheme}
                title={isDark ? "Cambiar a Tema Blanco (Quirófano)" : "Cambiar a Tema Negro (Inframundo)"}
                className="p-2.5 rounded-full bg-slate-900/80 border border-red-950/60 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition flex items-center gap-1.5 shadow-sm"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span className="hidden xl:inline text-[11px] font-bold text-amber-300">Blanco</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span className="hidden xl:inline text-[11px] font-bold text-slate-700">Negro</span>
                  </>
                )}
              </button>

              {/* Sound FX Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Efectos de sonido activados" : "Efectos de sonido silenciados"}
                className="p-2.5 rounded-full bg-slate-900/80 border border-red-950/60 text-slate-300 hover:text-red-400 hover:border-red-600/50 transition relative"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-red-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Music Player Mini Pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-800/40 text-xs text-red-200">
                <button 
                  onClick={togglePlay}
                  className="flex items-center gap-2 hover:text-white transition"
                  title={isPlaying ? "Pausar música" : "Reproducir música"}
                >
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
                  <Music className="w-3.5 h-3.5 text-red-400" />
                  <span className="max-w-[120px] truncate font-medium">
                    {currentTrack.title}
                  </span>
                </button>
                <button
                  onClick={togglePlaylist}
                  className="text-slate-400 hover:text-white text-[11px] underline pl-1"
                >
                  Playlist
                </button>
              </div>

              {/* Shopping Cart Button ("Caldero") */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-900/40 border border-red-500/40 flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline">Caldero</span>
                {totalItems > 0 && (
                  <span className="bg-white text-red-700 font-extrabold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-md animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0f17] border-b border-red-900/40 px-4 pt-3 pb-5 space-y-3">
            <button
              onClick={() => handleNavClick('catalog')}
              className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-red-950/40 hover:text-red-400 font-medium flex items-center gap-2"
            >
              <Skull className="w-4 h-4 text-red-500" />
              Mercado Maldito (Productos)
            </button>
            <button
              onClick={() => handleNavClick('squad')}
              className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-red-950/40 hover:text-red-400 font-medium flex items-center gap-2"
            >
              <Ghost className="w-4 h-4 text-orange-500" />
              Los 28 Chefs de la Tribu TI
            </button>
            <button
              onClick={() => handleNavClick('soundtrack')}
              className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-red-950/40 hover:text-red-400 font-medium flex items-center gap-2"
            >
              <Music className="w-4 h-4 text-emerald-400" />
              Banda Sonora de Halloween (10 Tracks)
            </button>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                <span>Tema: {isDark ? 'Blanco' : 'Negro'}</span>
              </button>
              <button
                onClick={togglePlay}
                className="px-3 py-1 text-xs rounded-full bg-red-800 text-white font-medium"
              >
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
