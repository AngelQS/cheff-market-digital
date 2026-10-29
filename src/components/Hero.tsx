import React from 'react';
import { Flame, Sparkles, ShoppingCart, Users, Play, Skull, ShieldCheck, Zap } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface HeroProps {
  onExplore: () => void;
  onMeetSquad: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onMeetSquad }) => {
  const { togglePlay, isPlaying } = useAudio();

  return (
    <div id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-red-950/40 bg-radial-gradient">
      
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-700/50 text-red-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner animate-pulse">
            <Flame className="w-4 h-4 text-red-500 animate-bounce" />
            <span>Edición Concurso de Halloween 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-amber-400 font-bold">Tribu TI Digital</span>
          </div>

          {/* Large Logo & Creepy Title */}
          <div className="relative mb-6">
            <img 
              src="./images/logo.png" 
              alt="Cheff Market Digital del Terror" 
              className="h-28 sm:h-36 md:h-44 w-auto object-contain mx-auto drop-shadow-[0_0_35px_rgba(229,25,32,0.65)] hover:scale-105 transition-transform duration-500"
            />
            <div className="mt-2">
              <h1 className="font-['Creepster'] text-4xl sm:text-6xl md:text-7xl text-red-500 tracking-wider text-glow-red">
                DEL TERROR
              </h1>
            </div>
          </div>

          {/* Subtitle / Punchline */}
          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
            El primer marketplace gastronómico donde los <span className="text-red-600 dark:text-red-400 font-bold">28 maestros culinarios</span> de la Tribu TI Digital cocinan los manjares más sangrientos, pócimas electrizantes y frutas del inframundo.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={onExplore}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-900/50 border border-red-400/40 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Explorar Mercado Maldito</span>
            </button>

            <button
              onClick={onMeetSquad}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-slate-700/80 hover:border-red-500/50 flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5 text-orange-400" />
              <span>Ver Squad (28 Chefs)</span>
            </button>

            <button
              onClick={togglePlay}
              className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 hover:text-emerald-100 font-semibold text-base border border-emerald-700/50 flex items-center gap-2 transition"
              title="Escuchar banda sonora oficial"
            >
              <Play className={`w-4 h-4 text-emerald-400 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? 'Banda Sonora Activa 🎶' : 'Poner Música de Fondo 🎵'}</span>
            </button>
          </div>

          {/* Key Trust & Contest Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-6 border-t border-rose-200 dark:border-red-950/60 text-left">
            <div className="p-4 rounded-xl bg-white dark:bg-[#0f101a]/80 border border-slate-200 dark:border-red-950/50 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-rose-200 dark:border-red-900/40">
                <Skull className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200">28 Chefs Malditos</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fotos reales de todo el squad TI</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0f101a]/80 border border-slate-200 dark:border-red-950/50 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200">Carrito por Sesión</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Multiplataforma móvil y web</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0f101a]/80 border border-slate-200 dark:border-red-950/50 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200">Pasarela Fake 666</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Simulación real con PAN falso</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0f101a]/80 border border-slate-200 dark:border-red-950/50 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-200">Player Spotify</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">10 pistas de audio tenebrosas</p>
              </div>
            </div>
          </div>

          {/* Secret Coupon Hint Banner */}
          <div className="mt-6 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-950/40 via-purple-950/40 to-red-950/40 border border-red-800/30 text-xs text-slate-300 flex items-center justify-center gap-2">
            <span>🧙 Pócima de ahorro secreta: Usa el cupón</span>
            <code className="bg-red-900/70 text-red-200 px-2 py-0.5 rounded font-mono font-bold tracking-wider border border-red-700/60">
              SQUADTI
            </code>
            <span>en el carrito para un 20% de descuento diabólico.</span>
          </div>

        </div>
      </div>
    </div>
  );
};
