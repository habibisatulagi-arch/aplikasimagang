import React, { useState } from 'react';
import {
  Layers,
  GitFork,
  FolderTree,
  Code2,
  Database,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  Smartphone,
  Eye
} from 'lucide-react';

export const ArchitectureDocsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'flow' | 'folder' | 'code' | 'schema'>('flow');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const jsonSchemaUser = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "usr_bagus_001" },
    "nama": { "type": "string", "minLength": 2, "example": "Bagus Pratama" },
    "nisn": { "type": "string", "pattern": "^[0-9]{10}$", "example": "0078129345" },
    "role": { "type": "string", "enum": ["siswa", "guru_pembimbing", "mentor_dudi"] },
    "asalSekolah": { "type": "string", "example": "SMK Negeri 1 Cibinong" },
    "jurusan": { "type": "string", "example": "Rekayasa Perangkat Lunak (RPL)" },
    "kelas": { "type": "string", "example": "XII RPL 2" },
    "noHp": { "type": "string", "example": "081298765432" },
    "email": { "type": "string", "format": "email" },
    "statusMagang": { 
      "type": "string", 
      "enum": ["belum_magang", "sedang_magang", "selesai_magang"] 
    },
    "tempatMagangAktif": {
      "type": "object",
      "properties": {
        "perusahaanId": { "type": "string" },
        "namaPerusahaan": { "type": "string" },
        "posisi": { "type": "string" },
        "mentor": { "type": "string" },
        "guruPembimbing": { "type": "string" },
        "tanggalMulai": { "type": "string", "format": "date" },
        "tanggalSelesai": { "type": "string", "format": "date" }
      }
    }
  },
  "required": ["id", "nama", "nisn", "asalSekolah", "jurusan", "statusMagang"]
}`;

  const jsonSchemaLowongan = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "LowonganMagang",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "low_001" },
    "posisi": { "type": "string", "example": "Junior Web & UI Assistant" },
    "perusahaan": { "type": "string", "example": "PT Solusi Digital Nusantara" },
    "lokasi": { "type": "string", "example": "Bogor & Depok" },
    "kota": { "type": "string", "example": "Bogor" },
    "kategori": { 
      "type": "string", 
      "enum": ["administrasi", "it_desain", "pemasaran", "teknik", "multimedia", "akuntansi"] 
    },
    "tipeKerja": { "type": "string", "enum": ["Di Kantor (WFO)", "Bisa WFH", "Campuran (Hybrid)"] },
    "uangSaku": { "type": "string", "example": "Rp 1.200.000 / bln" },
    "sertifikat": { "type": "boolean", "default": true },
    "kuotaTersisa": { "type": "integer", "minimum": 0 },
    "durasiBulan": { "type": "integer", "default": 3 },
    "deskripsiSingkat": { "type": "string" },
    "poinTugas": {
      "type": "array",
      "items": { "type": "string" }
    },
    "kualifikasiSederhana": {
      "type": "array",
      "items": { "type": "string" }
    },
    "kontakPerusahaan": { "type": "string" }
  },
  "required": ["id", "posisi", "perusahaan", "kategori", "tipeKerja", "kuotaTersisa"]
}`;

  const jsonSchemaLogbook = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "LogbookHarian",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "log_1729600000" },
    "siswaId": { "type": "string", "example": "usr_bagus_001" },
    "tanggal": { "type": "string", "format": "date", "example": "2026-10-22" },
    "jamMulai": { "type": "string", "pattern": "^[0-2][0-9]:[0-5][0-9]$", "example": "08:00" },
    "jamSelesai": { "type": "string", "pattern": "^[0-2][0-9]:[0-5][0-9]$", "example": "16:00" },
    "judulKegiatan": { "type": "string", "example": "Merapikan komponen UI" },
    "deskripsiKegiatan": { 
      "type": "string", 
      "description": "Diisi via ketikan manual atau Dikte Suara (Voice-to-Text)" 
    },
    "fotoBukti": { "type": "string", "format": "uri" },
    "fotoCaption": { "type": "string" },
    "absensiLokasi": {
      "type": "object",
      "properties": {
        "latitude": { "type": "number" },
        "longitude": { "type": "number" },
        "alamatGeo": { "type": "string" }
      }
    },
    "parafGuru": { "type": "boolean", "default": false },
    "catatanGuru": { "type": "string" },
    "createdAt": { "type": "string", "format": "date-time" }
  },
  "required": ["id", "siswaId", "tanggal", "jamMulai", "jamSelesai", "judulKegiatan", "deskripsiKegiatan"]
}`;

  const folderStructureText = `magangku/
