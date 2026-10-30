import { UserProfile, LowonganMagang, LogbookHarian, LamaranMagang } from '../types';

export const initialUser: UserProfile = {
  id: 'usr_bagus_001',
  nama: 'Bagus Pratama',
  nisn: '0078129345',
  asalSekolah: 'SMK Negeri 1 Cibinong',
  jurusan: 'Rekayasa Perangkat Lunak (RPL)',
  kelas: 'XII RPL 2',
  noHp: '0812-9876-5432',
  email: 'bagus.pratama@smkn1cibinong.sch.id',
  fotoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=BagusPratama',
  statusMagang: 'sedang_magang',
  tempatMagangAktif: {
    perusahaanId: 'comp_01',
    namaPerusahaan: 'PT Solusi Digital Nusantara',
    posisi: 'Junior Web & UI Assistant',
    mentor: 'Bpk. Ahmad Fauzi, S.Kom (Head of Tech)',
    guruPembimbing: 'Ibu Ratna Dewi, M.Pd (Guru Produktif RPL)',
    tanggalMulai: '2026-09-01',
    tanggalSelesai: '2026-12-01',
    lokasiKantor: 'Jl. Pemuda No. 45, Bogor (Dekat Stasiun)',
  },
};

export const sampleLowongan: LowonganMagang[] = [
  {
    id: 'comp_01',
    posisi: 'Junior Web & UI Assistant',
    perusahaan: 'PT Solusi Digital Nusantara',
    logo: 'SDN',
    lokasi: 'Bogor & Depok',
    kota: 'Bogor',
    kategori: 'it_desain',
    tipeKerja: 'Campuran (Hybrid)',
    uangSaku: 'Rp 1.200.000 / bln',
    sertifikat: true,
    kuotaTersisa: 3,
    durasiBulan: 3,
    deskripsiSingkat: 'Membantu tim web merapikan tampilan aplikasi dan membuat banner interaktif sederhana.',
    poinTugas: [
      'Membantu testing tombol dan tampilan website agar pas di HP',
      'Merancang ikon dan ilustrasi sederhana di Canva / Figma',
      'Mendokumentasikan masukan pengguna dalam tabel Google Sheets',
      'Mengikuti briefing santai pagi bersama pembimbing lapangan'
    ],
    kualifikasiSederhana: [
      'Siswa SMK jurusan RPL, Multimedia, atau TKJ kelas XI/XII',
      'Familiar dengan komputer dan mau belajar hal baru',
      'Memiliki surat pengantar resmi dari pihak sekolah'
    ],
    alamatLengkap: 'Gedung Graha Digital Lt. 3, Jl. Pemuda No. 45, Cibinong, Bogor',
    kontakPerusahaan: 'hrd@solusidigital.id (0811-2233-4455)'
  },
  {
    id: 'comp_02',
    posisi: 'Staf Administrasi & Data Kantor',
    perusahaan: 'Koperasi Mandiri Berkah',
    logo: 'KMB',
    lokasi: 'Jakarta Timur',
    kota: 'Jakarta',
    kategori: 'administrasi',
    tipeKerja: 'Di Kantor (WFO)',
    uangSaku: 'Rp 900.000 / bln',
    sertifikat: true,
    kuotaTersisa: 2,
    durasiBulan: 3,
    deskripsiSingkat: 'Membantu penataan arsip berkas anggota dan penginputan data keuangan sederhana di Excel.',
    poinTugas: [
      'Menginput rekap nota pembelian dan kwitansi ke komputer',
      'Menyusun arsip dokumen ke dalam map ordner sesuai abjad',
      'Membantu melayani tamu yang ingin mengambil formulir anggota'
    ],
    kualifikasiSederhana: [
      'Siswa SMK jurusan Akuntansi, OTKP, atau Manajemen Perkantoran',
      'Teliti, rapi, dan terbiasa mengetik di laptop/komputer',
      'Disiplin waktu dan sopan'
    ],
    alamatLengkap: 'Jl. Otista Raya No. 120, Jatinegara, Jakarta Timur',
    kontakPerusahaan: 'admin@koperasimandiri.co.id'
  },
  {
    id: 'comp_03',
    posisi: 'Asisten Konten Kreatif & Media Sosial',
    perusahaan: 'Studio Visual Nusantara',
    logo: 'SVN',
    lokasi: 'Jakarta Selatan',
    kota: 'Jakarta',
    kategori: 'multimedia',
    tipeKerja: 'Bisa WFH',
    uangSaku: 'Rp 1.000.000 / bln',
    sertifikat: true,
    kuotaTersisa: 4,
    durasiBulan: 3,
    deskripsiSingkat: 'Bikin video pendek Reels/TikTok dan edit foto produk katalog UMKM bersama tim kreatif.',
    poinTugas: [
      'Mengambil video dan foto produk menggunakan kamera HP / kamera studio',
      'Mengedit video pendek dengan CapCut atau Premiere Pro',
      'Menulis caption bahasa santai untuk promosi mingguan'
    ],
    kualifikasiSederhana: [
      'Siswa SMK jurusan Multimedia, DKV, atau Animasi',
      'Hobi foto/video dan paham tren media sosial',
      'Membawa portofolio karya sederhana (link Instagram/Google Drive)'
    ],
    alamatLengkap: 'Kuningan Creative Hub, Jl. Rasuna Said Kav. 8, Jakarta Selatan',
    kontakPerusahaan: 'halo@studiovisual.id'
  },
  {
    id: 'comp_04',
    posisi: 'Teknisi Jaringan & Komputer Dasar',
    perusahaan: 'PT Citra Fiber Telekomunikasi',
    logo: 'CFT',
    lokasi: 'Depok',
    kota: 'Depok',
    kategori: 'teknik',
    tipeKerja: 'Di Kantor (WFO)',
    uangSaku: 'Rp 1.100.000 / bln',
    sertifikat: true,
    kuotaTersisa: 2,
    durasiBulan: 3,
    deskripsiSingkat: 'Praktek langsung crimping kabel LAN, cek router WiFi, dan instalasi software kantor.',
    poinTugas: [
      'Membantu teknisi senior memeriksa sambungan kabel jaringan internet',
      'Instalasi ulang Windows dan software perkantoran di PC staf',
      'Mencatat nomor seri modem dan perangkat router di gudang'
    ],
    kualifikasiSederhana: [
      'Siswa SMK jurusan Teknik Komputer Jaringan (TKJ) / Teknik Elektro',
      'Paham dasar kabel UTP dan instalasi driver komputer',
      'Sehat jasmani dan suka kerja lapangan'
    ],
    alamatLengkap: 'Ruko Margonda Point Blok B2, Jl. Margonda Raya, Depok',
    kontakPerusahaan: 'teknisi@citrafiber.com'
  },
  {
    id: 'comp_05',
    posisi: 'Asisten Promosi Toko Online',
    perusahaan: 'Sentra Mode Remaja',
    logo: 'SMR',
    lokasi: 'Bandung',
    kota: 'Bandung',
    kategori: 'pemasaran',
    tipeKerja: 'Bisa WFH',
    uangSaku: 'Rp 850.000 / bln',
    sertifikat: true,
    kuotaTersisa: 5,
    durasiBulan: 3,
    deskripsiSingkat: 'Bantu membalas chat pembeli di Shopee/Tokopedia dan cek stok pakaian di etalase.',
    poinTugas: [
      'Membalas pesan tanya jawab pembeli dengan ramah dan cepat',
      'Memperbarui status stok barang yang habis di dashboard e-commerce',
      'Menyiapkan stiker resi pengiriman paket pesanan'
    ],
    kualifikasiSederhana: [
      'Siswa SMK jurusan Bisnis Daring & Pemasaran (BDP) atau Umum',
      'Komunikatif, ramah, dan telaten membalas chat',
      'Dapat menggunakan HP Android dengan lancar'
    ],
    alamatLengkap: 'Jl. R.E. Martadinata No. 88, Bandung',
    kontakPerusahaan: 'karir@sentramode.com'
  },
  {
    id: 'comp_06',
    posisi: 'Asisten Pembukuan & Kasir Toko',
    perusahaan: 'Toko Buku Pelajar Harapan',
    logo: 'TBH',
    lokasi: 'Bekasi',
    kota: 'Bekasi',
    kategori: 'akuntansi',
    tipeKerja: 'Di Kantor (WFO)',
    uangSaku: 'Rp 950.000 / bln',
    sertifikat: true,
    kuotaTersisa: 2,
    durasiBulan: 3,
    deskripsiSingkat: 'Belajar mencocokkan struk penjualan kasir harian dan menghitung persediaan buku tulis.',
    poinTugas: [
      'Menghitung uang kas masuk dan mencocokkan dengan struk komputer',
      'Mencatat faktur pesanan buku dari distributor penerbit',
      'Membantu scan barcode barang saat stok opname bulanan'
    ],
    kualifikasiSederhana: [
      'Siswa SMK jurusan Akuntansi dan Keuangan Lembaga (AKL)',
      'Teliti dalam berhitung dan mencatat angka',
      'Jujur, bertanggung jawab, dan disiplin'
    ],
    alamatLengkap: 'Jl. Ahmad Yani No. 15, Bekasi Selatan',
    kontakPerusahaan: 'admin@tokopecintailmu.com'
  }
];

