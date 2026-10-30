import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  SunMedium,
  Type,
  Smartphone,
  Monitor,
  GraduationCap,
  UserCheck,
  Compass,
  BookOpen,
  FileCheck2,
  User,
  Layers,
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
    large: 'Besar',
    xlarge: 'X-Besar',
  };

  const cycleFontSize = () => {
    const order: FontSizeSetting[] = ['normal', 'large', 'xlarge', 'small'];
    const nextIdx = (order.indexOf(fontSize) + 1) % order.length;
    setFontSize(order[nextIdx]);
  };

  const navLinks = [
    { id: 'beranda' as const, label: 'Lowongan', icon: Compass },
    {
      id: 'jurnal' as const,
      label: 'Jurnal',
      icon: BookOpen,
      badge: user.statusMagang === 'sedang_magang' ? logbook.filter((l) => !l.parafGuru).length : null,
    },
    {
      id: 'lamaran' as const,
      label: 'Lamaran',
      icon: FileCheck2,
      badge: lamaranList.length > 0 ? lamaranList.length : null,
    },
    { id: 'profil' as const, label: 'Profil', icon: User },
    { id: 'arsitektur' as const, label: 'Dokumen', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-sky-800 text-white shadow-md border-b border-sky-900 transition-colors">
      {/* Main Top Bar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 lg:gap-4 w-full min-w-0">
          
          {/* ZONE 1: Brand Wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-2 text-left group focus:outline-none"
              aria-label="Kembali ke Beranda MagangKu"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-sky-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                M
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
                  MagangKu
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-sky-700 text-sky-200 border border-sky-600">
                  <Flame className="w-2.5 h-2.5 text-amber-400" />
                  Firebase
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: Clean Responsive Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-1 min-w-0 overflow-x-auto"
            aria-label="Navigasi Utama Desktop"
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all whitespace-nowrap min-h-[38px] ${
                    isActive
                      ? 'bg-sky-900 text-white shadow-xs font-bold ring-1 ring-sky-600'
                      : 'text-sky-100 hover:text-white hover:bg-sky-700/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-sky-300' : 'text-sky-200'} shrink-0`} />
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 ? (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                      {link.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Accessibility, Google Auth & Role Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Font Size Scaler */}
            <button
              onClick={cycleFontSize}
              className="min-h-[38px] px-2 sm:px-2.5 py-1.5 rounded-lg bg-sky-900 hover:bg-sky-950 text-white text-xs font-bold flex items-center gap-1 transition-colors border border-sky-700 active:scale-95"
              title="Ubah Ukuran Tulisan"
              aria-label={`Ukuran tulisan saat ini: ${fontLabels[fontSize]}. Klik untuk ubah.`}
            >
              <Type className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span className="hidden xl:inline text-[11px]">Font:</span>
              <span className="text-[11px]">{fontLabels[fontSize]}</span>
            </button>

            {/* Outdoor High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`min-h-[38px] px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all border active:scale-95 ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                  : 'bg-sky-900 hover:bg-sky-950 text-white border-sky-700'
              }`}
              title="Mode Kontras Terik (Sinar Matahari)"
              aria-label="Tombol kontras tinggi untuk siang hari"
            >
              <SunMedium className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline text-[11px]">{highContrast ? 'Kontras Aktif' : 'Kontras'}</span>
            </button>

            {/* Role Switcher */}
            <button
              onClick={() => setActiveRole(activeRole === 'siswa' ? 'guru' : 'siswa')}
              className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all border ${
                activeRole === 'guru'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-2 ring-emerald-300'
                  : 'bg-white text-sky-900 border-white hover:bg-sky-50'
              }`}
              aria-label={`Beralih peran. Saat ini: ${activeRole === 'siswa' ? 'Mode Siswa' : 'Mode Guru Pembimbing'}`}
            >
              {activeRole === 'guru' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-950 shrink-0" />
                  <span className="whitespace-nowrap text-[11px]">Guru</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-sky-800 shrink-0" />
                  <span className="whitespace-nowrap text-[11px]">Siswa</span>
                </>
              )}
            </button>

            {/* Google Authentication Button */}
            {currentUser ? (
              <div className="flex items-center gap-1">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-7 h-7 rounded-full border border-sky-400"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-sky-900 text-sky-100 font-bold flex items-center justify-center text-[10px]">
                    {currentUser.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <button
                  onClick={logOut}
                  className="min-h-[38px] px-2 py-1.5 rounded-lg bg-sky-950 hover:bg-red-900 text-white text-xs font-medium flex items-center gap-1 transition-colors border border-sky-700"
                  title="Keluar dari akun Google"
                >
                  <LogOut className="w-3.5 h-3.5 text-sky-300" />
                  <span className="hidden sm:inline text-[11px]">Keluar</span>
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                title="Masuk dengan Akun Google"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                <span className="whitespace-nowrap text-[11px]">Masuk</span>
              </button>
            )}

            {/* Device Viewport Toggle (Desktop only) */}
            <button
              onClick={() => setDeviceViewMode(deviceViewMode === 'mobile' ? 'responsive' : 'mobile')}
              className="min-h-[38px] px-2 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-950 text-sky-200 border border-sky-700/70 text-xs font-medium hidden lg:flex items-center gap-1 transition-colors"
              title="Beralih Pratinjau Tampilan"
            >
              {deviceViewMode === 'mobile' ? <Monitor className="w-3.5 h-3.5 text-sky-300" /> : <Smartphone className="w-3.5 h-3.5 text-sky-300" />}
              <span className="hidden 2xl:inline text-[11px]">{deviceViewMode === 'mobile' ? 'Laptop' : 'HP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Header Context Bar */}
      <div className="bg-sky-900/90 border-t border-sky-700/50 px-3 sm:px-4 lg:px-6 py-2">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-sky-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              {user.nama.charAt(0)}
            </div>
            <div className="min-w-0 truncate">
              <span className="font-bold text-white">{user.nama}</span>
              <span className="text-sky-300 mx-1.5">·</span>
              <span className="text-sky-200">{user.asalSekolah} ({user.jurusan})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-800 border border-sky-700 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span className="text-sky-200">Status:</span>
              <span className="font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                {user.statusMagang === 'sedang_magang' && user.tempatMagangAktif ? (
                  user.tempatMagangAktif.namaPerusahaan
                ) : (
                  <span className="text-amber-300">Belum Magang</span>
                )}
              </span>
            </div>

            <button
              onClick={() =>
                switchInternshipStatus(user.statusMagang === 'sedang_magang' ? 'belum_magang' : 'sedang_magang')
              }
              className="min-h-[32px] px-2.5 py-1 text-[11px] font-semibold bg-sky-700 hover:bg-sky-600 text-sky-100 rounded-lg border border-sky-600 transition-colors whitespace-nowrap active:scale-95"
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
