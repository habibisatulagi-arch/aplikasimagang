import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  GraduationCap,
  Building2,
  Phone,
  Mail,
  Type,
  SunMedium,
  Volume2,
  CheckCircle2,
  Edit3,
  Save,
  HelpCircle,
  FileDown,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { FontSizeSetting } from '../../types';

export const ProfilView: React.FC = () => {
  const {
    user,
    setUser,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    activeRole,
    setActiveRole,
    exportPDF,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: user.nama,
    nisn: user.nisn,
    asalSekolah: user.asalSekolah,
    jurusan: user.jurusan,
    kelas: user.kelas,
    noHp: user.noHp,
    email: user.email,
  });

  const [saveToast, setSaveToast] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const fontOptions: { id: FontSizeSetting; label: string; desc: string }[] = [
    { id: 'small', label: 'Kecil (90%)', desc: 'Cocok untuk monitor layar besar' },
    { id: 'normal', label: 'Standar (100%)', desc: 'Ukuran normal default (16px)' },
    { id: 'large', label: 'Besar (+15%)', desc: 'Nyaman dibaca tanpa kacamata' },
    { id: 'xlarge', label: 'Sangat Besar (+30%)', desc: 'Maksimal untuk kemudahan membaca jarak jauh' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-700 text-white flex items-center justify-center font-black text-2xl shadow-xs shrink-0">
            {user.nama
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{user.nama}</h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
              {user.jurusan} · {user.kelas}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {user.asalSekolah} · NISN: <span className="font-mono">{user.nisn}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportPDF}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileDown className="w-4 h-4 text-sky-700" />
            <span>Unduh Biodata & Jurnal</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Perubahan data diri berhasil disimpan!</span>
        </div>
      )}

      {/* 2-Column Grid on Laptop & Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
        
        {/* LEFT COLUMN: Data Pokok Siswa & Sekolah (col-span-7) */}
        <div className="lg:col-span-7 space-y-5 min-w-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Identitas Lengkap Siswa SMK
                </h2>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="min-h-[40px] px-3.5 py-1 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Batal Mengubah' : 'Edit Biodata'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Nomor Induk Siswa Nasional (NISN)</label>
                    <input
                      type="text"
                      value={formData.nisn}
                      onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                      className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Kelas</label>
                    <input
                      type="text"
                      value={formData.kelas}
                      onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                      className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Asal Sekolah</label>
                  <input
                    type="text"
                    value={formData.asalSekolah}
                    onChange={(e) => setFormData({ ...formData, asalSekolah: e.target.value })}
                    className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Kompetensi Keahlian (Jurusan)</label>
                  <input
                    type="text"
                    value={formData.jurusan}
                    onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
                    className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">No. WhatsApp Siswa</label>
                    <input
                      type="text"
                      value={formData.noHp}
                      onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                      className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Email Siswa</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full min-h-[44px] p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="min-h-[48px] px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Biodata</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="divide-y divide-slate-100 text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Nomor Induk Siswa Nasional (NISN)</span>
                  <span className="font-bold text-slate-900 font-mono">{user.nisn}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Asal Sekolah</span>
                  <span className="font-bold text-slate-900">{user.asalSekolah}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Jurusan & Kelas</span>
                  <span className="font-bold text-slate-900">{user.jurusan} ({user.kelas})</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Kontak WhatsApp</span>
                  <span className="font-bold text-slate-900">{user.noHp}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Email Akun</span>
                  <span className="font-bold text-slate-900">{user.email}</span>
                </div>
              </div>
            )}
          </div>

          {/* Info Pembimbing & Kemitraan Sekolah */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Informasi Pembimbing Praktik (DUDI & Sekolah)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Guru Pembimbing Sekolah:</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {user.tempatMagangAktif?.guruPembimbing || 'Ibu Ratna Dewi, M.Pd'}
                </span>
                <span className="text-slate-500 text-[11px] mt-1 block">Guru Produktif Rekayasa Perangkat Lunak</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Mentor Lapangan (DUDI Industri):</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {user.tempatMagangAktif?.mentor || 'Bpk. Ahmad Fauzi, S.Kom'}
                </span>
                <span className="text-slate-500 text-[11px] mt-1 block">Head of Technology & UI/UX</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Accessibility & Eye Comfort Settings (col-span-5) */}
        <div className="lg:col-span-5 space-y-5 min-w-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Type className="w-5 h-5 text-sky-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Aksesibilitas & Keterbacaan Teks
              </h2>
            </div>

            {/* Font Scaler */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Skala Ukuran Huruf (Font Size Scaling):
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {fontOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFontSize(opt.id)}
                    className={`min-h-[52px] p-3 rounded-xl border text-left transition-all active:scale-95 ${
                      fontSize === opt.id
                        ? 'bg-sky-50 border-sky-600 text-sky-900 font-bold ring-2 ring-sky-200 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                    aria-pressed={fontSize === opt.id}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Outdoor High Contrast */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Mode Kontras Terik (Outdoor Daylight Mode)
                </span>
                <span className="text-[11px] text-slate-600 leading-relaxed block mt-0.5">
                  Mempertebal border dan kontras teks hitam pekat untuk kondisi cahaya matahari terang di lapangan.
                </span>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  highContrast
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-500 shadow-sm'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                aria-pressed={highContrast}
              >
                {highContrast ? 'AKTIF' : 'NONAKTIF'}
              </button>
            </div>
          </div>

          {/* Voice to text capability card */}
          <div className="bg-sky-50 rounded-2xl border border-sky-200 p-5 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
              <Volume2 className="w-5 h-5 text-sky-700" />
              <span>Dikte Suara Bahasa Indonesia (id-ID)</span>
            </div>
            <p className="text-xs text-sky-800 leading-relaxed">
              Aplikasi mendukung pengisian jurnal harian otomatis menggunakan suara. Siswa cukup menekan tombol mikrofon dan berbicara dalam bahasa sehari-hari tanpa harus mengetik panjang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
