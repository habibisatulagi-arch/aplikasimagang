import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  BookOpen,
  FileCheck2,
  User,
  Layers
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, lamaranList, logbook, user, deviceViewMode } = useApp();

  const pendingLogbookCount = logbook.filter((l) => !l.parafGuru).length;
  const activeLamaranCount = lamaranList.length;

  const navItems = [
    {
      id: 'beranda' as const,
      label: 'Beranda',
      icon: Compass,
      badge: null,
      description: 'Cari lowongan magang pemula',
    },
    {
      id: 'jurnal' as const,
      label: 'Jurnal',
      icon: BookOpen,
      badge: user.statusMagang === 'sedang_magang' && pendingLogbookCount > 0 ? pendingLogbookCount : null,
      description: 'Logbook harian & input suara',
    },
    {
      id: 'lamaran' as const,
      label: 'Lamaran',
      icon: FileCheck2,
      badge: activeLamaranCount > 0 ? activeLamaranCount : null,
      description: 'Lacak status lamaran magang',
    },
    {
      id: 'profil' as const,
      label: 'Profil',
      icon: User,
      badge: null,
      description: 'Data diri siswa & aksesibilitas',
    },
    {
      id: 'arsitektur' as const,
      label: 'Arsitektur',
      icon: Layers,
      badge: '4 Dok',
      description: 'Struktur folder & skema data JSON',
    },
  ];

  // If in desktop/laptop responsive mode, hide bottom bar on screens md and wider
  const hideOnDesktopClass = deviceViewMode === 'responsive' ? 'md:hidden' : '';

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 shadow-lg safe-bottom ${hideOnDesktopClass}`}
      aria-label="Menu Navigasi Mobile"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-stretch h-18 px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 transition-all group ${
                isActive
                  ? 'text-sky-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
              aria-label={`${item.label}: ${item.description}${isActive ? ' (Halaman aktif)' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active top line accent */}
              {isActive && (
                <span className="absolute top-0 left-2 right-2 h-0.5 bg-sky-600 rounded-full" />
              )}

              <div className="relative flex items-center justify-center w-7 h-7">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'group-hover:scale-105'
                  }`}
                  aria-hidden="true"
                />

                {item.badge !== null && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[16px] h-4 text-[9px] font-bold bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[11px] leading-tight mt-0.5 truncate max-w-full tracking-tight ${
                isActive ? 'text-sky-700 font-bold' : 'text-slate-600 font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
