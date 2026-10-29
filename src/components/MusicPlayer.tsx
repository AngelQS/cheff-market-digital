import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  ListMusic, 
  Disc, 
  Heart, 
  ChevronUp, 
  ChevronDown,
  Flame
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const MusicPlayer: React.FC = () => {
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isPlaylistOpen,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    togglePlaylist,
    formatTime,
  } = useAudio();

  const [isLiked, setIsLiked] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(100, (clickX / width) * 100));
    seek(percent);
  };

  return (
    <>
      {/* PLAYLIST DRAWER / POPUP */}
      {isPlaylistOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-80 sm:w-96 bg-[#0c0d15] border border-red-900/70 rounded-3xl shadow-2xl shadow-black/90 p-4 backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <ListMusic className="w-5 h-5 text-red-500" />
              <h3 className="font-extrabold text-white text-sm">
                Banda Sonora del Terror TI
              </h3>
            </div>
            <button
              onClick={togglePlaylist}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {tracks.map((track, idx) => {
              const isCurrent = idx === currentTrackIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(idx)}
                  className={`p-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition ${
                    isCurrent
                      ? 'bg-red-950/70 border border-red-600/60 text-white'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-500 w-4">
                      {isCurrent && isPlaying ? (
                        <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                      ) : (
                        idx + 1
                      )}
                    </span>
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isCurrent ? 'text-red-400' : 'text-white'}`}>
                        {track.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    {track.vibes.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MINIMIZED FLOAT PILL */}
      {isMinimized ? (
        <div className="fixed bottom-4 right-4 z-40 bg-[#0f101b] border border-red-900/60 rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <span className="text-xs text-white font-bold truncate max-w-[120px]">
            {currentTrack.title}
          </span>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* FULL SPOTIFY-STYLE BOTTOM BAR */
        <div id="soundtrack" className="fixed bottom-0 left-0 right-0 z-40 bg-[#090A10]/95 backdrop-blur-xl border-t border-red-950/60 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] px-4 py-2 sm:py-3 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
            
            {/* LEFT: Track Info & Vinyl Art */}
            <div className="flex items-center gap-3 min-w-0 w-1/3 sm:w-1/4">
              <div className="relative group shrink-0">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-lg object-cover shadow-lg border border-red-900/40 ${isPlaying ? 'ring-2 ring-red-500' : ''}`}
                />
                <Disc className={`w-4 h-4 text-red-500 absolute -bottom-1 -right-1 bg-black rounded-full ${isPlaying ? 'animate-spin-slow' : ''}`} />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-white truncate hover:underline cursor-pointer">
                  {currentTrack.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 truncate flex items-center gap-1">
                  <span>{currentTrack.artist}</span>
                </p>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="hidden md:inline-block p-1 text-slate-400 hover:text-red-500 transition shrink-0"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              </button>
            </div>

            {/* CENTER: Playback Controls & Progress Bar */}
            <div className="flex-1 max-w-xl flex flex-col items-center gap-1 sm:gap-1.5">
              
              {/* Controls */}
              <div className="flex items-center gap-3 sm:gap-6">
                <button
                  onClick={prevTrack}
                  title="Pista anterior"
                  className="p-1.5 text-slate-400 hover:text-white transition active:scale-95"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  title={isPlaying ? "Pausar" : "Reproducir"}
                  className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-slate-200 text-black shadow-lg shadow-white/20 transition transform hover:scale-110 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black stroke-[3]" />
                  ) : (
                    <Play className="w-5 h-5 fill-black stroke-[3] ml-0.5" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  title="Siguiente pista"
                  className="p-1.5 text-slate-400 hover:text-white transition active:scale-95"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Progress Slider */}
              <div className="w-full flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-400">
                <span className="w-8 text-right">{formatTime(currentTime)}</span>
                
                <div
                  onClick={handleProgressBarClick}
                  className="relative flex-1 h-1.5 bg-slate-800 hover:h-2.5 rounded-full cursor-pointer transition-all group"
                >
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 group-hover:from-red-500 group-hover:to-red-400 rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
                  </div>
                </div>

                <span className="w-8">{formatTime(duration)}</span>
              </div>

            </div>

            {/* RIGHT: Equalizer, Playlist & Volume */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 w-1/3 sm:w-1/4">
              
              {/* Equalizer Wave (animated when playing) */}
              <div className="hidden lg:flex items-end gap-0.5 h-4 w-6 px-1">
                <span className={`w-1 bg-red-500 rounded-full transition-all duration-200 ${isPlaying ? 'h-4 animate-pulse' : 'h-1'}`} />
                <span className={`w-1 bg-red-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse delay-100' : 'h-1'}`} />
                <span className={`w-1 bg-red-600 rounded-full transition-all duration-150 ${isPlaying ? 'h-4 animate-pulse delay-75' : 'h-1'}`} />
              </div>

              {/* Playlist drawer toggle button */}
              <button
                onClick={togglePlaylist}
                title="Ver lista de pistas (7 canciones)"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <ListMusic className="w-4 h-4 text-red-500" />
                <span className="hidden xl:inline">Pistas (7)</span>
              </button>

              {/* Volume Slider (desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 sm:w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>

              {/* Minimize toggle */}
              <button
                onClick={() => setIsMinimized(true)}
                title="Minimizar reproductor"
                className="p-1 text-slate-500 hover:text-white"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
