import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HomePage = () => {
  const { movies, theatres, navigateTo, setTrailerUrl, toggleWatchlist, watchlist, toggleCompare } = useApp();
  const [activeTab, setActiveTab] = useState('now-showing');

  const featuredMovie = movies.find(m => m.featured) || movies[0];
  const displayedMovies = activeTab === 'now-showing'
    ? movies.filter(m => m.isNowShowing)
    : movies.filter(m => m.isComingSoon);

  const recommendedMovies = movies.filter(m => m.matchPercentage);

  return (
    <div className="flex-grow">
      {/* Cinematic Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{ backgroundImage: `url('${featuredMovie.backdrop}')` }}
          ></div>
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-stack-sm">
              <span className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-3 py-1 rounded border border-primary/30 uppercase tracking-widest">
                {featuredMovie.isNowShowing ? 'Now Showing' : 'Coming Soon'}
              </span>
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-on-surface font-bold">IMDb {featuredMovie.rating}</span>
              </div>
              <span className="text-on-surface-variant font-label-sm text-xs">
                {featuredMovie.formats.join(' • ')}
              </span>
            </div>

            <h1 className="font-display-lg text-4xl md:text-6xl text-on-surface mb-stack-md leading-none uppercase tracking-tight">
              {featuredMovie.title}
            </h1>

            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-lg line-clamp-3">
              {featuredMovie.synopsis}
            </p>

            <div className="flex flex-wrap items-center gap-stack-md">
              <button
                onClick={() => navigateTo('movie-details', featuredMovie)}
                className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-title-md text-title-md px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary-container/30 hover:scale-105 active:scale-95 border border-primary/30 uppercase tracking-wider"
              >
                <span className="material-symbols-outlined">confirmation_number</span>
                Book Tickets
              </button>

              <button
                onClick={() => setTrailerUrl(featuredMovie.trailerUrl)}
                className="glass-overlay text-on-surface hover:text-primary font-title-md text-title-md px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-primary/50 hover:bg-white/5"
              >
                <span className="material-symbols-outlined">play_circle</span>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Toggles (Now Showing / Coming Soon) */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg border-b border-white/5">
        <div className="flex gap-stack-lg">
          <button
            onClick={() => setActiveTab('now-showing')}
            className={`pb-stack-sm font-title-md text-title-md transition-colors ${
              activeTab === 'now-showing'
                ? 'border-b-2 border-primary text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Now Showing
          </button>
          <button
            onClick={() => setActiveTab('coming-soon')}
            className={`pb-stack-sm font-title-md text-title-md transition-colors ${
              activeTab === 'coming-soon'
                ? 'border-b-2 border-primary text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Coming Soon
          </button>
        </div>
      </section>

      {/* Trending Movies Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg">
        <div className="flex justify-between items-end mb-stack-md">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              {activeTab === 'now-showing' ? 'Trending This Week' : 'Upcoming Blockbusters'}
            </h2>
            <p className="font-label-sm text-xs text-on-surface-variant mt-1">Handpicked premiere titles in Masterpiece Red</p>
          </div>

          <button
            onClick={() => navigateTo('movies')}
            className="text-primary hover:text-primary-fixed-dim font-label-sm text-label-sm uppercase flex items-center gap-1 transition-colors"
          >
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {displayedMovies.slice(0, 4).map(movie => (
            <div
              key={movie.id}
              className="relative rounded-xl overflow-hidden aspect-[2/3] group movie-card-hover border border-white/5 hover:border-primary/40 transition-all duration-500 hover:scale-[1.02] bg-surface-dim shadow-xl cursor-pointer"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Top Action Badges */}
              <div className="absolute top-3 right-3 flex gap-2 z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie.id); }}
                  className={`p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors ${
                    watchlist.includes(movie.id) ? 'bg-primary text-on-primary' : 'bg-black/60 text-white hover:text-primary'
                  }`}
                  title="Watchlist"
                >
                  <span className="material-symbols-outlined text-sm">favorite</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCompare(movie); }}
                  className="p-2 rounded-full bg-black/60 text-white hover:text-primary backdrop-blur-md border border-white/10 transition-colors"
                  title="Compare"
                >
                  <span className="material-symbols-outlined text-sm">compare_arrows</span>
                </button>
              </div>

              {/* Glass Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[48%] glass-overlay p-4 flex flex-col justify-end movie-overlay border-t border-white/10 z-10">
                <h3 className="font-title-md text-title-md text-on-surface truncate mb-1">{movie.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-on-surface-variant">{movie.genre.slice(0, 2).join(' / ')}</span>
                  <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span>{movie.rating}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('movie-details', movie)}
                  className="w-full bg-primary-container text-on-primary-container font-label-sm text-xs py-3 rounded hover:bg-primary hover:text-on-primary transition-colors border border-primary/30 uppercase tracking-widest font-bold"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended For You / Horizontal Scroll */}
      <section className="py-stack-lg bg-surface-container-low border-y border-white/5">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-stack-md">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Recommended For You
            </h2>
            <p className="font-label-sm text-xs text-primary uppercase tracking-widest mt-1">
              Because you watched Sci-Fi & Action
            </p>
          </div>

          <div className="flex gap-gutter overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {recommendedMovies.map(movie => (
              <div
                key={movie.id}
                onClick={() => navigateTo('movie-details', movie)}
                className="snap-start shrink-0 w-64 md:w-80 group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden aspect-video border border-white/5 group-hover:border-primary/40 transition-colors bg-surface-dim">
                  <img
                    src={movie.backdrop}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h4 className="font-title-md text-title-md text-on-surface truncate">{movie.title}</h4>
                      <span className="font-label-sm text-xs text-on-surface-variant">{movie.duration}</span>
                    </div>
                    <span className="font-label-sm text-xs text-primary bg-primary-container/40 px-2 py-0.5 rounded border border-primary/20">
                      Match {movie.matchPercentage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Theatres (Glassmorphism Cards) */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg">
        <div className="flex justify-between items-end mb-stack-md">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Premium Theatres Near You
            </h2>
            <p className="font-label-sm text-xs text-on-surface-variant mt-1">Dolby Atmos & IMAX certified locations</p>
          </div>
          <button
            onClick={() => navigateTo('theatres')}
            className="text-primary hover:text-primary-fixed-dim font-label-sm text-xs uppercase flex items-center gap-1"
          >
            All Theatres <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {theatres.slice(0, 3).map(theatre => (
            <div
              key={theatre.id}
              className="glass-overlay rounded-xl p-6 border border-white/5 hover:border-primary/40 transition-colors duration-300 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">
                    {theatre.name}
                  </h3>
                  <p className="font-body-md text-xs text-on-surface-variant">{theatre.location}</p>
                </div>
                <div className="bg-surface-container-highest px-2 py-1 rounded flex items-center gap-1 font-label-sm text-xs text-on-surface">
                  <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {theatre.rating}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {theatre.amenities.slice(0, 3).map(a => (
                  <span key={a} className="text-[10px] px-2 py-1 border border-white/10 rounded text-on-surface-variant uppercase font-label-sm tracking-wider">
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex justify-between items-center border-t border-white/5 pt-4">
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-xs">
                  <span className="material-symbols-outlined text-sm">near_me</span>
                  {theatre.distance}
                </div>
                <button
                  onClick={() => navigateTo('movie-details')}
                  className="text-primary hover:text-on-primary hover:bg-primary px-4 py-2 rounded transition-colors font-label-sm text-xs uppercase tracking-widest border border-primary/30"
                >
                  Showtimes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
