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
    addMovieReview,
    toggleReviewHelpful,
    userProfile,
    showToast
  } = useApp();

  // Review modal & form state
  const [userRatingModal, setUserRatingModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState(userProfile?.name || 'Cinephile');
  const [reviewComment, setReviewComment] = useState('');

  // Review Filter & Sort state
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | '5' | '4' | '3'
  const [reviewSort, setReviewSort] = useState('recent'); // 'recent' | 'highest' | 'helpful'

  const dates = [
    { label: 'Today, 24 Oct', value: 'Today, 24 Oct' },
    { label: 'Tomorrow, 25 Oct', value: 'Tomorrow, 25 Oct' },
    { label: 'Fri, 26 Oct', value: 'Fri, 26 Oct' },
    { label: 'Sat, 27 Oct', value: 'Sat, 27 Oct' }
  ];

  const reviews = selectedMovie.reviews || [];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast("Please write a short comment for your review.", "warning");
      return;
    }
    addMovieReview(selectedMovie.id, {
      user: reviewName.trim() || 'Anonymous Cinephile',
      rating: reviewRating,
      comment: reviewComment.trim()
    });
    setUserRatingModal(false);
    setReviewComment('');
  };

  // Filter & Sort reviews
  const filteredReviews = reviews.filter(r => {
    if (reviewFilter === '5') return r.rating >= 4.8;
    if (reviewFilter === '4') return r.rating >= 3.8 && r.rating < 4.8;
    if (reviewFilter === '3') return r.rating < 3.8;
    return true;
  }).sort((a, b) => {
    if (reviewSort === 'highest') return b.rating - a.rating;
    if (reviewSort === 'helpful') return (b.helpfulCount || 0) - (a.helpfulCount || 0);
    return 0; // default recent order
  });

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

        {/* Content Container */}
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
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-label-sm text-xs tracking-widest uppercase border border-primary/30 font-semibold">
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
                <span className="text-on-surface-variant font-label-sm text-xs">/ 10 ({reviews.length} reviews)</span>
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
                className="glass-panel border border-primary/40 text-primary bg-primary-container/20 px-6 py-3 rounded-lg font-title-md text-sm hover:bg-primary hover:text-on-primary transition-all flex items-center space-x-2 font-bold shadow-lg shadow-primary-container/20"
              >
                <span className="material-symbols-outlined">rate_review</span>
                <span>Write a Review</span>
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
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
        <h2 className="font-headline-lg-mobile text-2xl text-on-surface mb-4 font-bold">Select Theatre & Showtime</h2>

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

      {/* 🌟 Interactive Reviews & Ratings Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg border-t border-white/10 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface mb-1">
              Audience Reviews & Ratings
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Real reviews from verified moviegoers.
            </p>
          </div>

          <button
            onClick={() => setUserRatingModal(true)}
            className="bg-primary-container text-on-primary-container font-label-sm text-xs px-5 py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-wider shadow-md border border-primary/30"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown & Filter Toolbar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-8">
          {/* Overall Rating Score Card */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
            <span className="font-display-lg text-5xl text-on-surface font-bold mb-1">
              {selectedMovie.rating}
            </span>
            <div className="flex items-center gap-1 text-primary text-xl mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: star <= Math.round(selectedMovie.rating / 2) ? "'FILL' 1" : "'FILL' 0" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="font-label-sm text-xs text-on-surface-variant">
              Based on {reviews.length} user reviews
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-center space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = reviews.filter(r => Math.round(r.rating) === stars || (stars === 5 && r.rating >= 4.5)).length;
              const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : (stars >= 4 ? 70 : 10);
              return (
                <div key={stars} className="flex items-center gap-3 font-label-sm text-xs">
                  <span className="w-12 text-on-surface-variant font-bold">{stars} Stars</span>
                  <div className="flex-grow bg-surface-container-high h-2 rounded-full overflow-hidden border border-white/5">
                    <div
                      style={{ width: `${percent}%` }}
                      className="bg-primary h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  <span className="w-10 text-right text-on-surface-variant">{percent}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 glass-panel p-4 rounded-xl border border-white/5">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: '5', label: '5 ★ Top Rated' },
              { id: '4', label: '4 ★ Recommended' },
              { id: '3', label: '3 ★ & Below' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setReviewFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-xs transition-colors ${
                  reviewFilter === f.id
                    ? 'bg-primary-container text-on-primary-container border border-primary font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="font-label-sm text-xs text-on-surface-variant">Sort:</span>
            <select
              value={reviewSort}
              onChange={(e) => setReviewSort(e.target.value)}
              className="bg-surface-container border border-white/10 rounded-lg px-3 py-1.5 text-xs font-label-sm text-on-surface outline-none cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center text-on-surface-variant border border-white/5">
            <span className="material-symbols-outlined text-4xl text-primary/40 mb-2">rate_review</span>
            <h4 className="font-title-md text-base text-on-surface mb-1">No Reviews Yet</h4>
            <p className="font-body-md text-xs mb-4">Be the first to share your thoughts on {selectedMovie.title}!</p>
            <button
              onClick={() => setUserRatingModal(true)}
              className="px-5 py-2 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg uppercase font-bold"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map(review => (
              <div
                key={review.id}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {/* User Avatar Circle */}
                    <div className="w-10 h-10 rounded-full bg-primary-container border border-primary/40 flex items-center justify-center font-bold text-on-primary-container text-sm">
                      {review.user ? review.user.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-title-md text-sm text-on-surface font-semibold">{review.user}</h4>
                        <span className="bg-tertiary-container/30 text-tertiary font-label-sm text-[10px] px-2 py-0.5 rounded border border-tertiary/20">
                          Verified Audience
                        </span>
                      </div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant opacity-60">
                        Posted {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars Badge */}
                  <div className="flex items-center gap-1 bg-surface-container-highest px-3 py-1 rounded-full border border-white/10 text-primary font-label-sm text-xs font-bold">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span>{review.rating} / 5</span>
                  </div>
                </div>

                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  "{review.comment}"
                </p>

                {/* Interactive Helpful Action */}
                <div className="flex justify-end border-t border-white/5 pt-3">
                  <button
                    onClick={() => toggleReviewHelpful(selectedMovie.id, review.id)}
                    className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs bg-surface-container px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    <span>Helpful ({review.helpfulCount || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* Write a Review Modal */}
      {userRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-surface-container-lowest border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full text-left shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">rate_review</span>
                <h3 className="font-headline-lg-mobile text-xl text-on-surface font-bold">Write a Review</h3>
              </div>
              <button
                onClick={() => setUserRatingModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 font-body-md text-sm">
              <div>
                <p className="font-label-sm text-xs text-on-surface-variant mb-2 uppercase tracking-widest">
                  Movie Title
                </p>
                <p className="font-title-md text-base text-primary font-bold">{selectedMovie.title}</p>
              </div>

              <div>
                <label className="block font-label-sm text-xs text-on-surface-variant mb-2 uppercase tracking-widest">
                  Your Rating
                </label>
                <div className="flex items-center gap-3 bg-surface-container-high p-3 rounded-xl border border-white/10">
                  <div className="flex gap-2 text-2xl">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`transition-transform hover:scale-125 ${
                          star <= reviewRating ? 'text-primary' : 'text-on-surface-variant/40'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="font-label-sm text-sm text-on-surface font-bold ml-auto">
                    {reviewRating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-xs text-on-surface-variant mb-2 uppercase tracking-widest">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl p-3 text-on-surface font-body-md text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-label-sm text-xs text-on-surface-variant mb-2 uppercase tracking-widest">
                  Review Details & Feedback
                </label>
                <textarea
                  rows="4"
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What did you think of the story, performances, cinematography, and sound design in IMAX/4DX?"
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl p-3 text-on-surface font-body-md text-sm outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUserRatingModal(false)}
                  className="w-1/2 py-3 border border-white/10 rounded-xl text-xs font-label-sm hover:border-white/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-primary-container text-on-primary-container font-label-sm text-xs font-bold rounded-xl hover:bg-primary uppercase tracking-wider shadow-lg shadow-primary-container/30"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
