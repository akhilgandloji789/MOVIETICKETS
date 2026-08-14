import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const {
    currentView,
    navigateTo,
    location,
    setLocation,
    userRole,
    setUserRole,
    setIsSearchOpen,
    setIsNotificationsOpen,
    notifications,
    watchlist,
    userProfile
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const cities = ['Downtown District', 'Westside Heights', 'Uptown Plaza', 'Midtown Bay', 'Mumbai', 'New York', 'London'];

  return (
    <header className="bg-surface/70 backdrop-blur-3xl fixed top-0 w-full z-40 border-b border-white/5 shadow-none flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto transition-all duration-300">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigateTo('home')}
          className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-primary uppercase tracking-tighter hover:opacity-90 transition-opacity"
        >
          CineNoir
        </button>

        {/* User / Admin Role Toggle Pill */}
        <button
          onClick={() => setUserRole(userRole === 'user' ? 'admin' : 'user')}
          className="hidden sm:flex items-center gap-1 px-3 py-1 bg-surface-container-high rounded-full border border-white/10 text-xs font-label-sm hover:border-primary/50 transition-colors"
          title="Toggle User/Admin View"
        >
          <span className="material-symbols-outlined text-sm text-primary">
            {userRole === 'admin' ? 'admin_panel_settings' : 'person'}
          </span>
          <span className="text-on-surface uppercase tracking-wider">{userRole}</span>
        </button>
      </div>

      {/* Navigation Links (Web) */}
      <nav className="hidden md:flex gap-gutter items-center">
        <button
          onClick={() => navigateTo('home')}
          className={`font-label-sm text-label-sm transition-colors duration-300 ${
            currentView === 'home'
              ? 'text-primary font-bold border-b-2 border-primary pb-1'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => navigateTo('movies')}
          className={`font-label-sm text-label-sm transition-colors duration-300 ${
            currentView === 'movies'
              ? 'text-primary font-bold border-b-2 border-primary pb-1'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => navigateTo('theatres')}
          className={`font-label-sm text-label-sm transition-colors duration-300 ${
            currentView === 'theatres'
              ? 'text-primary font-bold border-b-2 border-primary pb-1'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Theatres
        </button>
        <button
          onClick={() => navigateTo('offers')}
          className={`font-label-sm text-label-sm transition-colors duration-300 ${
            currentView === 'offers'
              ? 'text-primary font-bold border-b-2 border-primary pb-1'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Offers
        </button>
        <button
          onClick={() => navigateTo('my-bookings')}
          className={`font-label-sm text-label-sm transition-colors duration-300 ${
            currentView === 'my-bookings'
              ? 'text-primary font-bold border-b-2 border-primary pb-1'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          My Bookings
        </button>
        {userRole === 'admin' && (
          <button
            onClick={() => navigateTo('admin')}
            className={`font-label-sm text-label-sm transition-colors duration-300 text-primary font-bold border border-primary/40 px-3 py-1 rounded-md hover:bg-primary-container ${
              currentView === 'admin' ? 'bg-primary-container' : ''
            }`}
          >
            Admin Panel
          </button>
        )}
      </nav>

      {/* Trailing Actions */}
      <div className="flex items-center gap-stack-md">
        {/* Quick Search Bar */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="relative hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-white/10 hover:border-primary/50 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <span className="text-on-surface-variant/70 font-body-md text-sm ml-2 w-36">
            Search movies...
          </span>
        </div>

        {/* Location Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm"
          >
            <span className="material-symbols-outlined text-lg">location_on</span>
            <span className="hidden sm:inline">{location}</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>

          {isLocationOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
              <p className="px-4 py-1.5 font-label-sm text-[10px] text-primary uppercase tracking-widest">
                Select City
              </p>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setLocation(city);
                    setIsLocationOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-body-md text-sm hover:bg-surface-container-highest transition-colors ${
                    location === city ? 'text-primary font-semibold' : 'text-on-surface'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Icons Area */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Watchlist Counter */}
          <button
            onClick={() => navigateTo('watchlist')}
            className="relative text-on-surface-variant hover:text-primary transition-colors p-1"
            title="Watchlist"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-sm text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {watchlist.length}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative text-on-surface-variant hover:text-primary transition-colors p-1"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-sm text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-on-surface-variant hover:text-primary transition-colors p-1 lg:hidden"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => navigateTo('profile')}
            className="hover:scale-105 transition-transform p-0.5 rounded-full border border-white/20 hover:border-primary"
            title="Profile"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 inset-x-0 bg-surface-container-lowest/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6 shadow-2xl flex flex-col gap-4 z-50 animate-fade-in">
          <button
            onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5"
          >
            Home
          </button>
          <button
            onClick={() => { navigateTo('movies'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5"
          >
            Movies
          </button>
          <button
            onClick={() => { navigateTo('theatres'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5"
          >
            Theatres
          </button>
          <button
            onClick={() => { navigateTo('offers'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5"
          >
            Offers
          </button>
          <button
            onClick={() => { navigateTo('my-bookings'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5"
          >
            My Bookings
          </button>
          <button
            onClick={() => { navigateTo('watchlist'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5 flex justify-between items-center"
          >
            <span>Watchlist</span>
            <span className="bg-primary text-on-primary font-label-sm text-xs px-2 py-0.5 rounded-full">{watchlist.length}</span>
          </button>
          <button
            onClick={() => { navigateTo('profile'); setIsMobileMenuOpen(false); }}
            className="text-left font-title-md text-lg text-on-surface hover:text-primary py-2 border-b border-white/5"
          >
            User Profile
          </button>
          {userRole === 'admin' && (
            <button
              onClick={() => { navigateTo('admin'); setIsMobileMenuOpen(false); }}
              className="text-left font-title-md text-lg text-primary py-2 border-b border-white/5 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Admin Dashboard
            </button>
          )}

          <div className="pt-2 flex justify-between items-center">
            <span className="font-label-sm text-xs text-on-surface-variant">Switch Mode:</span>
            <button
              onClick={() => setUserRole(userRole === 'user' ? 'admin' : 'user')}
              className="px-4 py-1.5 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg"
            >
              Mode: {userRole.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
