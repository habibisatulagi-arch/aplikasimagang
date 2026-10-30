import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  SunMedium,
  Type,
  Smartphone,
  Monitor,
  GraduationCap,
  UserCheck,
  Building2,
  Compass,
  BookOpen,
  FileCheck2,
  User,
  Layers,
  Sparkles,
  Info,
  LogIn,
  LogOut,
  Flame
} from 'lucide-react';
import { FontSizeSetting } from '../../types';

export const Header: React.FC = () => {
  const {
    user,
    currentUser,
    signInWithGoogle,
    logOut,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    deviceViewMode,
    setDeviceViewMode,
    activeRole,
    setActiveRole,
    activeTab,
    setActiveTab,
    switchInternshipStatus,
    lamaranList,
    logbook,
  } = useApp();

  const fontLabels: Record<FontSizeSetting, string> = {
    small: 'Kecil',
    normal: 'Standar',
    large: 'Besar (+15%)',
    xlarge: 'X-Besar (+30%)',
  };

  const cycleFontSize = () => {
    const order: FontSizeSetting[] = ['normal', 'large', 'xlarge', 'small'];
    const nextIdx = (order.indexOf(fontSize) + 1) % order.length;
    setFontSize(order[nextIdx]);
  };

  const navLinks = [
    { id: 'beranda' as const, label: 'Lowongan Magang', icon: Compass },
    {
      id: 'jurnal' as const,
      label: 'Jurnal & Absensi',
      icon: BookOpen,
      badge: user.statusMagang === 'sedang_magang' ? logbook.filter((l) => !l.parafGuru).length : null,
    },
    {
      id: 'lamaran' as const,
      label: 'Status Lamaran',
      icon: FileCheck2,
      badge: lamaranList.length > 0 ? lamaranList.length : null,
    },
    { id: 'profil' as const, label: 'Profil Siswa', icon: User },
    { id: 'arsitektur' as const, label: 'Dokumentasi', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 bg-sky-800 text-white shadow-md border-b border-sky-900 transition-colors">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
          
          {/* ZONE 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-2 text-left group focus:outline-none"
              aria-label="Kembali ke Beranda MagangKu"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-sky-300 text-slate-950 font-black text-base flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                M
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
                  MagangKu
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-700 text-sky-200 border border-sky-600">
                    <Flame className="w-3 h-3 text-amber-400" />
                    Firebase
                  </span>
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: Clean Single-Line Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-semibold"
            aria-label="Navigasi Utama Desktop"
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
                    isActive
                      ? 'bg-sky-900 text-white shadow-xs font-bold ring-1 ring-sky-600'
                      : 'text-sky-100 hover:text-white hover:bg-sky-700/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-300' : 'text-sky-200'}`} />
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Accessibility, Google Auth & Role Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Font Size Scaler */}
            <button
              onClick={cycleFontSize}
              className="min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-sky-900 hover:bg-sky-950 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-sky-700 active:scale-95"
              title="Ubah Ukuran Tulisan"
              aria-label={`Ukuran tulisan saat ini: ${fontLabels[fontSize]}. Klik untuk ubah.`}
            >
              <Type className="w-4 h-4 text-sky-300 shrink-0" />
              <span className="hidden sm:inline">Font:</span>
              <span>{fontLabels[fontSize]}</span>
            </button>

            {/* Outdoor High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border active:scale-95 ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                  : 'bg-sky-900 hover:bg-sky-950 text-white border-sky-700'
              }`}
              title="Mode Kontras Terik (Sinar Matahari)"
              aria-label="Tombol kontras tinggi untuk siang hari"
            >
              <SunMedium className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{highContrast ? 'Kontras Aktif' : 'Kontras'}</span>
            </button>

            {/* Role Switcher */}
            <button
              onClick={() => setActiveRole(activeRole === 'siswa' ? 'guru' : 'siswa')}
              className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all border ${
                activeRole === 'guru'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-2 ring-emerald-300'
                  : 'bg-white text-sky-900 border-white hover:bg-sky-50'
              }`}
              aria-label={`Beralih peran. Saat ini: ${activeRole === 'siswa' ? 'Mode Siswa' : 'Mode Guru Pembimbing'}`}
            >
              {activeRole === 'guru' ? (
                <>
                  <UserCheck className="w-4 h-4 text-emerald-950" />
                  <span className="whitespace-nowrap">Guru</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4 text-sky-800" />
                  <span className="whitespace-nowrap">Siswa</span>
                </>
              )}
            </button>

            {/* Google Authentication Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-sky-400"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sky-900 text-sky-100 font-bold flex items-center justify-center text-xs">
                    {currentUser.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <button
                  onClick={logOut}
                  className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-sky-950 hover:bg-red-900 text-white text-xs font-medium flex items-center gap-1 transition-colors border border-sky-700"
                  title="Keluar dari akun Google"
                >
                  <LogOut className="w-3.5 h-3.5 text-sky-300" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="min-h-[44px] px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                title="Masuk dengan Akun Google"
              >
                <LogIn className="w-4 h-4 text-slate-900" />
                <span className="hidden sm:inline">Masuk Google</span>
                <span className="sm:hidden">Masuk</span>
              </button>
            )}

            {/* Device Viewport Toggle */}
            <button
              onClick={() => setDeviceViewMode(deviceViewMode === 'mobile' ? 'responsive' : 'mobile')}
              className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-sky-950/60 hover:bg-sky-950 text-sky-200 border border-sky-700/70 text-xs font-medium hidden lg:flex items-center gap-1.5 transition-colors"
              title="Beralih Pratinjau Tampilan"
            >
              {deviceViewMode === 'mobile' ? <Monitor className="w-4 h-4 text-sky-300" /> : <Smartphone className="w-4 h-4 text-sky-300" />}
              <span>{deviceViewMode === 'mobile' ? 'Laptop' : 'HP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Header Context Bar */}
      <div className="bg-sky-900/90 border-t border-sky-700/50 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-sky-700 text-white font-bold flex items-center justify-center shrink-0">
              {user.nama.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-white text-sm">{user.nama}</span>
              <span className="text-sky-300 mx-1.5">·</span>
              <span className="text-sky-100 font-medium">{user.asalSekolah} ({user.jurusan})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-800 border border-sky-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-sky-200 font-medium">Status Magang:</span>
              <span className="font-bold text-white">
                {user.statusMagang === 'sedang_magang' && user.tempatMagangAktif ? (
                  <span>{user.tempatMagangAktif.namaPerusahaan}</span>
                ) : (
                  <span className="text-amber-300">Belum Memulai Magang</span>
                )}
              </span>
            </div>

            <button
              onClick={() =>
                switchInternshipStatus(user.statusMagang === 'sedang_magang' ? 'belum_magang' : 'sedang_magang')
              }
              className="min-h-[36px] px-2.5 py-1 text-[11px] font-semibold bg-sky-700 hover:bg-sky-600 text-sky-100 rounded-lg border border-sky-600 transition-colors"
              aria-label="Simulasi ubah status magang"
            >
              {user.statusMagang === 'sedang_magang' ? 'Simulasi: Belum Magang' : 'Simulasi: Diterima Magang'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
