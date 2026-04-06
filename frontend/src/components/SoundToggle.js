import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from './SoundProvider';

const SoundToggle = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isMuted 
          ? 'bg-gray-500 text-gray-300 hover:bg-gray-600' 
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

export default SoundToggle;