├── public/
│   ├── favicon.ico
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── logos/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx              # Top bar, greeting, font scaler, high-contrast toggle
│   │   │   └── BottomNav.tsx           # 48px hitboxes, 4 tab menu + labels
│   │   ├── beranda/
│   │   │   ├── BerandaView.tsx         # Dashboard, kategori ikon, search & list kartu lowongan
│   │   │   ├── DetailLowonganModal.tsx # Poin tugas sederhana & syarat pemula
│   │   │   └── FormLamaranModal.tsx    # 1-klik lamar + unggah surat pengantar sekolah
│   │   ├── jurnal/
│   │   │   ├── JurnalView.tsx          # Logbook, Dikte Suara (id-ID), absensi GPS & Selfie 1-ketuk
│   │   │   ├── VoiceDictationMic.tsx   # Web Speech API wrapper dengan fallback cerdas
│   │   │   └── AttendanceCard.tsx      # GPS geolocation check-in/check-out
│   │   ├── lamaran/
│   │   │   └── StatusLamaranView.tsx   # Visual tracker: Terkirim -> Ditinjau -> Diterima
│   │   ├── profil/
│   │   │   └── ProfilView.tsx          # Data siswa SMK, preferensi aksesibilitas
│   │   └── docs/
│   │       └── ArchitectureDocsView.tsx# Dokumentasi arsitektur sistem
│   ├── context/
│   │   └── AppContext.tsx              # State management (User, Logbook, Lamaran, A11y)
│   ├── data/
│   │   └── mockData.ts                 # Data realistis SMK (Siswa, Perusahaan, Lowongan)
│   ├── types/
│   │   └── index.ts                    # TypeScript models (User, Lowongan, Logbook, Lamaran)
│   ├── utils/
│   │   ├── speechRecognition.ts        # Indonesian Voice-to-Text engine (id-ID)
│   │   └── pdfExport.ts                # Production jsPDF generator laporan PKL resmi
│   ├── App.tsx                         # Root container with phone frame & responsive mode
│   ├── index.css                       # Tailwind v4, high contrast, font-scaling CSS
│   └── main.tsx                        # Entry point
├── index.html                          # Meta tag PWA, Plus Jakarta Sans, viewport setup
├── package.json                        # Dependencies (React 19, Lucide, jsPDF, Tailwind)
├── tsconfig.json
└── vite.config.ts`;

  return (
    <div className="pb-28 pt-2 px-4 space-y-4 min-w-0 max-w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Arsitektur & Spesifikasi MagangKu</h2>
          <p className="text-xs text-slate-600">Dokumen teknis komprehensif sesuai 4 output wajib</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSection('flow')}
          className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-colors ${
            activeSection === 'flow'
              ? 'bg-white text-sky-800 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          1. User Journey Flow
        </button>
        <button
          onClick={() => setActiveSection('folder')}
          className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-colors ${
            activeSection === 'folder'
              ? 'bg-white text-sky-800 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          2. Struktur Folder
        </button>
        <button
          onClick={() => setActiveSection('code')}
          className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-colors ${
            activeSection === 'code'
              ? 'bg-white text-sky-800 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          3. Kode Frontend
        </button>
        <button
          onClick={() => setActiveSection('schema')}
          className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-colors ${
            activeSection === 'schema'
              ? 'bg-white text-sky-800 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          4. Database JSON
        </button>
      </div>

      {/* Section 1: User Journey Flow */}
      {activeSection === 'flow' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-sky-600" />
              Alur Pengguna Lengkap (User Journey Flow)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Alur dirancang sesederhana mungkin agar siswa SMK usia 15–18 tahun tidak mengalami kebingungan (*low cognitive load*) dan dapat menjalankan seluruh proses hanya dengan jempol satu tangan.
            </p>

            {/* Step list */}
            <div className="space-y-3 pt-2">
              {/* Step 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sky-800 text-xs block">
                  Tahap 1: Akses Awal & Personalisasi Aksesibilitas
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Siswa membuka aplikasi (login ringan dengan NISN & No HP). Aplikasi langsung mendeteksi kondisi cahaya; siswa dapat mengaktifkan <strong>"Mode Kontras Terik"</strong> atau memilih <strong>Ukuran Tulisan Besar</strong> lewat tombol cepat di bagian atas layar.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sky-800 text-xs block">
                  Tahap 2: Eksplorasi Lowongan Magang Pemula
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Siswa memilih kategori berdasarkan jurusan (Administrasi, IT/Desain, Multimedia, Teknik, Pemasaran, Akuntansi). Setiap lowongan menampilkan tugas dalam <strong>poin-poin sederhana bebas jargon</strong> serta badge jelas (Uang Saku, WFH/WFO, Sertifikat).
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sky-800 text-xs block">
                  Tahap 3: Form Lamaran 1-Klik & Tracker Status
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Siswa melamar hanya dengan melampirkan Surat Pengantar Sekolah (PDF/Foto) dan bio ringkas. Status lamaran dipantau secara real-time melalui <strong>Visual Step Tracker</strong> (Terkirim ➔ Ditinjau ➔ Diterima).
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sky-800 text-xs block">
                  Tahap 4: Absensi GPS/Selfie 1-Ketuk & Pengisian Jurnal Suara
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Setelah diterima magang, menu Jurnal otomatis aktif:
                  <br />• <strong>Absensi Cepat:</strong> 1-ketuk tombol "Absen Masuk" merekam jam dan koordinat GPS kantor.
                  <br />• <strong>Dikte Suara (Voice-to-Text):</strong> Siswa menekan tombol mikrofon dan berbicara dalam Bahasa Indonesia. Sistem langsung mengubah suara menjadi teks uraian kegiatan secara instan.
                  <br />• <strong>Bukti Foto:</strong> Ambil foto langsung dari kamera HP atau galeri.
                </p>
              </div>

              {/* Step 5 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sky-800 text-xs block">
                  Tahap 5: Ekspor PDF Resmi & Verifikasi Guru Pembimbing
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Siswa menekan tombol <strong>"Ekspor PDF"</strong> untuk menghasilkan dokumen Laporan Jurnal PKL berformat resmi (lengkap dengan kop sekolah, identitas, tabel logbook, dan kolom tanda tangan pembimbing) siap kirim via WhatsApp ke guru sekolah. Guru sekolah juga dapat memeriksa dan memberi paraf secara digital.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Struktur Folder */}
      {activeSection === 'folder' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FolderTree className="w-4 h-4 text-sky-600" />
                Struktur Folder Modular & Rapi
              </h3>
              <button
                onClick={() => copyToClipboard(folderStructureText, 'folder')}
                className="min-h-[40px] px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 flex items-center gap-1"
              >
                {copiedKey === 'folder' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'folder' ? 'Tersalin' : 'Salin Struktur'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
              {folderStructureText}
            </pre>
          </div>
        </div>
      )}

      {/* Section 3: Kode Frontend Accessibility Highlights */}
      {activeSection === 'code' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-sky-600" />
              Penerapan Standar Aksesibilitas (WCAG AA & Touch Targets)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Implementasi kode menggunakan <strong>React 19 + Tailwind CSS</strong> yang telah terpasang dan berjalan secara interaktif di aplikasi ini. Berikut adalah sorotan teknik aksesibilitas yang diterapkan:
            </p>

            <div className="space-y-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900">1. Area Sentuh Minimal 48×48dp (Touch Hitbox)</span>
                <p className="text-slate-600">
                  Setiap tombol navigasi, card lowongan, input form, dan tombol aksi menggunakan kelas <code>min-h-[48px]</code> atau <code>min-h-[44px]</code> dengan padding yang cukup sehingga nyaman ditekan jempol satu tangan tanpa salah ketuk.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900">2. Font Scaling Tanpa Merusak Tata Letak</span>
                <p className="text-slate-600">
                  Menggunakan atribut <code>data-font-size="small | normal | large | xlarge"</code> pada elemen <code>&lt;html&gt;</code> yang mengubah variabel CSS <code>--font-scale</code> dari 0.9x hingga 1.3x. Seluruh teks dan baris tata letak menyesuaikan otomatis.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900">3. Mode Kontras Terik (Outdoor Daylight Mode)</span>
                <p className="text-slate-600">
                  Untuk mengatasi sinar matahari saat siswa berada di bengkel, gudang, atau lapangan, mode kontras tinggi menguatkan ketebalan teks (font-weight 600+) dan mempertegas garis tepi border 2px solid.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900">4. Voice-to-Text Bahasa Indonesia (id-ID)</span>
                <p className="text-slate-600">
                  Mengintegrasikan Web Speech Recognition API dengan konfigurasi <code>lang = 'id-ID'</code>, dilengkapi umpan balik visual animasi mic merah berkedip dan tombol kalimat cepat untuk siswa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Database JSON Schema */}
      {activeSection === 'schema' && (
        <div className="space-y-4">
          {/* Schema 1: User */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-sky-600" />
                1. Skema Data: User (Siswa / Guru)
              </h3>
              <button
                onClick={() => copyToClipboard(jsonSchemaUser, 'user')}
                className="min-h-[36px] px-2 py-1 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 flex items-center gap-1"
              >
                {copiedKey === 'user' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-sky-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56">
              {jsonSchemaUser}
            </pre>
          </div>

          {/* Schema 2: LowonganMagang */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-600" />
                2. Skema Data: LowonganMagang
              </h3>
              <button
                onClick={() => copyToClipboard(jsonSchemaLowongan, 'lowongan')}
                className="min-h-[36px] px-2 py-1 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 flex items-center gap-1"
              >
                {copiedKey === 'lowongan' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56">
              {jsonSchemaLowongan}
            </pre>
          </div>

          {/* Schema 3: LogbookHarian */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-amber-600" />
                3. Skema Data: LogbookHarian
              </h3>
              <button
                onClick={() => copyToClipboard(jsonSchemaLogbook, 'logbook')}
                className="min-h-[36px] px-2 py-1 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 flex items-center gap-1"
              >
                {copiedKey === 'logbook' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-amber-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56">
              {jsonSchemaLogbook}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
