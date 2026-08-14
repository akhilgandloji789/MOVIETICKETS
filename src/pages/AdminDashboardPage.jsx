import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminDashboardPage = () => {
  const { movies, bookings, addMovie, deleteMovie, checkInBooking, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'movies' | 'scanner'
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // New Movie Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Sci-Fi');
  const [newDirector, setNewDirector] = useState('');
  const [newDuration, setNewDuration] = useState('130 min');
  const [newRating, setNewRating] = useState(8.5);

  const handleAddMovieSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newMovieObj = {
      id: `m-${Date.now()}`,
      title: newTitle,
      rating: parseFloat(newRating),
      votes: "1.2K",
      genre: [newGenre, "Thriller"],
      duration: newDuration,
      language: "English",
      certification: "PG-13",
      releaseDate: new Date().toISOString().split('T')[0],
      formats: ["IMAX 2D", "Standard"],
      director: newDirector || "Admin Producer",
      cast: ["Lead Actor", "Co-Star"],
      synopsis: `${newTitle} is a new theatrical release managed via the CineNoir Admin Console.`,
      poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCNH6mGs5kkxVx86wG5e_PVdv92ZvbPByo89oVTMBNm4P50sIngxMJkAjJ19UwtKbWl-8rsj-2FrCybtge9r7oGQHU20BkHb7juT17vo3kVuwfHBX3OIgM_QOJd6RYjayYHcq_usCBroVfANQNW3kgpfK5l_M8yFBNzex2l3be7maLyG_-738nRoAqwQsSh0AhfmXZSOcKPE0uwQ8hU1dYfGZLDMFHwrvA66FqIVCj1me1hFnc31w9",
      backdrop: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuCRL4ynSL8A4B_OIpgeIncG8HPGGAX-vAV4dqTUbQ-Zrbp06DeZjGs6pUUzswPaLdBpeIPlAa4bi4XZlv6GezWAc3zyogdSZ7WSrfjMmeO-F1vS7cemwqm7nqtCgDZpP4-kw3VHk2tW2vyPaZDabcyunfE7-IJ5U_cx-7Qx_Kb6_CPdyK6LK76hwHrPykp8ROm0oI8hc7mtYxsVWKgE0tK8Oeroh_Xn9u02lyOoZGxSaWCUyh7Ccf",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isTrending: true,
      isNowShowing: true,
      isComingSoon: false,
      featured: false
    };

    addMovie(newMovieObj);
    setIsAddModalOpen(false);
    setNewTitle('');
  };

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    const res = checkInBooking(scanInput.trim());
    setScanResult(res);
  };

  return (
    <div className="pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface">
              Management Console
            </h1>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant mt-1">
            Real-time metrics, inventory management, and ticket QR verification.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-label-sm text-xs transition-colors ${
              activeTab === 'overview' ? 'bg-primary-container text-on-primary-container font-bold' : 'bg-surface-container-high text-on-surface'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-4 py-2 rounded-lg font-label-sm text-xs transition-colors ${
              activeTab === 'movies' ? 'bg-primary-container text-on-primary-container font-bold' : 'bg-surface-container-high text-on-surface'
            }`}
          >
            Manage Movies ({movies.length})
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-2 rounded-lg font-label-sm text-xs transition-colors ${
              activeTab === 'scanner' ? 'bg-primary-container text-on-primary-container font-bold' : 'bg-surface-container-high text-on-surface'
            }`}
          >
            QR Ticket Scanner
          </button>
        </div>
      </header>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Bento Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-dim border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <span className="material-symbols-outlined absolute top-4 right-4 text-5xl text-primary/10 group-hover:text-primary/20 transition-colors">
                confirmation_number
              </span>
              <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">Total Bookings</h3>
              <div className="flex items-baseline gap-3">
                <span className="font-display-lg text-4xl text-on-surface font-bold">{bookings.length + 1240}</span>
                <span className="font-label-sm text-xs text-tertiary font-bold">+12%</span>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-3 opacity-60">Last 7 days activity</p>
            </div>

            <div className="bg-surface-dim border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <span className="material-symbols-outlined absolute top-4 right-4 text-5xl text-primary/10 group-hover:text-primary/20 transition-colors">
                payments
              </span>
              <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">Est. Revenue</h3>
              <div className="flex items-baseline gap-3">
                <span className="font-display-lg text-4xl text-primary font-bold">₹425,000</span>
                <span className="font-label-sm text-xs text-tertiary font-bold">+8%</span>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-3 opacity-60">Current Month</p>
            </div>

            <div className="bg-surface-dim border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <span className="material-symbols-outlined absolute top-4 right-4 text-5xl text-primary/10 group-hover:text-primary/20 transition-colors">
                theaters
              </span>
              <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-3">Active Movies</h3>
              <div className="flex items-baseline gap-3">
                <span className="font-display-lg text-4xl text-on-surface font-bold">{movies.length}</span>
                <span className="font-label-sm text-xs text-on-surface-variant">Across 8 screens</span>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-3 opacity-60">Live Inventory</p>
            </div>
          </div>

          {/* Complex Layout Section: Seating & Recent Transactions Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <div className="lg:col-span-2 bg-surface-dim border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-title-md text-base text-on-surface font-bold">Recent Reservations</h3>
                <span className="font-label-sm text-xs text-primary">{bookings.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-body-md text-xs">
                  <thead>
                    <tr className="bg-surface/50 border-b border-white/10">
                      <th className="p-4 font-label-sm text-[10px] text-on-surface-variant uppercase">Booking ID</th>
                      <th className="p-4 font-label-sm text-[10px] text-on-surface-variant uppercase">Movie</th>
                      <th className="p-4 font-label-sm text-[10px] text-on-surface-variant uppercase">Seats</th>
                      <th className="p-4 font-label-sm text-[10px] text-on-surface-variant uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-primary">{b.id}</p>
                          <p className="font-label-sm text-[10px] text-on-surface-variant opacity-60">{b.date}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-on-surface">{b.movieTitle}</p>
                          <p className="font-label-sm text-[10px] text-on-surface-variant">{b.theatreName}</p>
                        </td>
                        <td className="p-4 font-bold text-on-surface">{b.seats.join(', ')}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'Checked In' ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-container/40 text-tertiary'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Occupancy Visualizer */}
            <div className="bg-surface-dim border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <h3 className="font-title-md text-base text-on-surface w-full text-left mb-4 font-bold">Live Occupancy</h3>
              <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-3 bg-surface-container-lowest/80 rounded-xl border border-white/5 p-4">
                <div className="w-full h-1 bg-primary/40 rounded shadow-[0_0_15px_rgba(255,177,195,0.4)] mb-2"></div>
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary border border-primary"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary border border-primary"></div>
                  <div className="w-3.5 h-3.5 rounded-sm border border-white/20"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary border border-primary"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-sm border border-white/20"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary border border-primary"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary border border-primary"></div>
                  <div className="w-3.5 h-3.5 rounded-sm border border-white/20"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-4">
                <div className="p-2 border border-white/5 rounded text-center">
                  <p className="font-label-sm text-[10px] text-on-surface-variant">Screen 1</p>
                  <p className="font-title-md text-lg text-primary font-bold">82%</p>
                </div>
                <div className="p-2 border border-white/5 rounded text-center">
                  <p className="font-label-sm text-[10px] text-on-surface-variant">Screen 4</p>
                  <p className="font-title-md text-lg text-primary font-bold">65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movies Management Tab */}
      {activeTab === 'movies' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-title-md text-xl text-on-surface font-bold">Movie Inventory</h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-primary-container text-on-primary-container font-label-sm text-xs rounded-lg hover:bg-primary font-bold flex items-center gap-1 uppercase"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span> Add New Movie
            </button>
          </div>

          <div className="space-y-4">
            {movies.map(movie => (
              <div
                key={movie.id}
                className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={movie.poster} alt={movie.title} className="w-12 h-16 object-cover rounded-lg shrink-0 border border-white/10" />
                  <div>
                    <h4 className="font-title-md text-base text-on-surface">{movie.title}</h4>
                    <p className="font-label-sm text-xs text-on-surface-variant">
                      ⭐ {movie.rating} • {movie.genre.join(', ')} • {movie.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    className="p-2 text-error hover:bg-error-container/30 rounded-lg transition-colors"
                    title="Delete Movie"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ticket Scanner Tab */}
      {activeTab === 'scanner' && (
        <div className="max-w-xl mx-auto glass-panel p-8 rounded-2xl border border-white/10 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-3">qr_code_scanner</span>
          <h3 className="font-headline-lg-mobile text-2xl text-on-surface mb-2">Staff QR Scanner Simulation</h3>
          <p className="font-body-md text-xs text-on-surface-variant mb-6">
            Enter or paste a customer's Booking ID (e.g. <span className="text-primary font-bold">CN-984-XLV2</span>) to validate entry.
          </p>

          <form onSubmit={handleScanSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Enter Booking ID (e.g. CN-984-XLV2)"
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 font-label-sm text-sm text-on-surface uppercase outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-container text-on-primary-container font-label-sm text-xs font-bold rounded-lg hover:bg-primary uppercase"
            >
              Verify
            </button>
          </form>

          {/* Quick Paste Buttons */}
          <div className="flex gap-2 justify-center mb-6">
            <span className="font-label-sm text-xs text-on-surface-variant self-center">Test Code:</span>
            <button
              onClick={() => setScanInput('CN-984-XLV2')}
              className="px-3 py-1 bg-surface-container border border-white/10 rounded font-label-sm text-xs text-primary font-bold"
            >
              CN-984-XLV2
            </button>
          </div>

          {scanResult && (
            <div className={`p-4 rounded-xl border font-body-md text-sm ${
              scanResult.success ? 'bg-primary-container/20 border-primary text-on-surface' : 'bg-error-container/30 border-error text-error-container'
            }`}>
              <p className="font-bold mb-1">{scanResult.message}</p>
              {scanResult.booking && (
                <div className="text-xs text-on-surface-variant mt-2 text-left space-y-1">
                  <p>Movie: <span className="text-on-surface font-semibold">{scanResult.booking.movieTitle}</span></p>
                  <p>Seats: <span className="text-primary font-bold">{scanResult.booking.seats.join(', ')}</span></p>
                  <p>Status: <span className="text-tertiary font-bold">{scanResult.booking.status}</span></p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Add Movie Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-surface-container-lowest border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-headline-lg-mobile text-xl text-on-surface mb-4">Add New Movie</h3>
            <form onSubmit={handleAddMovieSubmit} className="space-y-4 font-body-md text-xs">
              <div>
                <label className="block text-on-surface-variant mb-1">Movie Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg p-2.5 text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-on-surface-variant mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg p-2.5 text-on-surface outline-none"
                  >
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Action">Action</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Drama">Drama</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-on-surface-variant mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg p-2.5 text-on-surface outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1">Director</label>
                <input
                  type="text"
                  value={newDirector}
                  onChange={(e) => setNewDirector(e.target.value)}
                  placeholder="Director name"
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg p-2.5 text-on-surface outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 border border-white/10 rounded-lg font-label-sm text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-xs font-bold rounded-lg hover:bg-primary"
                >
                  Save Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
