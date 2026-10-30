import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Camera,
  MapPin,
  Clock,
  Calendar,
  FileDown,
  CheckCircle2,
  AlertCircle,
  Plus,
  Send,
  Building2,
  X,
  Volume2,
  Check,
  UserCheck,
  Sparkles,
  HelpCircle,
  Upload,
  Filter,
  CheckCheck,
  FileText
} from 'lucide-react';
import {
  isSpeechRecognitionSupported,
  createSpeechRecognizer,
  quickIndonesianVoiceTemplates,
} from '../../utils/speechRecognition';

export const JurnalView: React.FC = () => {
  const {
    user,
    logbook,
    addLogbookEntry,
    attendance,
    checkInAttendance,
    checkOutAttendance,
    todayAttendance,
    exportPDF,
    switchInternshipStatus,
    activeRole,
    approveLogbookEntry,
    setActiveTab,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAbsensiModal, setShowAbsensiModal] = useState(false);
  const [absensiType, setAbsensiType] = useState<'masuk' | 'pulang'>('masuk');

  // Form states for entry
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [jamMulai, setJamMulai] = useState('08:00');
  const [jamSelesai, setJamSelesai] = useState('16:00');
  const [judulKegiatan, setJudulKegiatan] = useState('');
  const [deskripsiKegiatan, setDeskripsiKegiatan] = useState('');
  const [fotoBukti, setFotoBukti] = useState<string>('');
  const [fotoCaption, setFotoCaption] = useState('');

  // Voice to text states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognizerRef = useRef<any>(null);

  // Review state for Guru
  const [reviewModalLogId, setReviewModalLogId] = useState<string | null>(null);
  const [guruNote, setGuruNote] = useState('Bagus, kegiatan sudah sesuai dengan kompetensi keahlian.');

  useEffect(() => {
    setSpeechSupported(isSpeechRecognitionSupported());
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      const randomTemplate =
        quickIndonesianVoiceTemplates[Math.floor(Math.random() * quickIndonesianVoiceTemplates.length)];
      setDeskripsiKegiatan((prev) => (prev ? `${prev} ${randomTemplate}` : randomTemplate));
      return;
    }

    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      const recognizer = createSpeechRecognizer(
        (transcript) => {
          setDeskripsiKegiatan((prev) => (prev ? `${prev} ${transcript}` : transcript));
        },
        (err) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
        },
        (status) => setIsListening(status)
      );

      if (recognizer) {
        recognizerRef.current = recognizer;
        try {
          recognizer.start();
          setIsListening(true);
        } catch (e) {
          console.warn(e);
          setIsListening(false);
        }
      }
    }
  };

  const handleUseVoiceTemplate = (text: string) => {
    setDeskripsiKegiatan((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulKegiatan.trim() || !deskripsiKegiatan.trim()) return;

    addLogbookEntry({
      tanggal,
      jamMulai,
      jamSelesai,
      judulKegiatan,
      deskripsiKegiatan,
      fotoBukti: fotoBukti || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      fotoCaption: fotoCaption || 'Dokumentasi kegiatan siswa magang',
    });

    setJudulKegiatan('');
    setDeskripsiKegiatan('');
    setFotoBukti('');
    setShowAddModal(false);
  };

  const handleExecuteAbsensi = () => {
    const coords = '-6.4912, 106.8291 (Dekat Kantor Magang)';
    const selfie = 'https://api.dicebear.com/7.x/bottts/svg?seed=SelfieCheckin';

    if (absensiType === 'masuk') {
      checkInAttendance(coords, selfie);
    } else {
      checkOutAttendance(coords, selfie);
    }
    setShowAbsensiModal(false);
  };

  const filteredLogbook = logbook.filter((entry) => {
    if (filterStatus === 'pending') return !entry.parafGuru;
    if (filterStatus === 'approved') return entry.parafGuru;
    return true;
  });

  // If student has not started internship yet:
  if (user.statusMagang !== 'sedang_magang') {
    return (
      <div className="p-6 text-center max-w-lg mx-auto my-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto">
            <Building2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Jurnal & Absensi Belum Aktif</h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Fitur jurnal kegiatan harian, dikte suara, absensi GPS, dan ekspor laporan resmi khusus bagi siswa yang sudah terdaftar di perusahaan tempat magang.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveTab('beranda')}
              className="min-h-[48px] px-6 py-3 bg-sky-700 text-white font-bold text-sm rounded-xl hover:bg-sky-800 shadow-sm"
            >
              Cari Lowongan Magang
            </button>
            <button
              onClick={() => switchInternshipStatus('sedang_magang')}
              className="min-h-[48px] px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl"
            >
              Simulasi: Aktifkan Status Magang (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner: Internship Overview & Instant PDF Export */}
      <div className="bg-gradient-to-r from-sky-800 to-sky-900 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-sky-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block mb-1">
              Tempat Praktik Kerja Lapangan (PKL) Siswa:
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {user.tempatMagangAktif?.namaPerusahaan}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 mt-1">
              Posisi: <strong className="text-white">{user.tempatMagangAktif?.posisi}</strong> · Mentor Industri:{' '}
              <strong className="text-white">{user.tempatMagangAktif?.mentor}</strong> · Guru Pembimbing:{' '}
              <strong className="text-white">{user.tempatMagangAktif?.guruPembimbing}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={exportPDF}
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all"
              aria-label="Cetak dan Ekspor Laporan Jurnal PKL ke PDF"
            >
              <FileDown className="w-5 h-5 text-sky-700" />
              <span>Ekspor Laporan PDF Resmi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Guru Notification Banner */}
      {activeRole === 'guru' && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-950 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <UserCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-sm">Mode Guru Pembimbing Aktif</h2>
            <p className="text-xs text-emerald-800">
              Bapak/Ibu guru dapat meninjau catatan harian siswa bimbingan dan menekan tombol <strong>"Paraf & Beri Evaluasi"</strong> di bawah ini.
            </p>
          </div>
        </div>
      )}

      {/* 2-COLUMN DESKTOP / LAPTOP LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Attendance Kiosk + Direct Input Form (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Absensi Kiosk Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Absensi Kehadiran Hari Ini
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Masuk */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                todayAttendance?.waktuMasuk ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Jam Masuk</span>
                  {todayAttendance?.waktuMasuk && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-base font-extrabold text-slate-900 my-1.5">
                  {todayAttendance?.waktuMasuk ? `${todayAttendance.waktuMasuk} WIB` : 'Belum Absen'}
                </p>
                {!todayAttendance?.waktuMasuk ? (
                  <button
                    onClick={() => {
                      setAbsensiType('masuk');
                      setShowAbsensiModal(true);
                    }}
                    className="min-h-[44px] w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Absen Masuk</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-800 font-bold truncate">
                    ✓ GPS Terekam Valid
                  </span>
                )}
              </div>

              {/* Pulang */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                todayAttendance?.waktuPulang ? 'bg-sky-50 border-sky-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Jam Pulang</span>
                  {todayAttendance?.waktuPulang && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                </div>
                <p className="text-base font-extrabold text-slate-900 my-1.5">
                  {todayAttendance?.waktuPulang ? `${todayAttendance.waktuPulang} WIB` : 'Belum Selesai'}
                </p>
                {!todayAttendance?.waktuPulang ? (
                  <button
                    onClick={() => {
                      setAbsensiType('pulang');
                      setShowAbsensiModal(true);
                    }}
                    disabled={!todayAttendance?.waktuMasuk}
                    className={`min-h-[44px] w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 ${
                      todayAttendance?.waktuMasuk
                        ? 'bg-sky-700 hover:bg-sky-800 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Absen Pulang</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-sky-800 font-bold truncate">
                    ✓ Selesai Kerja
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Direct Input Form for Desktop & Laptop (No need for popups on wide screens!) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Form Jurnal Harian</h2>
                <p className="text-xs text-slate-500">Ketik manual atau bicara langsung dengan Dikte Suara</p>
              </div>

              {/* Voice Dictation Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400'
                    : 'bg-sky-100 hover:bg-sky-200 text-sky-900'
                }`}
                aria-label={isListening ? 'Berhenti mendengarkan dikte' : 'Aktifkan dikte suara bahasa Indonesia'}
              >
                {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-sky-700" />}
                <span>{isListening ? 'Berhenti Dikte' : 'Dikte Suara'}</span>
              </button>
            </div>

            <form onSubmit={handleSubmitLog} className="space-y-3.5 text-xs">
              {/* Date & Hours */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="input-tanggal-desktop" className="font-bold text-slate-800 block mb-1">Tanggal</label>
                  <input
                    id="input-tanggal-desktop"
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full min-h-[44px] p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="input-mulai-desktop" className="font-bold text-slate-800 block mb-1">Jam Mulai</label>
                  <input
                    id="input-mulai-desktop"
                    type="time"
                    value={jamMulai}
                    onChange={(e) => setJamMulai(e.target.value)}
                    className="w-full min-h-[44px] p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="input-selesai-desktop" className="font-bold text-slate-800 block mb-1">Jam Selesai</label>
                  <input
                    id="input-selesai-desktop"
                    type="time"
                    value={jamSelesai}
                    onChange={(e) => setJamSelesai(e.target.value)}
                    className="w-full min-h-[44px] p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="input-judul-desktop" className="font-bold text-slate-800 block mb-1">
                  Topik / Judul Kegiatan Harian
                </label>
                <input
                  id="input-judul-desktop"
                  type="text"
                  value={judulKegiatan}
                  onChange={(e) => setJudulKegiatan(e.target.value)}
                  placeholder="Contoh: Menguji ukuran tombol form di HP Android..."
                  className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-sky-600"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="input-deskripsi-desktop" className="font-bold text-slate-800 block mb-1">
                  Uraian Detail Pekerjaan
                </label>
                <textarea
                  id="input-deskripsi-desktop"
                  rows={4}
                  value={deskripsiKegiatan}
                  onChange={(e) => setDeskripsiKegiatan(e.target.value)}
                  placeholder="Jelaskan apa yang kamu kerjakan hari ini... (Bisa ketik atau gunakan tombol Dikte Suara di atas)"
                  className={`w-full p-3 rounded-xl border text-slate-900 font-medium focus:ring-2 focus:ring-sky-600 ${
                    isListening ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                  required
                />
                {isListening && (
                  <p className="text-[11px] text-rose-700 font-semibold mt-1 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    Mikrofon aktif! Bicaralah dalam Bahasa Indonesia...
                  </p>
                )}
              </div>

              {/* Quick Template Buttons */}
              <div>
                <span className="font-bold text-slate-700 block mb-1">Sisipkan Contoh Kalimat Cepat:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickIndonesianVoiceTemplates.slice(0, 3).map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleUseVoiceTemplate(tpl)}
                      className="text-[10px] p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-left line-clamp-1"
                      title={tpl}
                    >
                      + {tpl.slice(0, 34)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Proof */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Unggah Foto Bukti Pekerjaan</label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 min-h-[44px] px-3 py-2 border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-xl bg-slate-50 flex items-center justify-center gap-2 font-semibold text-slate-700 cursor-pointer">
                    <Camera className="w-4 h-4 text-sky-600" />
                    <span>{fotoBukti ? 'Ganti Foto' : 'Pilih Foto Kegiatan'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = () => setFotoBukti(reader.result as string);
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  {fotoBukti && (
                    <button
                      type="button"
                      onClick={() => setFotoBukti('')}
                      className="min-h-[44px] px-3 text-rose-600 font-bold hover:bg-rose-50 rounded-xl"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                {fotoBukti && (
                  <div className="mt-2 p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                    <img src={fotoBukti} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                    <input
                      type="text"
                      value={fotoCaption}
                      onChange={(e) => setFotoCaption(e.target.value)}
                      placeholder="Keterangan foto kegiatan..."
                      className="flex-1 p-2 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-md active:scale-98 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Simpan Catatan Jurnal</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Logbook Records Feed on Laptop & Desktop (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Header & Filter Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Riwayat Jurnal Harian ({logbook.length})
              </h2>
              <p className="text-xs text-slate-500">Tersinkronisasi otomatis untuk laporan ke guru</p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setFilterStatus('all')}
                className={`min-h-[36px] px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({logbook.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`min-h-[36px] px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  filterStatus === 'pending' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Menunggu Paraf ({logbook.filter((l) => !l.parafGuru).length})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`min-h-[36px] px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  filterStatus === 'approved' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Disetujui ({logbook.filter((l) => l.parafGuru).length})
              </button>
            </div>
          </div>

          {/* Entries Feed */}
          {filteredLogbook.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">Tidak ada catatan jurnal dalam kategori ini</h3>
              <p className="text-xs text-slate-500 mt-1">Gunakan form di sebelah kiri untuk mencatat kegiatan harian baru.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogbook.map((entry, index) => (
                <article
                  key={entry.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 transition-all hover:border-slate-300"
                >
                  {/* Entry Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <span>
                        {new Date(entry.tanggal).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="text-slate-300">·</span>
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="font-bold text-slate-900">{entry.jamMulai} - {entry.jamSelesai} WIB</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
                        entry.parafGuru
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {entry.parafGuru ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                          <span>Telah Diparaf Guru</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Menunggu Paraf Guru</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {entry.judulKegiatan}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed whitespace-pre-line">
                      {entry.deskripsiKegiatan}
                    </p>
                  </div>

                  {/* Photo Proof thumbnail */}
                  {entry.fotoBukti && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 max-w-md">
                      <img
                        src={entry.fotoBukti}
                        alt={entry.fotoCaption || 'Bukti kegiatan magang'}
                        className="w-full h-44 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {entry.fotoCaption && (
                        <div className="p-2 text-xs text-slate-600 bg-white border-t border-slate-100">
                          📸 {entry.fotoCaption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Guru's feedback note */}
                  {entry.catatanGuru && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-slate-900 block text-[11px] mb-0.5">
                        Catatan Evaluasi Guru Pembimbing:
                      </span>
                      <p className="text-slate-700 italic">"{entry.catatanGuru}"</p>
                    </div>
                  )}

                  {/* Action for Teacher in Guru Mode */}
                  {activeRole === 'guru' && !entry.parafGuru && (
                    <div className="pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => setReviewModalLogId(entry.id)}
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Beri Paraf & Catatan Evaluasi</span>
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Absensi GPS & Selfie 1-Ketuk */}
      {showAbsensiModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Konfirmasi Absen {absensiType === 'masuk' ? 'Masuk' : 'Pulang'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Lokasi GPS kantor dan waktu saat ini akan dicatat ke lembar absensi resmi.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-700">
                <span>Waktu Sekarang:</span>
                <span className="font-bold text-slate-900">
                  {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Lokasi GPS:</span>
                <span className="font-bold text-emerald-700">✓ Akurat (Kantor Magang)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Nama Siswa:</span>
                <span className="font-bold text-slate-900">{user.nama}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAbsensiModal(false)}
                className="flex-1 min-h-[44px] py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteAbsensi}
                className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Absensi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Guru Pembimbing Review & Paraf */}
      {reviewModalLogId && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              Paraf & Evaluasi Guru Pembimbing
            </h3>
            <p className="text-xs text-slate-600">
              Berikan catatan bimbingan atau koreksi kompetensi kejuruan kepada siswa sebelum membubuhkan paraf.
            </p>
            <textarea
              rows={3}
              value={guruNote}
              onChange={(e) => setGuruNote(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs text-slate-800"
              placeholder="Tulis masukan untuk siswa..."
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setReviewModalLogId(null)}
                className="flex-1 min-h-[44px] py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  approveLogbookEntry(reviewModalLogId, guruNote);
                  setReviewModalLogId(null);
                }}
                className="flex-1 min-h-[44px] py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Bubuhi Paraf & Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
