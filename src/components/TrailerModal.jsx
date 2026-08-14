import React from 'react';
import { useApp } from '../context/AppContext';

export const TrailerModal = () => {
  const { trailerUrl, setTrailerUrl, selectedMovie } = useApp();

  if (!trailerUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl bg-surface-container-lowest rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">play_circle</span>
            <h3 className="font-headline-lg-mobile text-lg text-on-surface">
              {selectedMovie?.title ? `${selectedMovie.title} — Official Trailer` : 'Movie Trailer'}
            </h3>
          </div>
          <button
            onClick={() => setTrailerUrl(null)}
            className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={trailerUrl}
            title="Movie Trailer"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
