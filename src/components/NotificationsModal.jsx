import React from 'react';
import { useApp } from '../context/AppContext';

export const NotificationsModal = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, setNotifications } = useApp();

  if (!isNotificationsOpen) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-4 md:pr-16 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-surface-container-lowest border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <h3 className="font-headline-lg-mobile text-lg text-on-surface">Notifications</h3>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={markAllRead} className="text-xs text-primary hover:underline font-label-sm">
              Mark all read
            </button>
            <button onClick={() => setIsNotificationsOpen(false)} className="text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto divide-y divide-white/5">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">
              <p>No notifications yet.</p>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-4 transition-colors ${!n.read ? 'bg-primary-container/10 border-l-2 border-primary' : 'hover:bg-white/5'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-title-md text-sm text-on-surface">{n.title}</h4>
                  <span className="font-label-sm text-[10px] text-on-surface-variant opacity-60">{n.time}</span>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant">{n.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
