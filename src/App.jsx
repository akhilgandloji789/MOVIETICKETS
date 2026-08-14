import React from 'react';
import './firebase';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { TrailerModal } from './components/TrailerModal';
import { CompareModal } from './components/CompareModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';

import { HomePage } from './pages/HomePage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { SeatBookingPage } from './pages/SeatBookingPage';
import { BookingSummaryPage } from './pages/BookingSummaryPage';
import { DigitalTicketPage } from './pages/DigitalTicketPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { TheatresPage } from './pages/TheatresPage';
import { OffersPage } from './pages/OffersPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const MainLayout = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'movies':
        return <DiscoveryPage />;
      case 'movie-details':
        return <MovieDetailsPage />;
      case 'seat-booking':
        return <SeatBookingPage />;
      case 'booking-summary':
        return <BookingSummaryPage />;
      case 'digital-ticket':
        return <DigitalTicketPage />;
      case 'my-bookings':
        return <MyBookingsPage />;
      case 'watchlist':
        return <WatchlistPage />;
      case 'theatres':
        return <TheatresPage />;
      case 'offers':
        return <OffersPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest text-on-surface">
      <Navbar />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />

      {/* Global Modals & Overlays */}
      <Toast />
      <TrailerModal />
      <CompareModal />
      <SearchModal />
      <NotificationsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
