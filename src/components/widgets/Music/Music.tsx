"use client";

import React, { useState } from 'react';

type PlaylistMode = 'Deep Work' | 'Relaxation' | 'Creativity';

interface Playlist {
  mode: PlaylistMode;
  url: string;
}

const PLAYLISTS: Record<PlaylistMode, string[]> = {
  'Deep Work': [
    'https://open.spotify.com/album/4sANiExFTzMwtbhIT9SZrC?si=QCJhse4rQmSoYSiN_uFcrw',
    'https://open.spotify.com/album/526GOHUzH201xPsVWgBi1s?si=zAwveLp_QGWJNJ8VY1Q0QQ',
    'https://open.spotify.com/album/1KDNF2N9RbbEyw7kWVmj9V?si=TvYPG_IFSjCTQOiEZ5JfUQ'
  ],
  'Relaxation': [
    'https://open.spotify.com/album/0OtxwXVf6VDR4syzmzIrh6?si=G3NcNdIWT3yqla6Uiud7yQ',
    'https://open.spotify.com/album/37FrBfOD8zEr4C3CyVijAp?si=EMapY7HQRBSkEg3KNLTqcg',
    'https://open.spotify.com/album/5UdtXABO5pQswvLhTHaMiU?si=aDAJ9KWkTgWKe16tsszgug'
  ],
  'Creativity': [
    'https://open.spotify.com/album/4fNR90EHhg4dWKCkmiqcZW?si=7GKDppVRS_O8MBowAaxxKA',
    'https://open.spotify.com/album/3g7XNBeCVOZiBx325CvbR1?si=ISNIy_lNSUypaw8pdgXgaA',
    'https://open.spotify.com/album/2bGFYmo7x3urPPYn9QQ4qU?si=v0mwbSZEQXKtQrxkAR_nAQ'
  ]
};

const FocusPlaylistRandomizer: React.FC = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  const generatePlaylist = () => {
    const modes = Object.keys(PLAYLISTS) as PlaylistMode[];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    const modePlaylists = PLAYLISTS[randomMode];
    const randomPlaylist = modePlaylists[Math.floor(Math.random() * modePlaylists.length)];
    
    setCurrentPlaylist({ mode: randomMode, url: randomPlaylist });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Focus Playlist Randomizer
      </h2>

      <div className="flex flex-col items-center space-y-4">
        {currentPlaylist && (
          <div className="w-full space-y-3">
            <div className="text-center">
              <span className="text-lg font-semibold text-gray-700">
                Mode: {currentPlaylist.mode}
              </span>
            </div>

            <iframe
              src={currentPlaylist.url.replace('https://open.spotify.com/playlist/', 'https://open.spotify.com/embed/playlist/')}
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="encrypted-media"
              className="rounded-lg"
              title="Spotify Playlist"
            />

            <div className="flex justify-center">
              <a 
                href={currentPlaylist.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Open Full Playlist
              </a>
            </div>
          </div>
        )}

        <button 
          onClick={generatePlaylist} 
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Playlist
        </button>
      </div>
    </div>
  );
};

export default FocusPlaylistRandomizer;