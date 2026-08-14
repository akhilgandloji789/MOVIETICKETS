import React from 'react';
import { useApp } from '../context/AppContext';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, movies, navigateTo } = useApp();

  if (!isSearchOpen) return null;

  const filteredMovies = searchQuery.trim() === '' ? [] : movies.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 bg-surface-container-high rounded-full px-5 py-3 border border-white/10 focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-primary text-xl">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, actors, directors, genres..."
            autoFocus
            className="bg-transparent border-none focus:ring-0 text-on-surface font-body-md text-base w-full outline-none placeholder:text-on-surface-variant/50"
          />
          <button
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
            className="text-on-surface-variant hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Suggestions Dropdown */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {searchQuery.trim() === '' ? (
            <div className="py-6 text-center text-on-surface-variant">
              <p className="font-label-sm text-xs uppercase tracking-widest mb-2 opacity-60">Popular Searches</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Dune', 'Elias Thorne', 'Sci-Fi', 'IMAX 2D', 'Action'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-surface-container rounded-full text-xs hover:border-primary border border-white/5 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl text-primary/50 mb-2">search_off</span>
              <p>No movies or talent found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-label-sm text-xs text-primary uppercase tracking-widest px-3 py-1">
                Found {filteredMovies.length} matching titles
              </p>
              {filteredMovies.map(movie => (
                <div
                  key={movie.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    navigateTo('movie-details', movie);
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-surface-container-high rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/5"
                >
                  <img src={movie.poster} alt={movie.title} className="w-12 h-16 object-cover rounded-lg shrink-0" />
                  <div className="flex-grow">
                    <h4 className="font-title-md text-base text-on-surface">{movie.title}</h4>
                    <p className="font-label-sm text-xs text-on-surface-variant">
                      {movie.genre.join(', ')} • {movie.director}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-label-sm text-xs">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span>{movie.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
