import React from 'react';
import { useApp } from '../context/AppContext';

export const CompareModal = () => {
  const { isCompareOpen, setIsCompareOpen, compareList, toggleCompare, navigateTo } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-surface-container-lowest border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">compare_arrows</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile text-on-surface">
              Movie Comparison
            </h2>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {compareList.length < 2 ? (
          <div className="py-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 text-primary opacity-50">movie_edit</span>
            <p className="font-body-md text-lg">Select 2 movies to compare side-by-side.</p>
            <p className="font-label-sm text-xs mt-1 opacity-70">Currently {compareList.length} movie selected.</p>
          </div>
        ) : (
          <div className="overflow-y-auto py-6 space-y-6">
            <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
              {compareList.map(movie => (
                <div key={movie.id} className="flex flex-col items-center text-center">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-36 h-52 object-cover rounded-lg border border-white/10 shadow-xl mb-3"
                  />
                  <h3 className="font-title-md text-xl text-on-surface mb-1">{movie.title}</h3>
                  <button
                    onClick={() => toggleCompare(movie)}
                    className="text-xs text-error hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">remove_circle</span> Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4 font-body-md">
              <div className="grid grid-cols-3 py-2 border-b border-white/5">
                <span className="font-label-sm text-on-surface-variant uppercase">IMDb Rating</span>
                <span className="font-bold text-primary text-center">⭐ {compareList[0].rating}</span>
                <span className="font-bold text-primary text-center">⭐ {compareList[1].rating}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-white/5">
                <span className="font-label-sm text-on-surface-variant uppercase">Duration</span>
                <span className="text-center">{compareList[0].duration}</span>
                <span className="text-center">{compareList[1].duration}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-white/5">
                <span className="font-label-sm text-on-surface-variant uppercase">Genre</span>
                <span className="text-center">{compareList[0].genre.join(', ')}</span>
                <span className="text-center">{compareList[1].genre.join(', ')}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-white/5">
                <span className="font-label-sm text-on-surface-variant uppercase">Formats</span>
                <span className="text-center text-xs">{compareList[0].formats.join(' • ')}</span>
                <span className="text-center text-xs">{compareList[1].formats.join(' • ')}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-white/5">
                <span className="font-label-sm text-on-surface-variant uppercase">Director</span>
                <span className="text-center">{compareList[0].director}</span>
                <span className="text-center">{compareList[1].director}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => { setIsCompareOpen(false); navigateTo('movie-details', compareList[0]); }}
                className="w-full py-3 bg-primary-container text-on-primary-container font-label-sm rounded-lg hover:bg-primary hover:text-on-primary transition-colors uppercase tracking-wider"
              >
                Book {compareList[0].title}
              </button>
              <button
                onClick={() => { setIsCompareOpen(false); navigateTo('movie-details', compareList[1]); }}
                className="w-full py-3 bg-primary-container text-on-primary-container font-label-sm rounded-lg hover:bg-primary hover:text-on-primary transition-colors uppercase tracking-wider"
              >
                Book {compareList[1].title}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
