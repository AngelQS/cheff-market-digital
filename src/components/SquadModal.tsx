import React from 'react';
import { X, Skull, Award, Swords, MessageSquareQuote, ShieldAlert } from 'lucide-react';
import { SquadMember } from '../types';

interface SquadModalProps {
  member: SquadMember | null;
  onClose: () => void;
}

export const SquadModal: React.FC<SquadModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-start sm:items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#0f101b] rounded-3xl border border-slate-200 dark:border-red-800/70 shadow-2xl shadow-black/60 dark:shadow-red-950 overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ficha"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-red-600 text-white transition border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Portrait Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow">
              <Skull className="w-3.5 h-3.5" />
              Nivel de Terror: {member.terrorLevel}%
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {member.name}
            </h2>
            <p className="text-xs sm:text-sm text-red-300 font-semibold">
              {member.role} • {member.squadTeam}
            </p>
          </div>
        </div>

        {/* Content Dossier */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
          
          {/* Quote */}
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-red-950/30 border border-rose-200 dark:border-red-900/50 flex items-start gap-3">
            <MessageSquareQuote className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 font-medium">
              {member.quote}
            </p>
          </div>

          {/* Specialty Dish */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Plato Especial del Chef</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {member.specialtyDish}
            </p>
          </div>

          {/* Weapon */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              <Swords className="w-4 h-4" />
              <span>Arma Culinaria Favorita</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {member.weapon}
            </p>
          </div>

          {/* Curse Factor */}
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Factor de Maldición TI</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {member.curseFactor}
            </p>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition"
            >
              Cerrar Ficha Tenebrosa
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
