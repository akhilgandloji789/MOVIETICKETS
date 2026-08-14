import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const BookingSummaryPage = () => {
  const {
    selectedMovie,
    selectedTheatre,
    selectedDate,
    selectedShowtime,
    selectedFormat,
    selectedSeats,
    appliedOffer,
    setAppliedOffer,
    offers,
    confirmReservation,
    showToast
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  const seatPrice = 300;
  const subtotal = selectedSeats.length * seatPrice;

  let discountAmount = 0;
  if (appliedOffer) {
    discountAmount = Math.min((subtotal * appliedOffer.discountPercent) / 100, appliedOffer.maxDiscount);
  }

  const finalTotal = Math.max(subtotal - discountAmount, 0);

  const applyPromo = (code) => {
    const codeToTest = code || promoInput.trim().toUpperCase();
    const found = offers.find(o => o.code === codeToTest);
    if (found) {
      setAppliedOffer(found);
      setPromoInput('');
      showToast(`Offer "${found.code}" applied! Discount: ₹${Math.min((subtotal * found.discountPercent) / 100, found.maxDiscount)}`, "success");
    } else {
      showToast("Invalid Offer Code. Try WELCOME50 or WEEKEND15", "error");
    }
  };

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl text-on-surface mb-2">
          Reservation Summary
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Review your cinema experience details before confirming.
        </p>
      </div>

      {/* No Payment Warning Banner */}
      <div className="mb-8 p-4 bg-primary-container/20 border border-primary/40 rounded-xl flex items-center gap-3 text-on-surface">
        <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
        <div>
          <h4 className="font-title-md text-sm text-primary font-bold">NO PAYMENT REQUIRED</h4>
          <p className="font-body-md text-xs text-on-surface-variant">
            This portal confirms instant reservations. No credit card, UPI, or payment gateway details needed!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Left Column: Movie & Showtime Card */}
        <div className="md:col-span-7 glass-panel p-6 rounded-xl border border-white/10 flex flex-col gap-6">
          <div className="flex gap-4 items-center pb-4 border-b border-white/10">
            <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-20 h-28 object-cover rounded-lg shrink-0 border border-white/10" />
            <div>
              <span className="bg-primary/20 text-primary font-label-sm text-[10px] px-2 py-0.5 rounded border border-primary/30 uppercase">
                {selectedFormat}
              </span>
              <h3 className="font-headline-lg-mobile text-xl text-on-surface mt-1">{selectedMovie.title}</h3>
              <p className="font-body-md text-xs text-on-surface-variant">{selectedMovie.duration} • {selectedMovie.certification}</p>
            </div>
          </div>

          <div className="space-y-3 font-body-md text-sm">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Theatre</span>
              <span className="text-on-surface font-semibold">{selectedTheatre.name}</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Location</span>
              <span className="text-on-surface">{selectedTheatre.location}</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Date</span>
              <span className="text-on-surface">{selectedDate}</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Showtime</span>
              <span className="text-primary font-bold">{selectedShowtime}</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Seats ({selectedSeats.length})</span>
              <span className="text-on-surface font-bold text-primary">{selectedSeats.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Offers */}
        <div className="md:col-span-5 glass-panel p-6 rounded-xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-title-md text-lg text-on-surface mb-4 border-b border-white/10 pb-3 font-bold">
              Price Breakdown
            </h3>

            <div className="space-y-3 font-body-md text-sm mb-6">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Tickets ({selectedSeats.length} × ₹{seatPrice})</span>
                <span className="text-on-surface">₹{subtotal}</span>
              </div>

              {appliedOffer && (
                <div className="flex justify-between items-center text-tertiary">
                  <span>Offer ({appliedOffer.code})</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-on-surface font-bold text-base">
                <span>Total Amount</span>
                <span className="text-primary text-xl font-bold">₹{finalTotal}</span>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="mb-6">
              <p className="font-label-sm text-xs text-on-surface-variant mb-2 uppercase tracking-widest">Apply Special Offer</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code (e.g. WELCOME50)"
                  className="bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-xs font-label-sm w-full outline-none focus:border-primary text-on-surface uppercase"
                />
                <button
                  onClick={() => applyPromo()}
                  className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-sm text-xs font-bold hover:bg-primary uppercase"
                >
                  Apply
                </button>
              </div>

              {/* Sample Coupons Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {offers.map(off => (
                  <button
                    key={off.id}
                    onClick={() => applyPromo(off.code)}
                    className="text-[10px] font-label-sm px-2 py-1 bg-surface-container rounded border border-white/10 hover:border-primary text-primary"
                  >
                    {off.code} ({off.badge})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={confirmReservation}
            className="w-full py-4 bg-primary-container text-on-primary-container font-title-md text-base rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-xl shadow-primary-container/30 uppercase tracking-wider font-bold"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
};
