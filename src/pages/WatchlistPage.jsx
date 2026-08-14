import React from 'react';
import { useApp } from '../context/AppContext';

export const WatchlistPage = () => {
  const { watchlist, movies, toggleWatchlist, navigateTo } = useApp();

  const watchlistMovies = movies.filter(m => watchlist.includes(m.id));

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-4xl text-on-surface mb-1">
            My Watchlist
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Movies you saved to watch or track availability.
          </p>
        </div>
        <span className="font-label-sm text-xs text-primary bg-primary-container/30 px-3 py-1 rounded-full border border-primary/30 font-bold">
          {watchlistMovies.length} Saved
        </span>
      </div>

      {watchlistMovies.length === 0 ? (
        <div className="py-16 text-center text-on-surface-variant glass-panel rounded-2xl">
          <span className="material-symbols-outlined text-5xl text-primary/40 mb-3">favorite_border</span>
          <h3 className="font-title-md text-lg text-on-surface mb-1">Your Watchlist is Empty</h3>
          <p className="font-body-md text-xs mb-4">Explore movies and click ❤️ to add them to your watchlist.</p>
          <button
            onClick={() => navigateTo('movies')}
            className="px-6 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg uppercase tracking-wider font-bold hover:bg-primary"
          >
            Discover Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {watchlistMovies.map(movie => (
            <div
              key={movie.id}
              className="relative rounded-xl overflow-hidden aspect-[2/3] group border border-white/10 bg-surface-dim shadow-xl"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => toggleWatchlist(movie.id)}
                className="absolute top-3 right-3 p-2 bg-primary text-on-primary rounded-full shadow-lg z-20"
                title="Remove from Watchlist"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>

              <div className="absolute inset-x-0 bottom-0 glass-panel p-4 flex flex-col justify-end border-t border-white/10">
                <h3 className="font-title-md text-base text-on-surface truncate mb-1">{movie.title}</h3>
                <p className="font-label-sm text-xs text-on-surface-variant mb-3">⭐ {movie.rating} • {movie.genre[0]}</p>
                <button
                  onClick={() => navigateTo('movie-details', movie)}
                  className="w-full py-2.5 bg-primary-container text-on-primary-container font-label-sm text-xs rounded hover:bg-primary uppercase font-bold"
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
