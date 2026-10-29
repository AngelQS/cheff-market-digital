import React, { useState, useMemo } from 'react';
import { Skull, Swords, Search, Flame, Users, Sparkles } from 'lucide-react';
import { SquadMember } from '../types';
import { SQUAD_MEMBERS } from '../data/squadMembers';
import { SquadModal } from './SquadModal';

export const SquadSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchChef, setSearchChef] = useState<string>('');
  const [activeChef, setActiveChef] = useState<SquadMember | null>(null);

  const groups = [
    { id: 'all', label: 'Todos los Chefs (28)' },
    { id: 'lead', label: 'Liderazgo & Tech Leads' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & Data' },
    { id: 'devops', label: 'DevOps & SRE' },
    { id: 'security', label: 'QA & Seguridad' },
  ];

  const filteredChefs = useMemo(() => {
    return SQUAD_MEMBERS.filter((chef) => {
      // Group filter
      if (selectedGroup === 'lead') {
        if (!chef.role.toLowerCase().includes('lead') && 
            !chef.role.toLowerCase().includes('head') && 
            !chef.role.toLowerCase().includes('owner') &&
            !chef.role.toLowerCase().includes('scrum') &&
            !chef.role.toLowerCase().includes('engineer & judge')) return false;
      } else if (selectedGroup === 'frontend') {
        if (!chef.role.toLowerCase().includes('frontend') && 
            !chef.role.toLowerCase().includes('mobile') && 
            !chef.role.toLowerCase().includes('ui')) return false;
      } else if (selectedGroup === 'backend') {
        if (!chef.role.toLowerCase().includes('backend') && 
            !chef.role.toLowerCase().includes('database') && 
            !chef.role.toLowerCase().includes('data') && 
            !chef.role.toLowerCase().includes('api') &&
            !chef.role.toLowerCase().includes('kafka') &&
            !chef.role.toLowerCase().includes('middleware')) return false;
      } else if (selectedGroup === 'devops') {
        if (!chef.role.toLowerCase().includes('devops') && 
            !chef.role.toLowerCase().includes('cloud') && 
            !chef.role.toLowerCase().includes('reliability') &&
            !chef.role.toLowerCase().includes('chaos') &&
            !chef.role.toLowerCase().includes('backup')) return false;
      } else if (selectedGroup === 'security') {
        if (!chef.role.toLowerCase().includes('qa') && 
            !chef.role.toLowerCase().includes('seguridad') && 
            !chef.role.toLowerCase().includes('pentesting') &&
            !chef.role.toLowerCase().includes('cybersecurity') &&
            !chef.role.toLowerCase().includes('observability')) return false;
      }

      // Text search
      if (searchChef.trim()) {
        const query = searchChef.toLowerCase();
        const matchName = chef.name.toLowerCase().includes(query);
        const matchRole = chef.role.toLowerCase().includes(query);
        const matchTeam = chef.squadTeam.toLowerCase().includes(query);
        const matchDish = chef.specialtyDish.toLowerCase().includes(query);
        if (!matchName && !matchRole && !matchTeam && !matchDish) return false;
      }

      return true;
    });
  }, [selectedGroup, searchChef]);

  return (
    <section id="squad" className="py-20 bg-gradient-to-b from-white via-rose-50/40 to-white dark:from-[#090A0F] dark:via-[#10121d] dark:to-[#090A0F] border-t border-rose-200 dark:border-red-950/60 relative transition-colors duration-300">
      
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 dark:bg-red-950/70 border border-rose-300 dark:border-red-700/50 text-red-700 dark:text-red-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
            <span>Tribu TI Digital • Halloween 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Los 28 Chefs del <span className="text-red-600 dark:text-red-500 font-['Creepster'] text-glow-red">Terror</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Conoce a cada uno de los integrantes del squad vestidos con sus uniformes culinarios y armados con cuchillas de precisión. ¡Nuestra tribu lista para conquistar el concurso!
          </p>
        </div>

        {/* Controls: Category Filter + Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Group Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {groups.map((grp) => {
              const active = selectedGroup === grp.id;
              return (
                <button
                  key={grp.id}
                  onClick={() => setSelectedGroup(grp.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {grp.label}
                </button>
              );
            })}
          </div>

          {/* Search Chef */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchChef}
              onChange={(e) => setSearchChef(e.target.value)}
              placeholder="Buscar por nombre o rol..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-red-500 focus:outline-none text-white text-xs placeholder-slate-500 transition"
            />
          </div>

        </div>

        {/* Squad Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredChefs.map((chef) => (
            <div
              key={chef.id}
              onClick={() => setActiveChef(chef)}
              className="group bg-white dark:bg-[#12131e] rounded-2xl border border-slate-200 dark:border-red-950/50 hover:border-red-500/70 overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl dark:hover:shadow-red-950/50 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
            >
              {/* Photo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Terror badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-red-900/50">
                  <Skull className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[11px] font-black text-red-400 font-mono">
                    {chef.terrorLevel}%
                  </span>
                </div>

                {/* Squad badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-red-950/90 text-red-200 px-2.5 py-0.5 rounded border border-red-800/40">
                    <Flame className="w-2.5 h-2.5 text-amber-400" />
                    {chef.squadTeam}
                  </span>
                </div>
              </div>

              {/* Chef Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
                    {chef.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {chef.role}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 italic">
                    {chef.quote}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate mr-2">
                    <Swords className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate text-[11px]">{chef.weapon}</span>
                  </div>

                  <span className="text-red-600 dark:text-red-400 font-bold group-hover:underline text-[11px] shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Ficha
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChefs.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No se encontró ningún chef con esa búsqueda.
          </div>
        )}

      </div>

      {/* Squad Modal Dossier */}
      <SquadModal
        member={activeChef}
        onClose={() => setActiveChef(null)}
      />

    </section>
  );
};
