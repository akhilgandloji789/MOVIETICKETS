import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const DigitalTicketPage = () => {
  const { activeBooking, navigateTo, showToast } = useApp();

  const ticket = activeBooking || {
    id: "CN-984-XLV2",
    movieTitle: "Eclipse of Time",
    moviePoster: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCNH6mGs5kkxVx86wG5e_PVdv92ZvbPByo89oVTMBNm4P50sIngxMJkAjJ19UwtKbWl-8rsj-2FrCybtge9r7oGQHU20BkHb7juT17vo3kVuwfHBX3OIgM_QOJd6RYjayYHcq_usCBroVfANQNW3kgpfK5l_M8yFBNzex2l3be7maLyG_-738nRoAqwQsSh0AhfmXZSOcKPE0uwQ8hU1dYfGZLDMFHwrvA66FqIVCj1me1hFnc31w9",
    movieBackdrop: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuCRL4ynSL8A4B_OIpgeIncG8HPGGAX-vAV4dqTUbQ-Zrbp06DeZjGs6pUUzswPaLdBpeIPlAa4bi4XZlv6GezWAc3zyogdSZ7WSrfjMmeO-F1vS7cemwqm7nqtCgDZpP4-kw3VHk2tW2vyPaZDabcyunfE7-IJ5U_cx-7Qx_Kb6_CPdyK6LK76hwHrPykp8ROm0oI8hc7mtYxsVWKgE0tK8Oeroh_Xn9u02lyOoZGxSaWCUyh7Ccf",
    theatreName: "CineNoir Grand",
    location: "Downtown District",
    screen: "Screen 04 — Atmos VIP",
    date: "Oct 24, 2026",
    showtime: "21:30",
    format: "IMAX 2D",
    seats: ["J12", "J13"],
    seatType: "Recliner Duo",
    paidAmount: 450,
    status: "Confirmed"
  };

  useEffect(() => {
    // Fire festive cinematic confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffb1c3', '#5a2132', '#e0e3e7']
    });
  }, []);

  const handleDownload = () => {
    showToast(`Downloading Digital Ticket PDF (${ticket.id})...`, "success");
  };

  const handleCalendar = () => {
    showToast(`Showtime (${ticket.date} at ${ticket.showtime}) added to your Calendar! 📅`, "info");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `CineNoir Ticket: ${ticket.movieTitle}`,
        text: `I'm watching ${ticket.movieTitle} at ${ticket.theatreName}! Booking ID: ${ticket.id}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`CineNoir Ticket: ${ticket.movieTitle} | ID: ${ticket.id}`);
      showToast("Ticket details copied to clipboard! 📋", "info");
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full relative z-10 projector-glow pt-28">
      {/* Header Section */}
      <div className="text-center mb-stack-lg animate-fade-in">
        <span className="material-symbols-outlined text-primary text-6xl mb-stack-sm block" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-4xl text-on-surface mb-1">
          Reservation Confirmed!
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Your premium cinematic experience awaits at {ticket.theatreName}.
        </p>
      </div>

      {/* Digital Ticket Container */}
      <div className="w-full max-w-4xl relative mb-stack-lg group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent blur-xl opacity-60 group-hover:opacity-80 transition duration-1000"></div>
        <div className="relative flex flex-col md:flex-row w-full rounded-xl overflow-hidden shadow-2xl glass-panel">
          
          {/* Movie Info Section */}
          <div className="flex-grow p-6 md:p-8 flex flex-col justify-between relative">
            <div className="absolute inset-0 z-0 opacity-20">
              <img src={ticket.movieBackdrop} alt="Backdrop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-label-sm text-xs text-primary uppercase tracking-widest mb-1 font-bold">Booking ID</p>
                  <p className="font-label-sm text-sm text-on-surface font-bold">{ticket.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-xs text-primary uppercase tracking-widest mb-1 font-bold">Theatre</p>
                  <p className="font-title-md text-base text-on-surface font-semibold">{ticket.theatreName}</p>
                  <p className="font-body-md text-xs text-on-surface-variant">{ticket.screen}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface leading-tight mb-2">
                  {ticket.movieTitle}
                </h2>
                <p className="font-body-md text-xs text-on-surface-variant max-w-md">
                  Format: <span className="text-primary font-bold">{ticket.format}</span> • Status: <span className="text-tertiary font-bold">{ticket.status}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto pt-4 border-t border-white/10">
                <div>
                  <p className="font-label-sm text-xs text-primary mb-1">Date</p>
                  <p className="font-body-md text-sm text-on-surface font-semibold">{ticket.date}</p>
                </div>
                <div>
                  <p className="font-label-sm text-xs text-primary mb-1">Time</p>
                  <p className="font-body-md text-sm text-on-surface font-semibold">{ticket.showtime}</p>
                </div>
                <div>
                  <p className="font-label-sm text-xs text-primary mb-1">Seats</p>
                  <p className="font-body-md text-sm text-on-surface font-bold text-primary">{ticket.seats.join(', ')}</p>
                </div>
                <div>
                  <p className="font-label-sm text-xs text-primary mb-1">Type</p>
                  <p className="font-body-md text-sm text-on-surface">{ticket.seatType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Perforation Line */}
          <div className="hidden md:block w-px perforation my-4 z-10"></div>
          <div className="md:hidden h-px w-full perforation-horizontal mx-4 z-10"></div>

          {/* QR Code Section */}
          <div className="w-full md:w-72 bg-surface-container-low p-6 flex flex-col items-center justify-center relative z-10 shrink-0">
            <p className="font-label-sm text-xs text-on-surface-variant text-center mb-4 uppercase tracking-widest">
              Scan at Entry
            </p>

            <div className="bg-white p-4 rounded-xl mb-4 shadow-xl">
              {/* Dynamic SVG QR Matrix */}
              <svg className="w-36 h-36" viewBox="0 0 100 100">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" fill="#0b0f12" />
                <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" fill="#0b0f12" />
                <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" fill="#0b0f12" />
                <rect x="40" y="5" width="20" height="10" fill="#5a2132" />
                <rect x="45" y="20" width="10" height="20" fill="#0b0f12" />
                <rect x="15" y="40" width="25" height="15" fill="#5a2132" />
                <rect x="50" y="45" width="20" height="20" fill="#0b0f12" />
                <rect x="75" y="40" width="20" height="15" fill="#5a2132" />
                <rect x="40" y="75" width="25" height="15" fill="#0b0f12" />
                <rect x="70" y="70" width="25" height="25" fill="#5a2132" />
              </svg>
            </div>

            <p className="font-label-sm text-xs text-on-surface text-center opacity-70">
              Admit {ticket.seats.length} Person(s)
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl justify-center mb-8">
        <button
          onClick={handleDownload}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-container text-on-primary-container rounded-full hover:bg-primary hover:text-on-primary transition-colors font-label-sm text-xs uppercase tracking-widest shadow-lg font-bold"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Download PDF
        </button>

        <button
          onClick={handleCalendar}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-high text-on-surface rounded-full border border-white/10 hover:bg-surface-container-highest transition-all font-label-sm text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">calendar_month</span>
          Add to Calendar
        </button>

        <button
          onClick={handleShare}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-high text-on-surface rounded-full border border-white/10 hover:bg-surface-container-highest transition-all font-label-sm text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">share</span>
          Share Ticket
        </button>
      </div>

      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Home
      </button>
    </div>
  );
};
