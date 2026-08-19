import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOVIES } from '../data/moviesData';
import { INITIAL_THEATRES, INITIAL_OFFERS } from '../data/theatresData';
import { supabase } from '../supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Core View State
  const [currentView, setCurrentView] = useState('home');
  const [userRole, setUserRole] = useState('user');
  const [location, setLocation] = useState('Downtown District');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Datasets
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('cinenoir_movies');
    return saved ? JSON.parse(saved) : INITIAL_MOVIES;
  });
  
  const [theatres, setTheatres] = useState(() => {
    const saved = localStorage.getItem('cinenoir_theatres');
    return saved ? JSON.parse(saved) : INITIAL_THEATRES;
  });

  const [offers] = useState(INITIAL_OFFERS);

  // Booking Flow Selection State
  const [selectedMovie, setSelectedMovie] = useState(INITIAL_MOVIES[0]);
  const [selectedTheatre, setSelectedTheatre] = useState(INITIAL_THEATRES[0]);
  const [selectedDate, setSelectedDate] = useState('Today, 24 Oct');
  const [selectedFormat, setSelectedFormat] = useState('IMAX 2D');
  const [selectedShowtime, setSelectedShowtime] = useState('14:30');
  const [selectedSeats, setSelectedSeats] = useState(['C5', 'C6']);
  const [appliedOffer, setAppliedOffer] = useState(null);

  // Real-time Seat Lock Timer
  const [lockSecondsLeft, setLockSecondsLeft] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Bookings Store
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('cinenoir_bookings');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "CN-984-XLV2",
        movieTitle: "Eclipse of Time",
        moviePoster: INITIAL_MOVIES[0].poster,
        movieBackdrop: INITIAL_MOVIES[0].backdrop,
        theatreName: "CineNoir Grand",
        location: "Downtown District",
        screen: "Screen 04 — Atmos VIP",
        date: "Oct 24, 2026",
        showtime: "21:30",
        format: "IMAX 2D",
        seats: ["J12", "J13"],
        seatType: "Recliner Duo",
        totalAmount: 600,
        discountAmount: 150,
        paidAmount: 450,
        status: "Confirmed",
        bookedAt: new Date(Date.now() - 3600000).toISOString(),
        showTimestamp: Date.now() + (2 * 86400000 + 4 * 3600000 + 32 * 60000)
      }
    ];
  });

  const [activeBooking, setActiveBooking] = useState(null);

  // Watchlist & History
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cinenoir_watchlist');
    return saved ? JSON.parse(saved) : ['m1', 'm4'];
  });

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Modals & UI States
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: "n1", title: "Reservation Confirmed", message: "Your tickets for Eclipse of Time are locked in.", time: "10m ago", read: false, type: "success" },
    { id: "n2", title: "Showtime Reminder", message: "Eclipse of Time starts in 2 days. Get ready for an immersive IMAX experience!", time: "1h ago", read: false, type: "info" },
    { id: "n3", title: "Special Offer Available", message: "Use code WELCOME50 for 50% off your next booking.", time: "1 day ago", read: true, type: "offer" }
  ]);

  // User Profile Data
  const [userProfile, setUserProfile] = useState({
    name: "Elias Thorne",
    email: "elias.thorne@cinenoir.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzpi-XddVZGlW9uGdTzL0uV1Bjq1oDnLH237q6cwUVSU90B_0hU43276qR7oj4CYW7dlkgJKX_j5noNCQEFPIWpTCANYFRTFAbneDKW6uuxrQsrPa5JeoLg3lUVdwgceZJ-VEfBEMP0-CcLcIeSJINlyC75sSCWDH7WCWFlQnk3ii7wgVQHVy9O-9LftUZs8pgHhi6XYV3kQjyBcjQT0s43nChZj7teDJ2tjJbsDXwD2n79fKHGRNe",
    favoriteGenres: ["Sci-Fi", "Noir / Thriller", "Drama"],
    favoriteLanguages: ["English", "French"],
    favoriteTheatre: "CineNoir Grand",
    favoriteFormat: "IMAX 2D"
  });

  // LocalStorage Persistence
  useEffect(() => {
    localStorage.setItem('cinenoir_movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('cinenoir_theatres', JSON.stringify(theatres));
  }, [theatres]);

  useEffect(() => {
    localStorage.setItem('cinenoir_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('cinenoir_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // 🌐 Supabase Real-Time Data Fetching & Synchronization Effect
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        // Fetch bookings from Supabase
        const { data: remoteBookings, error: bookingErr } = await supabase
          .from('bookings')
          .select('*')
          .order('booked_at', { ascending: false });

        if (!bookingErr && remoteBookings && remoteBookings.length > 0) {
          const formatted = remoteBookings.map(b => ({
            id: b.id,
            movieTitle: b.movie_title,
            moviePoster: b.movie_poster,
            movieBackdrop: b.movie_backdrop,
            theatreName: b.theatre_name,
            location: b.location,
            screen: b.screen,
            date: b.show_date,
            showtime: b.showtime,
            format: b.format,
            seats: b.seats,
            seatType: b.seat_type,
            totalAmount: Number(b.total_amount),
            discountAmount: Number(b.discount_amount),
            paidAmount: Number(b.paid_amount),
            status: b.status,
            bookedAt: b.booked_at
          }));
          setBookings(formatted);
        }

        // Fetch reviews from Supabase
        const { data: remoteReviews, error: revErr } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!revErr && remoteReviews && remoteReviews.length > 0) {
          setMovies(prevMovies => {
            return prevMovies.map(movie => {
              const movieRevs = remoteReviews
                .filter(r => r.movie_id === movie.id)
                .map(r => ({
                  id: r.id,
                  user: r.user_name,
                  rating: Number(r.rating),
                  comment: r.comment,
                  date: new Date(r.created_at).toLocaleDateString(),
                  helpfulCount: r.helpful_count || 0
                }));
              if (movieRevs.length > 0) {
                const total = movieRevs.reduce((sum, item) => sum + item.rating, 0);
                const newAvg = (total / movieRevs.length).toFixed(1);
                return {
                  ...movie,
                  rating: Number(newAvg),
                  reviews: [...movieRevs, ...(movie.reviews || [])]
                };
              }
              return movie;
            });
          });
        }
      } catch (err) {
        console.log("Supabase sync ready upon table creation.", err);
      }
    };

    fetchSupabaseData();
  }, []);

  // Seat Lock Countdown Timer Effect
  useEffect(() => {
    let timer = null;
    if (isTimerRunning && lockSecondsLeft > 0) {
      timer = setInterval(() => {
        setLockSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (lockSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      showToast("Seat lock timer expired! Seats have been released.", "warning");
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, lockSecondsLeft]);

  // Helper Functions
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const startSeatLock = () => {
    setLockSecondsLeft(300);
    setIsTimerRunning(true);
  };

  const navigateTo = (viewName, movie = null) => {
    if (movie) {
      setSelectedMovie(movie);
      setRecentlyViewed(prev => {
        const filtered = prev.filter(m => m.id !== movie.id);
        return [movie, ...filtered].slice(0, 5);
      });
    }
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev => {
      if (prev.includes(movieId)) {
        showToast("Removed from Watchlist", "info");
        return prev.filter(id => id !== movieId);
      } else {
        showToast("Added to Watchlist ❤️", "success");
        return [...prev, movieId];
      }
    });
  };

  const toggleCompare = (movie) => {
    setCompareList(prev => {
      if (prev.find(m => m.id === movie.id)) {
        return prev.filter(m => m.id !== movie.id);
      }
      if (prev.length >= 2) {
        showToast("You can compare up to 2 movies at a time.", "warning");
        return [prev[1], movie];
      }
      showToast(`Added ${movie.title} to comparison`, "info");
      return [...prev, movie];
    });
  };

  const confirmReservation = async () => {
    const seatPrice = 300;
    const subtotal = selectedSeats.length * seatPrice;
    let discount = 0;
    if (appliedOffer) {
      discount = Math.min((subtotal * appliedOffer.discountPercent) / 100, appliedOffer.maxDiscount);
    }
    const finalAmount = Math.max(subtotal - discount, 0);
    const bookingId = `CN-${Math.floor(100 + Math.random() * 899)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newBooking = {
      id: bookingId,
      movieTitle: selectedMovie.title,
      moviePoster: selectedMovie.poster,
      movieBackdrop: selectedMovie.backdrop,
      theatreName: selectedTheatre.name,
      location: selectedTheatre.location,
      screen: "Screen 04 — Atmos VIP",
      date: selectedDate,
      showtime: selectedShowtime,
      format: selectedFormat,
      seats: selectedSeats,
      seatType: "Premium Admission",
      totalAmount: subtotal,
      discountAmount: discount,
      paidAmount: finalAmount,
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
      showTimestamp: Date.now() + (2 * 86400000 + 4 * 3600000 + 32 * 60000)
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    setIsTimerRunning(false);

    // Sync booking to Supabase database
    try {
      await supabase.from('bookings').insert([{
        id: bookingId,
        movie_title: selectedMovie.title,
        movie_poster: selectedMovie.poster,
        movie_backdrop: selectedMovie.backdrop,
        theatre_name: selectedTheatre.name,
        location: selectedTheatre.location,
        screen: "Screen 04 — Atmos VIP",
        show_date: selectedDate,
        showtime: selectedShowtime,
        format: selectedFormat,
        seats: selectedSeats,
        seat_type: "Premium Admission",
        total_amount: subtotal,
        discount_amount: discount,
        paid_amount: finalAmount,
        status: "Confirmed"
      }]);
    } catch (e) {
      console.log("Booking saved locally & sync queued to Supabase.", e);
    }

    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: "Reservation Confirmed!",
        message: `Your booking for ${selectedMovie.title} at ${selectedTheatre.name} (${selectedSeats.join(', ')}) is confirmed.`,
        time: "Just now",
        read: false,
        type: "success"
      },
      ...prev
    ]);

    showToast("Reservation Confirmed! Digital ticket generated.", "success");
    setCurrentView('digital-ticket');
  };

  const cancelBooking = async (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    try {
      await supabase.from('bookings').update({ status: 'Cancelled' }).eq('id', bookingId);
    } catch (e) {}
    showToast(`Booking ${bookingId} has been cancelled.`, "info");
  };

  // Movie Review & Rating Engine with Supabase Sync
  const addMovieReview = async (movieId, { user, rating, comment }) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      user: user || userProfile.name,
      rating: Number(rating),
      comment,
      date: 'Just now',
      helpfulCount: 0
    };

    setMovies(prevMovies => {
      const updated = prevMovies.map(movie => {
        if (movie.id === movieId) {
          const currentReviews = movie.reviews || [];
          const updatedReviews = [newReview, ...currentReviews];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvg = (totalRating / updatedReviews.length).toFixed(1);

          const updatedMovie = {
            ...movie,
            rating: Number(newAvg),
            reviews: updatedReviews
          };

          if (selectedMovie && selectedMovie.id === movieId) {
            setSelectedMovie(updatedMovie);
          }
          return updatedMovie;
        }
        return movie;
      });
      return updated;
    });

    // Save review to Supabase database
    try {
      await supabase.from('reviews').insert([{
        movie_id: movieId,
        user_name: user || userProfile.name,
        rating: Number(rating),
        comment
      }]);
    } catch (e) {
      console.log("Review saved locally & queued for Supabase.", e);
    }

    showToast("Your review & rating have been published! ⭐", "success");
  };

  const toggleReviewHelpful = async (movieId, reviewId) => {
    setMovies(prevMovies => {
      const updated = prevMovies.map(movie => {
        if (movie.id === movieId && movie.reviews) {
          const updatedReviews = movie.reviews.map(r => 
            r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
          );
          const updatedMovie = { ...movie, reviews: updatedReviews };
          if (selectedMovie && selectedMovie.id === movieId) {
            setSelectedMovie(updatedMovie);
          }
          return updatedMovie;
        }
        return movie;
      });
      return updated;
    });

    try {
      await supabase.from('reviews').update({ helpful_count: 1 }).eq('id', reviewId);
    } catch (e) {}

    showToast("Marked review as helpful 👍", "info");
  };

  // Admin Movie Operations
  const addMovie = async (newMovie) => {
    setMovies(prev => [newMovie, ...prev]);
    try {
      await supabase.from('movies').insert([{
        id: newMovie.id,
        title: newMovie.title,
        director: newMovie.director,
        rating: newMovie.rating,
        duration: newMovie.duration,
        genre: newMovie.genre,
        poster: newMovie.poster,
        backdrop: newMovie.backdrop,
        synopsis: newMovie.synopsis
      }]);
    } catch (e) {}
    showToast(`Movie "${newMovie.title}" added to inventory!`, "success");
  };

  const updateMovie = (updatedMovie) => {
    setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m));
    showToast(`Movie "${updatedMovie.title}" updated!`, "success");
  };

  const deleteMovie = async (movieId) => {
    setMovies(prev => prev.filter(m => m.id !== movieId));
    try {
      await supabase.from('movies').delete().eq('id', movieId);
    } catch (e) {}
    showToast("Movie deleted from inventory.", "warning");
  };

  const checkInBooking = async (bookingId) => {
    const found = bookings.find(b => b.id.toUpperCase() === bookingId.toUpperCase());
    if (!found) {
      return { success: false, message: "Booking ID not found!" };
    }
    if (found.status === 'Checked In') {
      return { success: false, message: `Ticket ${found.id} has ALREADY been checked in!` };
    }
    if (found.status === 'Cancelled') {
      return { success: false, message: `Ticket ${found.id} was CANCELLED!` };
    }

    setBookings(prev => prev.map(b => b.id.toUpperCase() === bookingId.toUpperCase() ? { ...b, status: 'Checked In' } : b));
    try {
      await supabase.from('bookings').update({ status: 'Checked In' }).eq('id', found.id);
    } catch (e) {}
    return { success: true, message: `Successfully checked in ${found.movieTitle} (Seats: ${found.seats.join(', ')})!`, booking: found };
  };

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView, navigateTo,
      userRole, setUserRole,
      location, setLocation,
      searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen,
      movies, setMovies, addMovie, updateMovie, deleteMovie,
      addMovieReview, toggleReviewHelpful,
      theatres, setTheatres,
      offers,
      selectedMovie, setSelectedMovie,
      selectedTheatre, setSelectedTheatre,
      selectedDate, setSelectedDate,
      selectedFormat, setSelectedFormat,
      selectedShowtime, setSelectedShowtime,
      selectedSeats, setSelectedSeats,
      appliedOffer, setAppliedOffer,
      lockSecondsLeft, isTimerRunning, startSeatLock,
      bookings, setBookings, activeBooking, setActiveBooking, confirmReservation, cancelBooking,
      watchlist, toggleWatchlist,
      recentlyViewed,
      trailerUrl, setTrailerUrl,
      compareList, toggleCompare, isCompareOpen, setIsCompareOpen,
      notifications, setNotifications, isNotificationsOpen, setIsNotificationsOpen,
      userProfile, setUserProfile,
      toast, showToast,
      checkInBooking
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
