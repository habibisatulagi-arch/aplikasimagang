export type InternshipStatus = 'belum_magang' | 'sedang_magang' | 'selesai_magang';

export type ApplicationStatus = 'terkirim' | 'ditinjau' | 'diterima' | 'belum_sesuai';

export interface UserProfile {
  id: string;
  nama: string;
  nisn: string;
  asalSekolah: string;
  jurusan: string;
  kelas: string;
  noHp: string;
  email: string;
  fotoUrl?: string;
  statusMagang: InternshipStatus;
  tempatMagangAktif?: {
    perusahaanId: string;
    namaPerusahaan: string;
    posisi: string;
    mentor: string;
    guruPembimbing: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    lokasiKantor: string;
  };
}

export interface LowonganMagang {
  id: string;
  posisi: string;
  perusahaan: string;
  logo: string;
  lokasi: string;
  kota: string;
  kategori: 'administrasi' | 'it_desain' | 'pemasaran' | 'teknik' | 'multimedia' | 'akuntansi';
  tipeKerja: 'Di Kantor (WFO)' | 'Bisa WFH' | 'Campuran (Hybrid)';
  uangSaku: string;
  sertifikat: boolean;
  kuotaTersisa: number;
  durasiBulan: number;
  deskripsiSingkat: string;
  poinTugas: string[];
  kualifikasiSederhana: string[];
  alamatLengkap: string;
  kontakPerusahaan: string;
}

export interface AttendanceRecord {
  id: string;
  tanggal: string;
  waktuMasuk?: string;
  lokasiMasuk?: string;
  fotoMasuk?: string;
  waktuPulang?: string;
  lokasiPulang?: string;
  fotoPulang?: string;
  status: 'hadir' | 'izin' | 'sakit' | 'libur';
}

export interface LogbookHarian {
  id: string;
  tanggal: string; // YYYY-MM-DD
  jamMulai: string; // HH:mm
  jamSelesai: string; // HH:mm
  judulKegiatan: string;
  deskripsiKegiatan: string;
  fotoBukti?: string;
  fotoCaption?: string;
  parafGuru: boolean;
  catatanGuru?: string;
  createdAt: string;
}

export interface LamaranMagang {
  id: string;
  lowonganId: string;
  posisi: string;
  perusahaan: string;
  tanggalLamar: string;
  status: ApplicationStatus;
  namaSuratPengantar: string;
  catatanSiswa: string;
  pesanPerusahaan?: string;
  catatanTahap: {
    terkirimAt: string;
    ditinjauAt?: string;
    diterimaAt?: string;
  };
}

export type FontSizeSetting = 'small' | 'normal' | 'large' | 'xlarge';
