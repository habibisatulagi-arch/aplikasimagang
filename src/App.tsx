import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { BerandaView } from './components/beranda/BerandaView';
import { JurnalView } from './components/jurnal/JurnalView';
import { StatusLamaranView } from './components/lamaran/StatusLamaranView';
import { ProfilView } from './components/profil/ProfilView';
import { ArchitectureDocsView } from './components/docs/ArchitectureDocsView';

const MainAppContent: React.FC = () => {
  const { activeTab, deviceViewMode } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <BerandaView />;
      case 'jurnal':
        return <JurnalView />;
      case 'lamaran':
        return <StatusLamaranView />;
      case 'profil':
        return <ProfilView />;
      case 'arsitektur':
        return <ArchitectureDocsView />;
      default:
        return <BerandaView />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-100 text-slate-900 flex flex-col ${
        deviceViewMode === 'mobile'
          ? 'items-center justify-start py-0 sm:py-6 px-0 sm:px-4'
          : 'w-full'
      }`}
    >
      {/* If in Simulated Mobile Mode */}
      {deviceViewMode === 'mobile' ? (
        <div className="w-full max-w-[420px] min-h-[100dvh] sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[36px] sm:shadow-2xl sm:ring-8 sm:ring-slate-800/90 sm:overflow-hidden bg-slate-50 relative flex flex-col border-x sm:border border-slate-300">
          {/* Simulated Phone Notch */}
          <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-sky-900 text-[10px] text-sky-200 font-medium select-none">
            <span>09:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
            <span>4G · 98%</span>
          </div>

          <Header />

          <main id="main-content" className="flex-1 overflow-y-auto bg-slate-100/60 pb-20 focus:outline-none">
            {renderContent()}
          </main>

          <BottomNav />
        </div>
      ) : (
        /* Full Desktop & Laptop Portal Layout (Baseline 1440px / max-w-7xl) */
        <div className="w-full min-h-screen flex flex-col bg-slate-100/60">
          <Header />

          <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 focus:outline-none">
            {renderContent()}
          </main>

          {/* Desktop Footer with quiet copyright & helpful links */}
          <footer className="w-full border-t border-slate-200 bg-white py-6 text-xs text-slate-500 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sky-800 text-sm">MagangKu</span>
                <span>— Portal Pencarian Magang & Jurnal Harian Siswa SMA/SMK</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 font-medium">
                <span>Standar Aksesibilitas WCAG AA</span>
                <span>·</span>
                <span>Kemdikbudristek PKL Aligned</span>
                <span>·</span>
                <span>Versi Desktop & Laptop 2026</span>
              </div>
            </div>
          </footer>

          {/* Bottom Nav for mobile viewports only */}
          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
