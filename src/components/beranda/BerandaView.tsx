import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LowonganMagang } from '../../types';
import {
  Search,
  Building2,
  MapPin,
  Banknote,
  Award,
  Laptop,
  CheckCircle2,
  FileText,
  Briefcase,
  Users,
  Send,
  X,
  ChevronRight,
  Sparkles,
  Phone,
  FolderArchive,
  Palette,
  Wrench,
  Calculator,
  Megaphone,
  LayoutGrid,
  Clock,
  Check
} from 'lucide-react';

export const BerandaView: React.FC = () => {
  const {
    lowonganList,
    user,
    selectedLowonganForDetail,
    setSelectedLowonganForDetail,
    selectedLowonganForApply,
    setSelectedLowonganForApply,
    addLamaran,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');

  // Currently focused job on desktop split view
  const [activeJobId, setActiveJobId] = useState<string>(lowonganList[0]?.id || '');

  // Application Form state
  const [suratPengantarFile, setSuratPengantarFile] = useState<string>('Surat_Pengantar_Sekolah_SMKN1.pdf');
  const [catatanSiswa, setCatatanSiswa] = useState<string>(
    'Saya siswa kelas XII yang siap disiplin belajar, mematuhi aturan perusahaan, dan mengaplikasikan ilmu dari sekolah.'
  );
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccessMessage, setApplySuccessMessage] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Bidang', icon: LayoutGrid },
    { id: 'it_desain', label: 'IT & Desain Web', icon: Laptop },
    { id: 'administrasi', label: 'Administrasi', icon: FolderArchive },
    { id: 'multimedia', label: 'Multimedia & Foto', icon: Palette },
    { id: 'teknik', label: 'Teknik Komputer/Mesin', icon: Wrench },
    { id: 'pemasaran', label: 'Pemasaran & Medsos', icon: Megaphone },
    { id: 'akuntansi', label: 'Akuntansi & Kasir', icon: Calculator },
  ];

  const filteredJobs = useMemo(() => {
    return lowonganList.filter((job) => {
      const matchQuery =
        job.posisi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.perusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.lokasi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || job.kategori === selectedCategory;
      const matchType =
        selectedWorkType === 'all' ||
        (selectedWorkType === 'wfh' && job.tipeKerja.includes('WFH')) ||
        (selectedWorkType === 'wfo' && job.tipeKerja.includes('WFO'));

      return matchQuery && matchCategory && matchType;
    });
  }, [lowonganList, searchQuery, selectedCategory, selectedWorkType]);

  // Keep active job updated on desktop view
  useEffect(() => {
    if (filteredJobs.length > 0 && !filteredJobs.some((j) => j.id === activeJobId)) {
      setActiveJobId(filteredJobs[0].id);
    }
  }, [filteredJobs, activeJobId]);

  const activeJob = useMemo(() => {
    return lowonganList.find((j) => j.id === activeJobId) || filteredJobs[0] || lowonganList[0];
  }, [activeJobId, lowonganList, filteredJobs]);

  const handleOpenApply = (job: LowonganMagang) => {
    setSelectedLowonganForDetail(null);
    setSelectedLowonganForApply(job);
    setApplySuccessMessage(false);
  };

  const handleSubmitApply = (e: React.FormEvent) => {
    e.preventDefault();
    const targetJob = selectedLowonganForApply || activeJob;
    if (!targetJob) return;

    setIsApplying(true);
    setTimeout(() => {
      addLamaran(targetJob, suratPengantarFile, catatanSiswa);
      setIsApplying(false);
      setApplySuccessMessage(true);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner on Desktop & Laptop */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-sky-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-600/80 text-sky-100 text-xs font-semibold uppercase tracking-wider mb-2 border border-sky-500/50">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Portal Kemitraan Industri Siswa SMK
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Temukan Tempat Magang / PKL Ramah Pemula
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-2xl leading-relaxed">
              Semua lowongan di bawah ini telah terverifikasi oleh sekolah, bebas biaya pendaftaran, serta dilengkapi uang saku dan pendampingan mentor industri resmi.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-sky-900/80 border border-sky-700 px-4 py-2.5 rounded-xl text-center">
              <span className="block text-xl font-black text-amber-300">{lowonganList.length}</span>
              <span className="text-[11px] text-sky-200 font-medium">Perusahaan Mitra</span>
            </div>
            <div className="bg-sky-900/80 border border-sky-700 px-4 py-2.5 rounded-xl text-center">
              <span className="block text-xl font-black text-emerald-300">100%</span>
              <span className="text-[11px] text-sky-200 font-medium">Bersertifikat PKL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 min-w-0">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan posisi magang, nama perusahaan, atau kota..."
              className="w-full min-h-[44px] sm:min-h-[48px] pl-11 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 font-medium text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-slate-600"
                aria-label="Hapus kata kunci"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Work Model Pills */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setSelectedWorkType(selectedWorkType === 'wfh' ? 'all' : 'wfh')}
              className={`min-h-[40px] sm:min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap ${
                selectedWorkType === 'wfh'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              ✓ Bisa WFH
            </button>
            <button
              onClick={() => setSelectedWorkType(selectedWorkType === 'wfo' ? 'all' : 'wfo')}
              className={`min-h-[40px] sm:min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap ${
                selectedWorkType === 'wfo'
                  ? 'bg-sky-700 text-white border-sky-800 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              ✓ Di Kantor (WFO)
            </button>
          </div>
        </div>

        {/* Category Pills List */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Pilih Bidang Kejuruan SMK:</span>
            <span className="text-xs text-slate-500">Klik untuk menyaring lowongan</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-[40px] sm:min-h-[44px] px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 border transition-all active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-700 text-white border-sky-800 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-600'}`} aria-hidden="true" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-COLUMN DESKTOP & LAPTOP SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
        
        {/* LEFT COLUMN: Lowongan Cards Feed (col-span-5) */}
        <div className="lg:col-span-5 space-y-3 min-w-0">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-slate-700">
              Ditemukan <span className="text-sky-700 font-extrabold">{filteredJobs.length}</span> Lowongan Tersedia
            </p>
            <span className="text-[11px] text-slate-500">Pilih kartu untuk melihat rincian</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">Tidak ada lowongan yang cocok</h3>
              <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci atau pilih semua kategori.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedWorkType('all');
                }}
                className="mt-3 min-h-[44px] px-4 py-2 bg-sky-700 text-white font-semibold text-xs rounded-xl"
              >
                Reset Filter Pencarian
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {filteredJobs.map((job) => {
                const isSelectedOnDesktop = activeJob?.id === job.id;

                return (
                  <article
                    key={job.id}
                    onClick={() => {
                      setActiveJobId(job.id);
                      // On smaller screens also open modal
                      if (window.innerWidth < 1024) {
                        setSelectedLowonganForDetail(job);
                      }
                    }}
                    className={`bg-white rounded-2xl border p-4 transition-all shadow-xs cursor-pointer group ${
                      isSelectedOnDesktop
                        ? 'border-sky-600 ring-2 ring-sky-500/30 bg-sky-50/20'
                        : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50/50'
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Lowongan: ${job.posisi} di ${job.perusahaan}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-sky-800 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                          {job.posisi}
                        </h3>
                        <p className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{job.perusahaan}</span>
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{job.lokasi}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {job.deskripsiSingkat}
                    </p>

                    {/* Badges Strip */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-[11px] border border-emerald-200">
                        <Banknote className="w-3 h-3 text-emerald-600" />
                        {job.uangSaku}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 font-semibold text-[11px] border border-sky-200">
                        <Laptop className="w-3 h-3 text-sky-600" />
                        {job.tipeKerja}
                      </span>
                      {job.sertifikat && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold text-[11px] border border-amber-200">
                          <Award className="w-3 h-3 text-amber-600" />
                          Sertifikat Ditanggung
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-50">
                      <span className="font-medium text-slate-700">
                        Sisa Kuota: <strong className="text-sky-700">{job.kuotaTersisa} Siswa</strong>
                      </span>
                      <span className="font-bold text-sky-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Detail & Lamar <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Detail Panel on Computer & Laptop (col-span-7) */}
        <div className="hidden lg:block lg:col-span-7 sticky top-24 space-y-4 min-w-0">
          {activeJob ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              {/* Header Box */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-800 text-white font-black text-lg flex items-center justify-center shadow-xs">
                    {activeJob.logo}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                      {activeJob.posisi}
                    </h2>
                    <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>{activeJob.perusahaan}</span>
                      <span className="text-slate-300">·</span>
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{activeJob.kota}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenApply(activeJob)}
                  className="min-h-[48px] px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-md active:scale-98 flex items-center gap-2 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Lamar Cepat (1-Klik)</span>
                </button>
              </div>

              {/* Highlight Strip */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-slate-600 block text-[11px] font-medium">Uang Saku Siswa:</span>
                  <span className="font-bold text-emerald-800 text-sm mt-0.5 block">{activeJob.uangSaku}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200">
                  <span className="text-slate-600 block text-[11px] font-medium">Model Magang:</span>
                  <span className="font-bold text-sky-800 text-sm mt-0.5 block">{activeJob.tipeKerja}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-slate-600 block text-[11px] font-medium">Durasi Program:</span>
                  <span className="font-bold text-amber-800 text-sm mt-0.5 block">{activeJob.durasiBulan} Bulan PKL</span>
                </div>
              </div>

              {/* Task Breakdown (Anti-Corporate Jargon) */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  Rincian Tugas Harian (Bahasa Sederhana Ramah Siswa)
                </h3>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {activeJob.poinTugas.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 leading-relaxed pt-0.5">{task}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simple Qualifications */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Syarat Kualifikasi Pemula
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeJob.kualifikasiSederhana.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office & Contact */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Alamat Kantor & Lokasi Praktik:</span>
                    <span className="text-slate-600">{activeJob.alamatLengkap}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
                  <Phone className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Kontak Pembimbing HRD:</span>
                    <span className="text-slate-600">{activeJob.kontakPerusahaan}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Apply Action Box */}
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-sky-950">Tertarik Magang di Perusahaan Ini?</h4>
                  <p className="text-xs text-sky-800 mt-0.5">
                    Surat pengantar sekolah dan biodata kamu akan langsung dikirim ke pembimbing HRD.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenApply(activeJob)}
                  className="min-h-[48px] px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md active:scale-98 flex items-center gap-2 shrink-0 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Lamaran 1-Klik</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Pilih lowongan di sebelah kiri untuk melihat rincian
            </div>
          )}
        </div>
      </div>

      {/* MOBILE POPUP MODAL (For smaller screens or direct detail click) */}
      {selectedLowonganForDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{selectedLowonganForDetail.posisi}</h3>
              <button
                onClick={() => setSelectedLowonganForDetail(null)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto text-xs">
              <p className="font-semibold text-slate-700">{selectedLowonganForDetail.perusahaan}</p>
              <p className="text-slate-600">{selectedLowonganForDetail.deskripsiSingkat}</p>
              <div className="space-y-1">
                <span className="font-bold text-slate-900">Tugas:</span>
                {selectedLowonganForDetail.poinTugas.map((t, i) => (
                  <p key={i} className="text-slate-600">• {t}</p>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-2">
              <button
                onClick={() => handleOpenApply(selectedLowonganForDetail)}
                className="flex-1 min-h-[48px] py-2.5 bg-sky-700 text-white font-bold rounded-xl text-xs"
              >
                Lamar Cepat Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM LAMARAN 1-KLIK (Responsive for Laptop and Mobile) */}
      {selectedLowonganForApply && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-lg rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Form Lamaran Magang Cepat</h3>
                <p className="text-xs text-slate-600">
                  {selectedLowonganForApply.posisi} · {selectedLowonganForApply.perusahaan}
                </p>
              </div>
              <button
                onClick={() => setSelectedLowonganForApply(null)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccessMessage ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Lamaran Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Surat pengantar sekolah dan biodata telah dikirimkan ke HRD {selectedLowonganForApply.perusahaan}.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedLowonganForApply(null);
                      setActiveTab('lamaran');
                    }}
                    className="min-h-[48px] w-full py-2.5 bg-sky-700 text-white font-bold text-sm rounded-xl hover:bg-sky-800"
                  >
                    Buka Status Lamaran Saya
                  </button>
                  <button
                    onClick={() => setSelectedLowonganForApply(null)}
                    className="min-h-[44px] w-full py-2 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-100"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApply} className="p-4 space-y-4 overflow-y-auto">
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs">
                  <span className="font-bold text-sky-900 block mb-1">Data Pelamar (Otomatis dari Sistem):</span>
                  <div className="grid grid-cols-2 gap-1 text-slate-700">
                    <p><strong>Nama:</strong> {user.nama}</p>
                    <p><strong>NISN:</strong> {user.nisn}</p>
                    <p><strong>Sekolah:</strong> {user.asalSekolah}</p>
                    <p><strong>Jurusan:</strong> {user.jurusan}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Surat Pengantar Sekolah (Wajib PKL)
                  </label>
                  <div className="p-3 border-2 border-dashed border-sky-300 rounded-xl bg-slate-50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-5 h-5 text-sky-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{suratPengantarFile}</p>
                        <p className="text-[10px] text-slate-500">Tersertifikasi Kepala Sekolah</p>
                      </div>
                    </div>
                    <label className="min-h-[40px] px-3 py-1 bg-white border border-slate-300 text-sky-700 font-bold text-xs rounded-lg hover:bg-sky-50 cursor-pointer flex items-center shrink-0">
                      <span>Pilih File</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSuratPengantarFile(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Pesan Pengantar Singkat
                  </label>
                  <textarea
                    rows={3}
                    value={catatanSiswa}
                    onChange={(e) => setCatatanSiswa(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLowonganForApply(null)}
                    className="min-h-[48px] px-4 py-2 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="flex-1 min-h-[48px] py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isApplying ? <span>Mengirim...</span> : <span>Kirim Lamaran Sekarang</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
