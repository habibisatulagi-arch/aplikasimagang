import { jsPDF } from 'jspdf';
import { UserProfile, LogbookHarian } from '../types';

export function exportLogbookToPDF(user: UserProfile, logbook: LogbookHarian[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let currentY = 16;

  // Header Box
  doc.setDrawColor(2, 132, 199); // Sky-600
  doc.setLineWidth(0.8);
  doc.rect(margin, currentY, pageWidth - margin * 2, 28);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(2, 132, 199);
  doc.text('LAPORAN JURNAL HARIAN PRAKTIK KERJA LAPANGAN (PKL)', pageWidth / 2, currentY + 8, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(user.asalSekolah.toUpperCase(), pageWidth / 2, currentY + 14, { align: 'center' });
  doc.text('Tahun Ajaran 2026/2027 — Aplikasi MagangKu', pageWidth / 2, currentY + 20, { align: 'center' });

  currentY += 34;

  // Student & Internship Biodata
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, pageWidth - margin * 2, 28, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, currentY, pageWidth - margin * 2, 28);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);

  // Left col
  doc.text(`Nama Siswa   : ${user.nama}`, margin + 4, currentY + 7);
  doc.text(`NISN              : ${user.nisn}`, margin + 4, currentY + 13);
  doc.text(`Jurusan / Kls : ${user.jurusan} (${user.kelas})`, margin + 4, currentY + 19);
  doc.text(`No. Kontak    : ${user.noHp}`, margin + 4, currentY + 25);

  // Right col
  const tempat = user.tempatMagangAktif?.namaPerusahaan || 'Belum Terdaftar';
  const posisi = user.tempatMagangAktif?.posisi || '-';
  const guru = user.tempatMagangAktif?.guruPembimbing || 'Bpk/Ibu Guru Pembimbing';
  const mentor = user.tempatMagangAktif?.mentor || 'Pembimbing Lapangan';

  doc.text(`Tempat Magang : ${tempat}`, margin + 90, currentY + 7);
  doc.text(`Posisi              : ${posisi}`, margin + 90, currentY + 13);
  doc.text(`Guru Sekolah   : ${guru}`, margin + 90, currentY + 19);
  doc.text(`Mentor Industri : ${mentor}`, margin + 90, currentY + 25);

  currentY += 34;

  // Section Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('A. CATATAN KEGIATAN HARIAN', margin, currentY);

  currentY += 4;

  // Table Header
  const colX = {
    no: margin,
    tanggal: margin + 10,
    jam: margin + 35,
    kegiatan: margin + 60,
    paraf: margin + 150,
  };
  const tableWidth = pageWidth - margin * 2;

  doc.setFillColor(2, 132, 199);
  doc.rect(margin, currentY, tableWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');

  doc.text('No', colX.no + 3, currentY + 5.5);
  doc.text('Tanggal', colX.tanggal + 2, currentY + 5.5);
  doc.text('Jam Kerja', colX.jam + 2, currentY + 5.5);
  doc.text('Uraian Tugas / Kegiatan Harian', colX.kegiatan + 2, currentY + 5.5);
  doc.text('Status Paraf', colX.paraf + 2, currentY + 5.5);

  currentY += 8;

  // Table Body
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  logbook.forEach((item, index) => {
    // calculate height based on text wrap
    const descLines = doc.splitTextToSize(
      `[${item.judulKegiatan}]\n${item.deskripsiKegiatan}`,
      85
    );
    const rowHeight = Math.max(14, descLines.length * 3.8 + 4);

    // page overflow check
    if (currentY + rowHeight > 240) {
      doc.addPage();
      currentY = 20;
    }

    // alternating row fill
    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, tableWidth, rowHeight, 'F');
    }

    // cell borders
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, currentY, tableWidth, rowHeight);

    // column values
    doc.text(String(index + 1), colX.no + 3, currentY + 6);
    doc.text(item.tanggal, colX.tanggal + 2, currentY + 6);
    doc.text(`${item.jamMulai} - ${item.jamSelesai}`, colX.jam + 2, currentY + 6);
    doc.text(descLines, colX.kegiatan + 2, currentY + 5);

    // Paraf text
    if (item.parafGuru) {
      doc.setTextColor(16, 185, 129); // green
      doc.text('✓ Disetujui', colX.paraf + 3, currentY + 6);
      doc.setTextColor(30, 41, 59);
    } else {
      doc.setTextColor(217, 119, 6); // amber
      doc.text('Pending Review', colX.paraf + 3, currentY + 6);
      doc.setTextColor(30, 41, 59);
    }

    currentY += rowHeight;
  });

  currentY += 12;

  // Signatures Section (check bottom of page)
  if (currentY + 36 > 280) {
    doc.addPage();
    currentY = 20;
  }

  const signColWidth = (pageWidth - margin * 2) / 3;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  const tglCetak = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  doc.text(`Dicetak pada: ${tglCetak}`, margin, currentY - 3);

  // Signer 1: Siswa
  doc.text('Siswa Praktik / Magang,', margin + 6, currentY + 4);
  doc.text('( ........................................ )', margin + 6, currentY + 26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(user.nama, margin + 6, currentY + 30);

  // Signer 2: Guru Pembimbing
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Guru Pembimbing Sekolah,', margin + signColWidth + 6, currentY + 4);
  doc.text('( ........................................ )', margin + signColWidth + 6, currentY + 26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(guru, margin + signColWidth + 6, currentY + 30);

  // Signer 3: Mentor Industri
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Pembimbing Industri (DUDI),', margin + signColWidth * 2 + 6, currentY + 4);
  doc.text('( ........................................ )', margin + signColWidth * 2 + 6, currentY + 26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(mentor, margin + signColWidth * 2 + 6, currentY + 30);

  // Save the PDF
  const filename = `Laporan_Jurnal_Magang_${user.nama.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
}