export const initialLogbook: LogbookHarian[] = [
  {
    id: 'log_01',
    tanggal: '2026-10-20',
    jamMulai: '08:00',
    jamSelesai: '16:00',
    judulKegiatan: 'Merapikan komponen form profil siswa',
    deskripsiKegiatan: 'Pagi ini saya mengikuti briefing bersama Kak Ahmad. Tugas saya adalah menguji tombol Simpan pada aplikasi agar ukurannya minimal 48px dan mudah ditekan di HP Android kecil. Hasilnya dicatat dalam lembar periksa.',
    fotoBukti: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80',
    fotoCaption: 'Tangkapan layar pengujian tombol di perangkat uji',
    parafGuru: true,
    catatanGuru: 'Bagus sekali! Pastikan selalu dicoba dengan kontras warna yang cukup agar terbaca di luar ruangan.',
    createdAt: '2026-10-20T16:15:00Z'
  },
  {
    id: 'log_02',
    tanggal: '2026-10-21',
    jamMulai: '08:30',
    jamSelesai: '16:30',
    judulKegiatan: 'Membuat palet warna ramah mata untuk dashboard',
    deskripsiKegiatan: 'Membantu memilih perpaduan warna biru muda (#0EA5E9) dan abu-abu netral agar mata tidak lelah saat melihat aplikasi dalam waktu lama. Saya juga mencoba fitur dikte suara untuk mencatat ide.',
    fotoBukti: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
    fotoCaption: 'Catatan palet warna desain antarmuka',
    parafGuru: true,
    catatanGuru: 'Sudah sesuai dengan standar kompetensi UI dasar SMK.',
    createdAt: '2026-10-21T16:35:00Z'
  },
  {
    id: 'log_03',
    tanggal: '2026-10-22',
    jamMulai: '08:00',
    jamSelesai: '17:00',
    judulKegiatan: 'Mengecek fungsi ekspor laporan jurnal ke PDF',
    deskripsiKegiatan: 'Melakukan uji coba tombol Ekspor PDF. Memastikan nama sekolah, nama pembimbing DUDI, serta nomor NISN muncul jelas di bagian atas lembar laporan.',
    fotoBukti: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    fotoCaption: 'Melihat hasil cetak dokumen laporan',
    parafGuru: false,
    catatanGuru: 'Menunggu verifikasi guru pembimbing',
    createdAt: '2026-10-22T17:05:00Z'
  }
];

