import React from 'react';
import { ArrowUp, Heart, Sparkles, Flame, Shield, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06070a] border-t border-red-950/70 pt-16 pb-28 sm:pb-24 relative overflow-hidden text-slate-400">
      
      {/* Decorative top red gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./images/logo.png"
                alt="Cheff Market Digital"
                className="h-12 w-auto object-contain"
              />
              <div>
                <span className="font-['Creepster'] text-xl text-red-500 tracking-wider">
                  DEL TERROR
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Tribu TI Digital
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Proyecto creado con pasión, sangre culinaria y creatividad desbordante para el Concurso de Halloween 2026. ¡El mejor squad de ingeniería y gastronomía siniestra!
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-300 font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                28 Integrantes en Acción
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                CursedPay Seguro
              </span>
            </div>
          </div>

          {/* Col 2: Secciones */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-red-400 transition">
                  Inicio del Averno
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-red-400 transition">
                  Mercado Maldito (Frutas & Carnes)
                </a>
              </li>
              <li>
                <a href="#squad" className="hover:text-red-400 transition">
                  Los 28 Chefs de la Tribu TI
                </a>
              </li>
              <li>
                <a href="#soundtrack" className="hover:text-red-400 transition">
                  Banda Sonora de Halloween (9 Tracks)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Concurso & Voto */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Concurso Halloween 2026
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Participación oficial en la categoría temática de Marketplace Digital Gastronómico.
            </p>
            <div className="pt-1">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 hover:border-red-500/50 transition"
              >
                <ArrowUp className="w-4 h-4 text-red-400" />
                <span>Subir a la cima</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>por la Tribu TI Digital para ganar el concurso</span>
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AngelQS/cheff-market-digital"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
            >
              <Code2 className="w-4 h-4 text-red-500" />
              <span>Repositorio en GitHub</span>
            </a>
            <span>•</span>
            <span className="text-slate-400">© 2026 Cheff Market Digital del Terror</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
