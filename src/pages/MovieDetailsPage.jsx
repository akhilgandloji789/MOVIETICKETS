import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MovieDetailsPage = () => {
  const {
    selectedMovie,
    theatres,
    selectedTheatre,
    setSelectedTheatre,
    selectedDate,
    setSelectedDate,
    selectedFormat,
    setSelectedFormat,
    selectedShowtime,
    setSelectedShowtime,
    navigateTo,
    watchlist,
    toggleWatchlist,
    setTrailerUrl,
    showToast
  } = useApp();

  const [userRatingModal, setUserRatingModal] = useState(false);
  const [selectedUserRating, setSelectedUserRating] = useState(5);

  const dates = [
    { label: 'Today, 24 Oct', value: 'Today, 24 Oct' },
    { label: 'Tomorrow, 25 Oct', value: 'Tomorrow, 25 Oct' },
    { label: 'Fri, 26 Oct', value: 'Fri, 26 Oct' },
    { label: 'Sat, 27 Oct', value: 'Sat, 27 Oct' }
  ];

  const handleRatingSubmit = () => {
    setUserRatingModal(false);
    showToast(`Thank you! You rated ${selectedMovie.title} ${selectedUserRating} Stars ⭐`, "success");
  };

  return (
    <div className="pt-20 md:pt-24 pb-32 radial-light">
      {/* Hero Backdrop & Movie Info */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
        {/* Backdrop */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-screen"
            style={{ backgroundImage: `url('${selectedMovie.backdrop}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end relative z-10 pb-stack-lg">
          {/* Poster */}
          <div className="md:col-span-3 lg:col-span-3 hidden md:block">
            <div className="aspect-[2/3] w-full rounded border border-white/10 shadow-2xl relative group overflow-hidden">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="md:col-span-9 lg:col-span-8 flex flex-col space-y-stack-sm text-left">
            <div className="flex items-center space-x-stack-sm mb-2">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-label-sm text-xs tracking-widest uppercase border border-primary/30">
                {selectedMovie.genre.join(' / ')}
              </span>
              <span className="text-on-surface-variant font-label-sm text-xs flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">schedule</span> {selectedMovie.duration}
              </span>
            </div>

            <h1 className="font-display-lg text-3xl md:text-5xl text-on-surface mb-2 leading-none uppercase tracking-tight">
              {selectedMovie.title}
            </h1>

            <div className="flex items-center space-x-gutter mb-6">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-title-md text-2xl text-on-surface font-bold">{selectedMovie.rating}</span>
                <span className="text-on-surface-variant font-label-sm text-xs">/ 10</span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="text-on-surface-variant font-label-sm text-xs tracking-widest uppercase">
                {selectedMovie.formats.join(' • ')}
              </div>
            </div>

            <p className="text-on-surface-variant font-body-md text-base max-w-2xl mb-6">
              {selectedMovie.synopsis}
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mb-8">
              <div>
                <span className="block text-on-surface-variant font-label-sm text-xs opacity-70 mb-1 uppercase tracking-widest">Director</span>
                <span className="font-body-md text-on-surface font-semibold">{selectedMovie.director}</span>
              </div>
              <div>
                <span className="block text-on-surface-variant font-label-sm text-xs opacity-70 mb-1 uppercase tracking-widest">Cast</span>
                <span className="font-body-md text-on-surface">{selectedMovie.cast.join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => toggleWatchlist(selectedMovie.id)}
                className={`glass-panel border px-6 py-3 rounded-lg font-title-md text-sm transition-all flex items-center space-x-2 ${
                  watchlist.includes(selectedMovie.id)
                    ? 'border-primary text-primary bg-primary-container/20'
                    : 'border-white/10 text-on-surface hover:border-primary/50'
                }`}
              >
                <span className="material-symbols-outlined">favorite</span>
                <span>{watchlist.includes(selectedMovie.id) ? 'In Watchlist' : 'Watchlist'}</span>
              </button>

              <button
                onClick={() => setUserRatingModal(true)}
                className="glass-panel border border-white/10 text-on-surface px-6 py-3 rounded-lg font-title-md text-sm hover:border-primary/50 transition-all flex items-center space-x-2"
              >
                <span className="material-symbols-outlined">star</span>
                <span>Rate Movie</span>
              </button>

              <button
                onClick={() => setTrailerUrl(selectedMovie.trailerUrl)}
                className="glass-panel border border-white/10 text-on-surface px-6 py-3 rounded-lg font-title-md text-sm hover:border-primary/50 transition-all flex items-center space-x-2"
              >
                <span className="material-symbols-outlined">play_circle</span>
                <span>Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Theatre & Showtime Selection */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Date Selector Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-stack-lg hide-scrollbar border-b border-white/10">
          {dates.map(d => (
            <button
              key={d.value}
              onClick={() => setSelectedDate(d.value)}
              className={`px-6 py-3 font-title-md text-sm whitespace-nowrap transition-colors ${
                selectedDate === d.value
                  ? 'border-b-2 border-primary text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Theatres List */}
          <div className="lg:col-span-8 space-y-stack-md">
            {theatres.map(theatre => (
              <div
                key={theatre.id}
                className={`bg-surface-dim border rounded-xl p-6 transition-colors ${
                  selectedTheatre.id === theatre.id ? 'border-primary/50 shadow-lg shadow-primary/5' : 'border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-headline-lg-mobile text-xl text-on-surface mb-1">{theatre.name}</h3>
                    <p className="text-on-surface-variant font-label-sm text-xs flex items-center">
                      <span className="material-symbols-outlined text-xs mr-1">location_on</span> {theatre.location} • {theatre.distance}
                    </p>
                  </div>
                  <div className="bg-surface-container-highest px-3 py-1 rounded text-xs font-label-sm text-primary">
                    ⭐ {theatre.rating}
                  </div>
                </div>

                {/* Formats & Showtimes */}
                <div className="space-y-6">
                  {Object.entries(theatre.shows).map(([format, showtimes]) => (
                    <div key={format}>
                      <div className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2"></span> {format}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {showtimes.map(time => (
                          <button
                            key={time}
                            onClick={() => {
                              setSelectedTheatre(theatre);
                              setSelectedFormat(format);
                              setSelectedShowtime(time);
                            }}
                            className={`glass-panel px-4 py-2 rounded font-label-sm text-xs transition-colors ${
                              selectedTheatre.id === theatre.id && selectedFormat === format && selectedShowtime === time
                                ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-md shadow-primary/20'
                                : 'border-white/10 text-on-surface hover:border-primary/50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Booking Summary Widget (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-28 glass-panel border border-white/10 rounded-xl p-6 shadow-2xl">
              <h4 className="font-title-md text-lg text-on-surface border-b border-white/10 pb-4 mb-4 font-bold">
                Selection Details
              </h4>
              <div className="space-y-4 mb-8 font-body-md text-sm">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Movie</span>
                  <span className="text-on-surface font-semibold">{selectedMovie.title}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Theatre</span>
                  <span className="text-on-surface">{selectedTheatre.name}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Date</span>
                  <span className="text-on-surface">{selectedDate}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Format</span>
                  <span className="text-on-surface">{selectedFormat}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Showtime</span>
                  <span className="text-primary font-bold">{selectedShowtime}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('seat-booking')}
                className="w-full bg-primary-container text-on-primary-container font-title-md text-base py-4 rounded-lg hover:bg-primary hover:text-on-primary transition-all shadow-[0_0_20px_rgba(90,33,50,0.4)] uppercase tracking-wider font-bold"
              >
                Select Seats
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Footer Action */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 glass-panel border-t border-white/10 p-4 z-40 flex justify-between items-center">
        <div>
          <span className="block text-on-surface font-title-md text-sm font-bold">{selectedTheatre.name}</span>
          <span className="text-primary font-label-sm text-xs">{selectedFormat} • {selectedShowtime}</span>
        </div>
        <button
          onClick={() => navigateTo('seat-booking')}
          className="bg-primary-container text-on-primary-container font-title-md text-sm px-6 py-3 rounded-lg shadow-lg"
        >
          Select Seats
        </button>
      </div>

      {/* Rate Movie Modal */}
      {userRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-surface-container-lowest border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="font-headline-lg-mobile text-lg text-on-surface mb-2">Rate {selectedMovie.title}</h3>
            <p className="font-body-md text-xs text-on-surface-variant mb-4">Share your cinematic rating</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setSelectedUserRating(star)}
                  className={`text-2xl transition-transform hover:scale-125 ${
                    star <= selectedUserRating ? 'text-primary' : 'text-on-surface-variant/40'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setUserRatingModal(false)}
                className="w-1/2 py-2 border border-white/10 rounded text-xs font-label-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                className="w-1/2 py-2 bg-primary-container text-on-primary-container rounded text-xs font-label-sm font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
