import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { MusicTrack } from '../types';
import { MUSIC_TRACKS } from '../data/musicTracks';

interface AudioContextType {
  tracks: MusicTrack[];
  currentTrackIndex: number;
  currentTrack: MusicTrack;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isPlaylistOpen: boolean;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (percent: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  togglePlaylist: () => void;
  formatTime: (sec: number) => string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<MusicTrack[]>(MUSIC_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      // Auto advance to next song
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handleError = (e: Event) => {
      console.warn('Audio playback notice:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [tracks.length]);

  // Handle track source update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    audio.src = currentTrack.file;
    audio.load();

    if (wasPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback prevented by browser autoplay policy:', err);
      });
    }
  }, [isPlaying]);

  const playTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTrackIndex(index);
    // audio.src will be updated in useEffect, then we start playback
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }, 50);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const newTime = (percent / 100) * audio.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen((prev) => !prev);
  }, []);

  const formatTime = (sec: number) => {
    if (isNaN(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <AudioContext.Provider
      value={{
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
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
