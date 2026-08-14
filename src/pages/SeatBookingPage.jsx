import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SeatBookingPage = () => {
  const {
    selectedMovie,
    selectedTheatre,
    selectedDate,
    selectedShowtime,
    selectedFormat,
    selectedSeats,
    setSelectedSeats,
    lockSecondsLeft,
    startSeatLock,
    navigateTo
  } = useApp();

  useEffect(() => {
    startSeatLock();
  }, []);

  // Format countdown minutes & seconds
  const mins = String(Math.floor(lockSecondsLeft / 60)).padStart(2, '0');
  const secs = String(lockSecondsLeft % 60).padStart(2, '0');

  // Realistic seat layout definitions
  const rows = [
    { label: 'E', category: 'Standard', price: 200, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { label: 'D', category: 'Standard', price: 200, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { label: 'C', category: 'Premium', price: 300, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { label: 'B', category: 'Premium', price: 300, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { label: 'A', category: 'VIP', price: 450, seats: [1, 2, 3, 4, 5, 6, 7, 8] }
  ];

  const occupiedSeats = ['E3', 'E4', 'D5', 'D6', 'C9', 'C10'];
  const lockedSeats = ['E12'];

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId) || lockedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) return;
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((acc, seatId) => {
      const rowChar = seatId[0];
      const row = rows.find(r => r.label === rowChar);
      return acc + (row ? row.price : 300);
    }, 0);
  };

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col lg:flex-row gap-gutter">
      {/* Seat Map Area */}
      <section className="flex-grow flex flex-col items-center seat-map-container">
        {/* Movie Info Header */}
        <div className="w-full mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/5 pb-6 gap-4">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface mb-1">
              {selectedMovie.title}
            </h1>
            <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
              {selectedDate} • {selectedShowtime} • {selectedTheatre.name} ({selectedFormat})
            </p>
          </div>

          <div className="text-left sm:text-right bg-primary-container/20 px-4 py-2 rounded-xl border border-primary/30">
            <p className="font-label-sm text-[10px] text-primary mb-0.5 uppercase tracking-widest font-bold">REAL-TIME LOCK</p>
            <p className="font-label-sm text-sm text-on-surface flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-sm text-primary">timer</span>
              Seats held for {mins}:{secs}
            </p>
          </div>
        </div>

        {/* Screen */}
        <div className="w-3/4 h-2 mb-16 screen-glow rounded-t-[50%] relative flex justify-center mt-4">
          <span className="font-label-sm text-[10px] text-on-surface-variant absolute -top-7 tracking-[0.4em] uppercase opacity-70">
            CINEMA SCREEN
          </span>
        </div>

        {/* Interactive Seat Map Grid */}
        <div className="seat-map flex flex-col gap-6 items-center w-full max-w-3xl">
          {rows.map(row => (
            <div key={row.label} className="flex flex-col gap-2 w-full items-center">
              <span className="font-label-sm text-[10px] text-on-surface-variant opacity-50 uppercase tracking-widest">
                {row.category} (₹{row.price})
              </span>
              <div className="flex gap-2 sm:gap-3 items-center justify-center">
                <span className="font-label-sm text-xs text-on-surface-variant w-4 text-right font-bold">
                  {row.label}
                </span>

                <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
                  {row.seats.map(num => {
                    const seatId = `${row.label}${num}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isLocked = lockedSeats.includes(seatId);

                    let seatClass = 'seat available';
                    if (row.category === 'VIP') seatClass += ' vip';
                    else if (row.category === 'Premium') seatClass += ' premium';
                    else seatClass += ' standard';

                    if (isSelected) seatClass += ' selected';
                    if (isOccupied) seatClass += ' occupied';
                    if (isLocked) seatClass += ' locked';

                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        disabled={isOccupied || isLocked}
                        title={seatId}
                        className={`${seatClass} flex items-center justify-center font-label-sm text-[10px] font-bold`}
                      >
                        {isSelected && seatId}
                        {isLocked && <span className="material-symbols-outlined text-[10px] opacity-60">schedule</span>}
                      </button>
                    );
                  })}
                </div>

                <span className="font-label-sm text-xs text-on-surface-variant w-4 text-left font-bold">
                  {row.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 font-label-sm text-xs text-on-surface-variant bg-surface-container-low/60 py-3 px-6 rounded-full border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border border-white/30"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-primary-container border border-primary"></div>
            <span className="text-on-surface font-bold">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-white/10 opacity-40"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-white/10 border border-white/30 border-dashed flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px]">schedule</span>
            </div>
            <span>Locked</span>
          </div>
        </div>
      </section>

      {/* Sidebar Booking Summary */}
      <aside className="w-full lg:w-[380px] flex-shrink-0">
        <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sticky top-28 flex flex-col gap-6 shadow-2xl">
          <h2 className="font-headline-lg-mobile text-xl text-on-surface border-b border-white/10 pb-4 font-bold">
            Booking Summary
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-label-sm text-xs text-on-surface-variant mb-1">TICKETS ({selectedSeats.length})</p>
                <p className="font-title-md text-base text-on-surface">{selectedMovie.title}</p>
              </div>
              <p className="font-title-md text-lg text-primary font-bold">₹{calculateTotal()}</p>
            </div>

            <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5">
              <p className="font-label-sm text-xs text-on-surface-variant mb-2">SELECTED SEATS</p>
              {selectedSeats.length === 0 ? (
                <p className="font-body-md text-xs text-on-surface-variant italic">Please click on seats to select</p>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {selectedSeats.map(seat => (
                    <span
                      key={seat}
                      className="px-3 py-1 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-md border border-primary/30 font-bold"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <p className="font-label-sm text-xs text-on-surface-variant">TOTAL AMOUNT</p>
              <p className="font-title-md text-2xl text-on-surface font-bold">₹{calculateTotal()}</p>
            </div>

            <button
              onClick={() => navigateTo('booking-summary')}
              disabled={selectedSeats.length === 0}
              className="w-full py-4 bg-primary-container text-on-primary-container font-title-md text-base rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-primary-container/30 uppercase tracking-wider font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Confirm Seats</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-center font-label-sm text-[10px] text-on-surface-variant mt-3 opacity-60">
              No payment required. Directly confirm reservation.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};
