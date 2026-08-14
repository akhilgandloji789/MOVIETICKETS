import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TheatresPage = () => {
  const { theatres, location, setLocation, navigateTo } = useApp();
  const [filterFormat, setFilterFormat] = useState('All');
  const [sortBy, setSortBy] = useState('Nearest');

  const formats = ['All', 'IMAX 3D', '4DX', 'Dolby Atmos', 'Dolby Cinema', 'Standard'];

  const filteredTheatres = theatres.filter(t => 
    filterFormat === 'All' || t.formats.some(f => f.toLowerCase().includes(filterFormat.toLowerCase()))
  ).sort((a, b) => {
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    return parseFloat(a.distance) - parseFloat(b.distance); // Nearest default
  });

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-4xl text-on-surface mb-1">
            Smart Theatre Discovery
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Explore premium theatres around {location} equipped with IMAX & Dolby Atmos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-high px-3 py-2 rounded-lg border border-white/10">
            <span className="material-symbols-outlined text-primary text-sm">location_on</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none text-xs font-label-sm text-on-surface outline-none cursor-pointer"
            >
              <option value="Downtown District">Downtown District</option>
              <option value="Westside Heights">Westside Heights</option>
              <option value="Uptown Plaza">Uptown Plaza</option>
              <option value="Midtown Bay">Midtown Bay</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container-high border border-white/10 rounded-lg px-3 py-2 text-xs font-label-sm text-on-surface outline-none cursor-pointer"
          >
            <option value="Nearest">Nearest First</option>
            <option value="Highest Rated">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Format Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
        {formats.map(fmt => (
          <button
            key={fmt}
            onClick={() => setFilterFormat(fmt)}
            className={`px-4 py-2 rounded-full border text-xs font-label-sm transition-colors ${
              filterFormat === fmt
                ? 'border-primary text-primary bg-primary-container/30 font-bold'
                : 'border-white/10 text-on-surface-variant hover:border-white/30'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Theatres Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {filteredTheatres.map(theatre => (
          <div
            key={theatre.id}
            className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline-lg-mobile text-2xl text-on-surface mb-1">{theatre.name}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant flex items-center">
                    <span className="material-symbols-outlined text-xs mr-1">near_me</span> {theatre.location} • {theatre.distance}
                  </p>
                </div>
                <div className="bg-surface-container-highest px-3 py-1 rounded text-xs font-label-sm text-primary font-bold">
                  ⭐ {theatre.rating}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {theatre.amenities.map(a => (
                  <span key={a} className="text-[10px] font-label-sm px-2.5 py-1 bg-surface-container border border-white/10 rounded text-on-surface-variant uppercase">
                    {a}
                  </span>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <p className="font-label-sm text-xs text-primary mb-3 uppercase tracking-wider font-bold">Available Formats & Showtimes</p>
                <div className="space-y-3">
                  {Object.entries(theatre.shows).map(([format, showtimes]) => (
                    <div key={format} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="w-28 text-xs font-label-sm text-on-surface-variant font-bold">{format}:</span>
                      <div className="flex flex-wrap gap-2">
                        {showtimes.map(t => (
                          <button
                            key={t}
                            onClick={() => navigateTo('movies')}
                            className="px-3 py-1 bg-surface-container border border-white/10 rounded text-[11px] font-label-sm hover:border-primary text-on-surface"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('movies')}
              className="w-full py-3 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg hover:bg-primary uppercase tracking-wider font-bold"
            >
              Select Movie & Book Tickets
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
