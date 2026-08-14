import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { navigateTo, recentlyViewed } = useApp();

  return (
    <footer className="bg-surface-container-lowest w-full py-stack-lg border-t border-white/5 shadow-none mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 mb-8 md:mb-0">
          <button
            onClick={() => navigateTo('home')}
            className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase tracking-tighter block mb-4 text-left"
          >
            CineNoir
          </button>
          <p className="text-on-surface-variant font-body-md text-body-md max-w-xs">
            The Art of Cinema. High-end movie booking experience designed with Masterpiece Red.
          </p>
          <div className="flex gap-4 mt-6">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              share
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              movie
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              theater_comedy
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <h4 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-1">Explore</h4>
            <button onClick={() => navigateTo('movies')} className="text-left text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs">
              Now Showing
            </button>
            <button onClick={() => navigateTo('movies')} className="text-left text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs">
              Coming Soon
            </button>
            <button onClick={() => navigateTo('theatres')} className="text-left text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs">
              IMAX Theatres
            </button>
            <button onClick={() => navigateTo('offers')} className="text-left text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs">
              Special Offers
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-1">Company</h4>
            <span className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs cursor-pointer">
              About CineNoir
            </span>
            <span className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs cursor-pointer">
              Terms of Service
            </span>
            <span className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-xs cursor-pointer">
              Support & FAQs
            </span>
          </div>
        </div>

        {/* Recently Viewed Movies Column */}
        <div className="col-span-1">
          <h4 className="font-title-md text-title-md text-on-surface mb-4">Recently Viewed</h4>
          {recentlyViewed.length === 0 ? (
            <p className="font-label-sm text-xs text-on-surface-variant opacity-60">
              Movies you explore will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {recentlyViewed.slice(0, 2).map(movie => (
                <div
                  key={movie.id}
                  onClick={() => navigateTo('movie-details', movie)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-14 bg-surface-dim rounded border border-white/5 overflow-hidden flex-shrink-0">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-body-md text-xs text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {movie.title}
                    </p>
                    <p className="font-label-sm text-[10px] text-on-surface-variant">
                      ⭐ {movie.rating} • {movie.genre[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg pt-4 border-t border-white/5 flex justify-between items-center text-on-surface-variant font-label-sm text-xs opacity-60">
        <p>© 2026 CineNoir Portal. Masterpiece Red Edition. All rights reserved.</p>
        <p className="hidden sm:block">NO PAYMENT REQUIRED — RESERVATION DEMO</p>
      </div>
    </footer>
  );
};
