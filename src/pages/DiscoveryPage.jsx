import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DiscoveryPage = () => {
  const { movies, navigateTo, toggleWatchlist, watchlist, toggleCompare } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState(['Sci-Fi', 'Action']);
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [sortBy, setSortBy] = useState('Most Booked');

  const genres = ['Action', 'Sci-Fi', 'Thriller', 'Noir', 'Drama', 'Romance', 'Mystery', 'Adventure'];
  const formats = ['All', 'IMAX 2D', 'IMAX 3D', '4DX', 'Dolby Cinema', 'Standard'];

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = searchTerm === '' ||
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = selectedGenres.length === 0 ||
      movie.genre.some(g => selectedGenres.includes(g));

    const matchesFormat = selectedFormat === 'All' ||
      movie.formats.some(f => f.toLowerCase().includes(selectedFormat.toLowerCase()));

    return matchesSearch && matchesGenre && matchesFormat;
  }).sort((a, b) => {
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    if (sortBy === 'Newest Release') return new Date(b.releaseDate) - new Date(a.releaseDate);
    return b.votes - a.votes; // Most Booked default
  });

  return (
    <div className="pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
      {/* Sidebar Filters */}
      <aside className="hidden md:block col-span-3 h-[calc(100vh-160px)] sticky top-24 overflow-y-auto pr-4">
        <div className="mb-stack-md">
          <h3 className="font-title-md text-title-md text-on-surface mb-stack-sm">Discovery Filters</h3>
          <div className="h-px w-full bg-white/5"></div>
        </div>

        <div className="space-y-stack-md">
          {/* Genres */}
          <div>
            <h4 className="font-label-sm text-xs text-primary mb-4 uppercase tracking-widest">Genres</h4>
            <div className="space-y-3">
              {genres.map(genre => (
                <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                    className="form-checkbox h-4 w-4 bg-surface-container border-outline rounded text-primary focus:ring-primary focus:ring-offset-surface-container-lowest"
                  />
                  <span className="font-body-md text-sm text-on-surface group-hover:text-primary transition-colors">
                    {genre}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Formats */}
          <div>
            <h4 className="font-label-sm text-xs text-primary mb-4 uppercase tracking-widest">Format</h4>
            <div className="flex flex-wrap gap-2">
              {formats.map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-label-sm transition-colors ${
                    selectedFormat === fmt
                      ? 'border-primary text-primary bg-primary-container/30 font-bold'
                      : 'border-white/10 text-on-surface-variant hover:border-white/30'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Discovery Results */}
      <section className="col-span-1 md:col-span-9 flex flex-col gap-gutter">
        {/* Search & Sort Top Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-4 rounded-xl border border-white/5 relative z-20">
          <div className="relative w-full md:w-2/3">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies, directors, or genres..."
              className="w-full bg-surface-container-low border border-white/10 rounded-lg py-3 pl-12 pr-4 font-body-md text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-on-surface-variant/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="font-label-sm text-xs text-on-surface-variant whitespace-nowrap">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-container-low border border-white/10 rounded-lg py-2 pl-4 pr-10 font-body-md text-sm text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="Most Booked">Most Booked</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Newest Release">Newest Release</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredMovies.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant glass-panel rounded-xl">
            <span className="material-symbols-outlined text-5xl text-primary/40 mb-3">movie_off</span>
            <h3 className="font-title-md text-lg text-on-surface mb-1">No Movies Match Your Criteria</h3>
            <p className="font-body-md text-sm">Try resetting filters or searching for another title.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map(movie => (
              <div
                key={movie.id}
                className="movie-card relative group rounded-xl overflow-hidden border border-white/5 bg-surface-container-low aspect-[2/3] cursor-pointer"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                <div className="absolute top-3 right-3 flex gap-2 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie.id); }}
                    className={`p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors ${
                      watchlist.includes(movie.id) ? 'bg-primary text-on-primary' : 'bg-black/60 text-white hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">favorite</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompare(movie); }}
                    className="p-2 rounded-full bg-black/60 text-white hover:text-primary backdrop-blur-md border border-white/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">compare_arrows</span>
                  </button>
                </div>

                <div className="absolute top-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1 z-10">
                  <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-sm text-xs text-on-surface">{movie.rating}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end z-20">
                  <h3 className="font-title-md text-lg text-on-surface mb-1 truncate">{movie.title}</h3>
                  <p className="font-label-sm text-xs text-on-surface-variant mb-4">
                    {movie.genre.slice(0, 2).join(' • ')} • {movie.formats[0]}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="movie-overlay absolute bottom-0 left-0 w-full h-[48%] glass-panel border-t border-white/10 p-4 flex flex-col justify-end z-30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-sm text-xs text-on-surface-variant">{movie.duration}</span>
                    <span className="font-label-sm text-xs text-primary border border-primary px-2 py-0.5 rounded">{movie.certification}</span>
                  </div>
                  <button
                    onClick={() => navigateTo('movie-details', movie)}
                    className="w-full bg-primary text-on-primary font-body-md text-sm font-semibold py-3 rounded-lg hover:bg-primary-fixed transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
