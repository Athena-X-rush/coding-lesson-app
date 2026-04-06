import React, { createContext, useContext, useState, useCallback } from 'react';

const SoundContext = createContext();

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
};

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Create sounds using Web Audio API
  const createSound = useCallback((frequency, duration, type = 'sine') => {
    if (isMuted) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [isMuted, volume]);

  // Victory sound - triumphant fanfare
  const playVictorySound = useCallback(() => {
    if (isMuted) return;
    
    const notes = [523, 659, 784, 1047]; // C, E, G, High C
    const delays = [0, 0.1, 0.2, 0.3];
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        createSound(note, 0.3, 'sine');
      }, delays[index] * 1000);
    });
  }, [createSound, isMuted]);

  // Level up sound - ascending arpeggio
  const playLevelUpSound = useCallback(() => {
    if (isMuted) return;
    
    const notes = [523, 659, 784, 1047, 1319]; // C, E, G, High C, High E
    notes.forEach((note, index) => {
      setTimeout(() => {
        createSound(note, 0.2, 'triangle');
      }, index * 100);
    });
  }, [createSound, isMuted]);

  // Success sound - positive chime
  const playSuccessSound = useCallback(() => {
    if (isMuted) return;
    
    createSound(800, 0.1, 'sine');
    setTimeout(() => createSound(1000, 0.1, 'sine'), 50);
  }, [createSound, isMuted]);

  // Error sound - low buzz
  const playErrorSound = useCallback(() => {
    if (isMuted) return;
    
    createSound(200, 0.2, 'sawtooth');
  }, [createSound, isMuted]);

  // Click sound - short tap
  const playClickSound = useCallback(() => {
    if (isMuted) return;
    
    createSound(1000, 0.05, 'square');
  }, [createSound, isMuted]);

  // Battle start sound - dramatic
  const playBattleStartSound = useCallback(() => {
    if (isMuted) return;
    
    createSound(150, 0.3, 'sawtooth');
    setTimeout(() => createSound(200, 0.3, 'sawtooth'), 100);
  }, [createSound, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const value = {
    isMuted,
    volume,
    setVolume,
    toggleMute,
    playVictorySound,
    playLevelUpSound,
    playSuccessSound,
    playErrorSound,
    playClickSound,
    playBattleStartSound,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
