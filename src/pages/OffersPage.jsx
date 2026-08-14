import React from 'react';
import { useApp } from '../context/AppContext';

export const OffersPage = () => {
  const { offers, setAppliedOffer, navigateTo, showToast } = useApp();

  const handleApplyOffer = (offer) => {
    setAppliedOffer(offer);
    showToast(`Coupon code "${offer.code}" activated! Head to seat selection.`, "success");
    navigateTo('movies');
  };

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      <div className="mb-8 text-center max-w-xl mx-auto">
        <span className="bg-primary/20 text-primary font-label-sm text-xs px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest font-bold mb-3 inline-block">
          PROMOTIONS & PERKS
        </span>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-4xl text-on-surface mb-2">
          Special Cinema Offers
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Save on tickets with exclusive promotional promo codes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {offers.map(offer => (
          <div
            key={offer.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-primary/40 transition-all"
          >
            <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container font-label-sm text-xs font-bold px-4 py-1 rounded-bl-xl border-l border-b border-primary/40">
              {offer.badge}
            </div>

            <div>
              <h3 className="font-headline-lg-mobile text-xl text-on-surface mb-2 pr-16">{offer.title}</h3>
              <p className="font-body-md text-xs text-on-surface-variant mb-6">{offer.description}</p>
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase block">Promo Code</span>
                <span className="font-label-sm text-base text-primary font-bold tracking-widest">{offer.code}</span>
              </div>

              <button
                onClick={() => handleApplyOffer(offer)}
                className="w-full sm:w-auto px-6 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg hover:bg-primary uppercase font-bold tracking-wider"
              >
                Apply Coupon
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