export const initialLamaran: LamaranMagang[] = [
  {
    id: 'lam_01',
    lowonganId: 'comp_01',
    posisi: 'Junior Web & UI Assistant',
    perusahaan: 'PT Solusi Digital Nusantara',
    tanggalLamar: '2026-08-15',
    status: 'diterima',
    namaSuratPengantar: 'Surat_Pengantar_SMKN1Cibinong_Bagus.pdf',
    catatanSiswa: 'Saya siswa RPL yang tertarik mempelajari tata letak dan desain web yang ramah pengguna.',
    pesanPerusahaan: 'Selamat! Berkas dan portofolio kamu telah disetujui. Silakan mulai magang per 1 September 2026.',
    catatanTahap: {
      terkirimAt: '15 Agustus 2026, 09:30 WIB',
      ditinjauAt: '18 Agustus 2026, 14:00 WIB',
      diterimaAt: '22 Agustus 2026, 11:15 WIB'
    }
  },
  {
    id: 'lam_02',
    lowonganId: 'comp_04',
    posisi: 'Teknisi Jaringan & Komputer Dasar',
    perusahaan: 'PT Citra Fiber Telekomunikasi',
    tanggalLamar: '2026-08-10',
    status: 'ditinjau',
    namaSuratPengantar: 'Surat_Pengantar_TKJ_SMK1.pdf',
    catatanSiswa: 'Ingin menambah jam terbang konfigurasi mikrotik dan fiber optik langsung di lapangan.',
    pesanPerusahaan: 'Berkas surat sekolah sedang dalam verifikasi bagian operasional.',
    catatanTahap: {
      terkirimAt: '10 Agustus 2026, 11:00 WIB',
      ditinjauAt: '12 Agustus 2026, 16:45 WIB'
    }
  }
];
