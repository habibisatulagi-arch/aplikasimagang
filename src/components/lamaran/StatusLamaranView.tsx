import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  Send,
  ChevronRight,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const StatusLamaranView: React.FC = () => {
  const { lamaranList, setActiveTab } = useApp();

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'terkirim':
        return {
          bg: 'bg-sky-100 text-sky-800 border-sky-300',
          label: '1. Terkirim',
          desc: 'Berkas kamu telah sampai di pihak perusahaan.',
        };
      case 'ditinjau':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          label: '2. Sedang Ditinjau',
          desc: 'HRD dan pembimbing sedang memeriksa surat pengantar sekolah.',
        };
      case 'diterima':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          label: '3. Diterima Magang',
          desc: 'Selamat! Kamu resmi diterima magang di perusahaan ini.',
        };
      case 'belum_sesuai':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          label: 'Belum Sesuai',
          desc: 'Kuota penuh atau kualifikasi jurusan belum sesuai.',
        };
    }
  };

  const steps = [
    { key: 'terkirim', label: 'Terkirim' },
    { key: 'ditinjau', label: 'Ditinjau' },
    { key: 'diterima', label: 'Diterima' },
  ];

  const getStepIndex = (status: ApplicationStatus) => {
    if (status === 'terkirim') return 0;
    if (status === 'ditinjau') return 1;
    if (status === 'diterima') return 2;
    return 1;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner on Laptop/Desktop */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Status Pengajuan Lamaran Magang
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pantau proses verifikasi berkas surat pengantar sekolah dan persetujuan dari perusahaan mitra secara transparan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-sky-100 text-sky-900 font-extrabold text-xs">
            {lamaranList.length} Lamaran Diajukan
          </span>
          <button
            onClick={() => setActiveTab('beranda')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Briefcase className="w-4 h-4" />
            <span>Cari Lowongan Lain</span>
          </button>
        </div>
      </div>

      {lamaranList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FileCheck2 className="w-16 h-16 text-slate-300 mx-auto mb-3" />
          <h2 className="text-base font-bold text-slate-800">Belum Ada Lamaran Yang Diajukan</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Kamu belum melamar ke tempat magang manapun. Telusuri lowongan magang yang sesuai dengan jurusanmu di halaman Beranda.
          </p>
          <button
            onClick={() => setActiveTab('beranda')}
            className="mt-4 min-h-[48px] px-6 py-2.5 bg-sky-700 text-white font-bold text-xs rounded-xl hover:bg-sky-800"
          >
            Buka Katalog Lowongan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lamaranList.map((item) => {
            const currentStepIdx = getStepIndex(item.status);
            const badge = getStatusBadge(item.status);

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.posisi}</h3>
                      <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{item.perusahaan}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Tanggal Pengajuan: {item.tanggalLamar}</span>
                      </p>
                    </div>

                    <span
                      className={`inline-block px-3 py-1 rounded-xl text-xs font-bold border ${badge.bg}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Visual Step Tracker */}
                  <div className="py-4">
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute left-6 right-6 top-3.5 h-1 bg-slate-200 -z-0" />
                      <div
                        className="absolute left-6 top-3.5 h-1 bg-sky-600 transition-all -z-0"
                        style={{
                          width:
                            currentStepIdx === 0
                              ? '0%'
                              : currentStepIdx === 1
                              ? '50%'
                              : 'calc(100% - 3rem)',
                        }}
                      />

                      {steps.map((st, idx) => {
                        const isCompleted = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={st.key} className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isCompleted
                                  ? 'bg-sky-600 text-white shadow-xs'
                                  : 'bg-slate-200 text-slate-500'
                              } ${isCurrent ? 'ring-4 ring-sky-100' : ''}`}
                            >
                              {isCompleted ? '✓' : idx + 1}
                            </div>
                            <span
                              className={`text-xs mt-1.5 font-bold ${
                                isCurrent
                                  ? 'text-sky-700'
                                  : isCompleted
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* HRD / System Feedback Note */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-sky-600" />
                      Catatan Proses dari Perusahaan:
                    </p>
                    <p className="text-slate-600 leading-relaxed pl-5">
                      {item.pesanPerusahaan || badge.desc}
                    </p>
                  </div>
                </div>

                {/* Footer action bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="truncate">{item.namaSuratPengantar}</span>
                  </span>

                  {item.status === 'diterima' ? (
                    <button
                      onClick={() => setActiveTab('jurnal')}
                      className="min-h-[44px] px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Buka Jurnal PKL</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 italic">Menunggu update berkas</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
