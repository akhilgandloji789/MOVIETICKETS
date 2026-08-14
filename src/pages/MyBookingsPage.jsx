import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const MyBookingsPage = () => {
  const { bookings, cancelBooking, setActiveBooking, navigateTo, showToast } = useApp();
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' | 'history'
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 4, mins: 32, secs: 15 });

  // Dynamic live countdown for upcoming showtime
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.status !== 'Confirmed');

  const displayedList = filter === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-4xl text-on-surface mb-2">
          My Reservations
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Manage your upcoming movie showtimes and booking history.
        </p>
      </div>

      {/* Showtime Countdown Highlight Card */}
      {upcomingBookings.length > 0 && (
        <div className="mb-10 glass-panel p-6 md:p-8 rounded-2xl border border-primary/30 relative overflow-hidden bg-gradient-to-r from-primary-container/30 to-surface-container-lowest">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <span className="bg-primary/20 text-primary font-label-sm text-[10px] px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest font-bold mb-2 inline-block">
                NEXT SHOWTIME COUNTDOWN
              </span>
              <h3 className="font-headline-lg-mobile text-2xl text-on-surface mb-1">
                {upcomingBookings[0].movieTitle}
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant">
                {upcomingBookings[0].theatreName} • Seats: <span className="text-primary font-bold">{upcomingBookings[0].seats.join(', ')}</span>
              </p>
            </div>

            {/* Countdown Clock UI */}
            <div className="flex gap-3 text-center">
              <div className="bg-surface-container-lowest/80 border border-white/10 px-4 py-2 rounded-xl">
                <span className="font-label-sm text-2xl md:text-3xl text-primary font-bold block">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Days</span>
              </div>
              <div className="bg-surface-container-lowest/80 border border-white/10 px-4 py-2 rounded-xl">
                <span className="font-label-sm text-2xl md:text-3xl text-primary font-bold block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Hours</span>
              </div>
              <div className="bg-surface-container-lowest/80 border border-white/10 px-4 py-2 rounded-xl">
                <span className="font-label-sm text-2xl md:text-3xl text-primary font-bold block">
                  {String(timeLeft.mins).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Mins</span>
              </div>
              <div className="bg-surface-container-lowest/80 border border-white/10 px-4 py-2 rounded-xl">
                <span className="font-label-sm text-2xl md:text-3xl text-primary font-bold block">
                  {String(timeLeft.secs).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Secs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-8 pb-3">
        <button
          onClick={() => setFilter('upcoming')}
          className={`font-title-md text-sm transition-colors ${
            filter === 'upcoming'
              ? 'border-b-2 border-primary text-primary font-bold pb-3'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setFilter('history')}
          className={`font-title-md text-sm transition-colors ${
            filter === 'history'
              ? 'border-b-2 border-primary text-primary font-bold pb-3'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Past & Cancelled ({pastBookings.length})
        </button>
      </div>

      {/* Bookings Grid */}
      {displayedList.length === 0 ? (
        <div className="py-16 text-center text-on-surface-variant glass-panel rounded-2xl">
          <span className="material-symbols-outlined text-5xl text-primary/40 mb-3">confirmation_number</span>
          <h3 className="font-title-md text-lg text-on-surface mb-1">No Reservations Found</h3>
          <p className="font-body-md text-xs mb-4">You have no {filter} movie bookings.</p>
          <button
            onClick={() => navigateTo('movies')}
            className="px-6 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg uppercase tracking-wider font-bold hover:bg-primary"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedList.map(booking => (
            <div
              key={booking.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-white/20 transition-all"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={booking.moviePoster}
                  alt={booking.movieTitle}
                  className="w-20 h-28 object-cover rounded-xl shrink-0 border border-white/10 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-sm text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded border border-primary/30 font-bold">
                      {booking.id}
                    </span>
                    <span className={`font-label-sm text-[10px] px-2 py-0.5 rounded font-bold ${
                      booking.status === 'Confirmed' ? 'bg-tertiary-container/40 text-tertiary border border-tertiary/30' : 'bg-white/10 text-on-surface-variant'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="font-headline-lg-mobile text-xl text-on-surface mb-1">{booking.movieTitle}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant mb-1">
                    {booking.theatreName} • {booking.screen}
                  </p>
                  <p className="font-label-sm text-xs text-on-surface">
                    📅 {booking.date} at {booking.showtime} • Seats: <span className="text-primary font-bold">{booking.seats.join(', ')}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                <span className="font-title-md text-xl text-on-surface font-bold">₹{booking.paidAmount}</span>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setActiveBooking(booking);
                      navigateTo('digital-ticket');
                    }}
                    className="px-4 py-2 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg hover:bg-primary uppercase font-bold"
                  >
                    View Ticket
                  </button>

                  {booking.status === 'Confirmed' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="px-4 py-2 bg-surface-container-high border border-white/10 text-error hover:bg-error-container/40 font-label-sm text-xs rounded-lg uppercase"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
