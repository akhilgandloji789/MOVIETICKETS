import React from 'react';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { userProfile, bookings, watchlist, navigateTo } = useApp();

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Profile Header */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={userProfile.avatar}
          alt={userProfile.name}
          className="w-24 h-24 rounded-full border-2 border-primary object-cover shadow-xl"
        />
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl text-on-surface">{userProfile.name}</h1>
            <span className="bg-primary-container/40 text-primary font-label-sm text-xs px-3 py-1 rounded-full border border-primary/30 font-bold self-center md:self-auto">
              CineNoir VIP Member
            </span>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant mb-4">{userProfile.email}</p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {userProfile.favoriteGenres.map(g => (
              <span key={g} className="font-label-sm text-[10px] bg-surface-container px-3 py-1 rounded-full border border-white/10 text-on-surface">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl text-on-surface mb-6">
        Personal Cinema Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-10">
        <div className="glass-panel p-6 rounded-xl border border-white/10">
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-2">Movies Watched</p>
          <p className="font-display-lg text-4xl text-on-surface font-bold">14</p>
          <p className="font-label-sm text-[10px] text-tertiary mt-2">↑ 3 this month</p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10">
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-2">Total Bookings</p>
          <p className="font-display-lg text-4xl text-primary font-bold">{bookings.length}</p>
          <p className="font-label-sm text-[10px] text-on-surface-variant mt-2">Active reservations</p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10">
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-2">Favorite Format</p>
          <p className="font-display-lg text-2xl text-on-surface font-bold mt-2">IMAX 3D</p>
          <p className="font-label-sm text-[10px] text-on-surface-variant mt-2">68% of bookings</p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10">
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-2">Watchlist Saved</p>
          <p className="font-display-lg text-4xl text-on-surface font-bold">{watchlist.length}</p>
          <p className="font-label-sm text-[10px] text-primary mt-2">Click to view</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Monthly Activity Bar Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-title-md text-base text-on-surface mb-6 border-b border-white/10 pb-3 font-bold">
            Monthly Viewing Activity (2026)
          </h3>
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4">
            {[
              { month: 'Jan', count: 2 },
              { month: 'Feb', count: 4 },
              { month: 'Mar', count: 3 },
              { month: 'Apr', count: 1 },
              { month: 'May', count: 5 },
              { month: 'Jun', count: 6 },
              { month: 'Jul', count: 8 },
              { month: 'Aug', count: 4 }
            ].map(item => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="font-label-sm text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.count}
                </span>
                <div
                  style={{ height: `${(item.count / 8) * 100}%` }}
                  className="w-full bg-primary-container rounded-t-md hover:bg-primary transition-all duration-300 border-t border-primary"
                ></div>
                <span className="font-label-sm text-[10px] text-on-surface-variant">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formats Breakdown Donut/Pie Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
          <h3 className="font-title-md text-base text-on-surface w-full text-left mb-4 border-b border-white/10 pb-3 font-bold">
            Format Preference
          </h3>

          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#5a2132" strokeWidth="4.5" />
              <path strokeDasharray="25, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ffb1c3" strokeWidth="4.5" />
              <path strokeDasharray="15, 100" strokeDashoffset="-85" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#9bd49f" strokeWidth="4.5" />
            </svg>
            <div className="absolute text-center">
              <span className="font-title-md text-xl text-on-surface font-bold">60%</span>
              <span className="block font-label-sm text-[9px] text-on-surface-variant">IMAX</span>
            </div>
          </div>

          <div className="w-full space-y-2 mt-4 font-label-sm text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span> IMAX 2D / 3D</span>
              <span className="font-bold">60%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> 4DX Motion</span>
              <span className="font-bold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Dolby Cinema</span>
              <span className="font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
