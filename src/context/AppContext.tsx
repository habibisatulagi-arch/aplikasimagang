import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  LowonganMagang,
  LogbookHarian,
  LamaranMagang,
  AttendanceRecord,
  FontSizeSetting,
} from '../types';
import { initialUser, sampleLowongan, initialLogbook, initialLamaran } from '../data/mockData';
import { db, auth, googleProvider } from '../firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentUser: FirebaseUser | null;
  authLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  lowonganList: LowonganMagang[];
  logbook: LogbookHarian[];
  lamaranList: LamaranMagang[];
  attendance: AttendanceRecord[];
  activeTab: 'beranda' | 'jurnal' | 'lamaran' | 'profil' | 'arsitektur';
  setActiveTab: (tab: 'beranda' | 'jurnal' | 'lamaran' | 'profil' | 'arsitektur') => void;
  activeRole: 'siswa' | 'guru';
  setActiveRole: (role: 'siswa' | 'guru') => void;
  fontSize: FontSizeSetting;
  setFontSize: (size: FontSizeSetting) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  deviceViewMode: 'mobile' | 'responsive';
  setDeviceViewMode: (mode: 'mobile' | 'responsive') => void;
  selectedLowonganForDetail: LowonganMagang | null;
  setSelectedLowonganForDetail: (l: LowonganMagang | null) => void;
  selectedLowonganForApply: LowonganMagang | null;
  setSelectedLowonganForApply: (l: LowonganMagang | null) => void;
  addLogbookEntry: (entry: Omit<LogbookHarian, 'id' | 'createdAt' | 'parafGuru'>) => Promise<void>;
  addLamaran: (lowongan: LowonganMagang, suratName: string, bioRingkas: string) => Promise<void>;
  checkInAttendance: (coords?: string, photo?: string) => Promise<void>;
  checkOutAttendance: (coords?: string, photo?: string) => Promise<void>;
  todayAttendance: AttendanceRecord | undefined;
  approveLogbookEntry: (id: string, catatan: string) => Promise<void>;
  exportPDF: () => void;
  switchInternshipStatus: (status: 'belum_magang' | 'sedang_magang') => Promise<void>;
  isFirebaseConnected: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('magangku_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [lowonganList, setLowonganList] = useState<LowonganMagang[]>(sampleLowongan);
  const [logbook, setLogbook] = useState<LogbookHarian[]>(() => {
    const saved = localStorage.getItem('magangku_logbook');
    return saved ? JSON.parse(saved) : initialLogbook;
  });

  const [lamaranList, setLamaranList] = useState<LamaranMagang[]>(() => {
    const saved = localStorage.getItem('magangku_lamaran');
    return saved ? JSON.parse(saved) : initialLamaran;
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    {
      id: 'att_01',
      tanggal: todayStr,
      waktuMasuk: '07:55',
      lokasiMasuk: 'Jl. Pemuda No. 45, Bogor (-6.4912, 106.8291)',
      status: 'hadir',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'beranda' | 'jurnal' | 'lamaran' | 'profil' | 'arsitektur'>('beranda');
  const [activeRole, setActiveRole] = useState<'siswa' | 'guru'>('siswa');
  const [fontSize, setFontSize] = useState<FontSizeSetting>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [deviceViewMode, setDeviceViewMode] = useState<'mobile' | 'responsive'>('responsive');

  const [selectedLowonganForDetail, setSelectedLowonganForDetail] = useState<LowonganMagang | null>(null);
  const [selectedLowonganForApply, setSelectedLowonganForApply] = useState<LowonganMagang | null>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setCurrentUser(fbUser);
      setAuthLoading(false);
      if (fbUser) {
        setUser((prev) => ({
          ...prev,
          id: fbUser.uid,
          nama: fbUser.displayName || prev.nama,
          email: fbUser.email || prev.email,
          fotoUrl: fbUser.photoURL || prev.fotoUrl,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Seed & sync lowongan to Firestore
  useEffect(() => {
    const seedAndFetchLowongan = async () => {
      try {
        const snap = await getDocs(collection(db, 'lowongan'));
        if (snap.empty) {
          // Seed sample lowongan so Firestore has initial catalog
          for (const item of sampleLowongan) {
            await setDoc(doc(db, 'lowongan', item.id), item);
          }
          setLowonganList(sampleLowongan);
        } else {
          const list: LowonganMagang[] = [];
          snap.forEach((d) => list.push(d.data() as LowonganMagang));
          setLowonganList(list);
        }
      } catch (err) {
        console.warn('Using local fallback for lowongan:', err);
      }
    };
    seedAndFetchLowongan();
  }, []);

  // Realtime Logbook Sync with Firestore
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'logbook'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: LogbookHarian[] = [];
          snapshot.forEach((d) => list.push(d.data() as LogbookHarian));
          // Sort descending by date/createdAt
          list.sort((a, b) => (b.tanggal > a.tanggal ? 1 : -1));
          setLogbook(list);
        }
      },
      (error) => {
        console.warn('Firestore snapshot error on logbook:', error);
      }
    );
    return () => unsub();
  }, []);

  // Realtime Lamaran Sync with Firestore
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'lamaran'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: LamaranMagang[] = [];
          snapshot.forEach((d) => list.push(d.data() as LamaranMagang));
          setLamaranList(list);
        }
      },
      (error) => {
        console.warn('Firestore snapshot error on lamaran:', error);
      }
    );
    return () => unsub();
  }, []);

  // Sync DOM attributes for font-scaling and outdoor high-contrast
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  }, [highContrast]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google Sign In Error:', err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  const todayAttendance = attendance.find((a) => a.tanggal === todayStr);

  const addLogbookEntry = async (entryData: Omit<LogbookHarian, 'id' | 'createdAt' | 'parafGuru'>) => {
    const newId = `log_${Date.now()}`;
    const newEntry: LogbookHarian = {
      ...entryData,
      id: newId,
      parafGuru: false,
      createdAt: new Date().toISOString(),
    };

    // Optimistic local update
    setLogbook((prev) => [newEntry, ...prev]);

    // Firestore write
    try {
      await setDoc(doc(db, 'logbook', newId), {
        ...newEntry,
        userId: currentUser?.uid || user.id,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `logbook/${newId}`);
    }
  };

  const addLamaran = async (lowongan: LowonganMagang, suratName: string, bioRingkas: string) => {
    const newId = `lam_${Date.now()}`;
    const newLamaran: LamaranMagang = {
      id: newId,
      lowonganId: lowongan.id,
      posisi: lowongan.posisi,
      perusahaan: lowongan.perusahaan,
      tanggalLamar: new Date().toISOString().split('T')[0],
      status: 'terkirim',
      namaSuratPengantar: suratName || 'Surat_Pengantar_Sekolah.pdf',
      catatanSiswa: bioRingkas,
      pesanPerusahaan: 'Lamaran kamu telah kami terima. Tim HRD dan sekolah akan melakukan verifikasi berkas.',
      catatanTahap: {
        terkirimAt: new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }),
      },
    };

    setLamaranList((prev) => [newLamaran, ...prev]);

    try {
      await setDoc(doc(db, 'lamaran', newId), {
        ...newLamaran,
        userId: currentUser?.uid || user.id,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `lamaran/${newId}`);
    }
  };

  const checkInAttendance = async (coords = '-6.4912, 106.8291 (Gedung Magang)', photo?: string) => {
    const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const attId = `att_${todayStr}`;

    setAttendance((prev) => {
      const existing = prev.find((a) => a.tanggal === todayStr);
      if (existing) {
        return prev.map((a) => (a.tanggal === todayStr ? { ...a, waktuMasuk: nowTime, lokasiMasuk: coords, fotoMasuk: photo } : a));
      }
      return [
        {
          id: attId,
          tanggal: todayStr,
          waktuMasuk: nowTime,
          lokasiMasuk: coords,
          fotoMasuk: photo,
          status: 'hadir',
        },
        ...prev,
      ];
    });

    try {
      await setDoc(doc(db, 'attendance', attId), {
        id: attId,
        userId: currentUser?.uid || user.id,
        tanggal: todayStr,
        waktuMasuk: nowTime,
        lokasiMasuk: coords,
        status: 'hadir',
      });
    } catch (error) {
      console.warn('Attendance firestore update error:', error);
    }
  };

  const checkOutAttendance = async (coords = '-6.4912, 106.8291 (Selesai Kerja)', photo?: string) => {
    const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const attId = `att_${todayStr}`;

    setAttendance((prev) => {
      return prev.map((a) => {
        if (a.tanggal === todayStr) {
          return {
            ...a,
            waktuPulang: nowTime,
            lokasiPulang: coords,
            fotoPulang: photo,
          };
        }
        return a;
      });
    });

    try {
      await updateDoc(doc(db, 'attendance', attId), {
        waktuPulang: nowTime,
        lokasiPulang: coords,
      });
    } catch (error) {
      console.warn('Attendance checkOut firestore update error:', error);
    }
  };

  const approveLogbookEntry = async (id: string, catatan: string) => {
    const defaultCatatan = catatan || 'Telah diverifikasi dan disetujui Guru Pembimbing.';
    setLogbook((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, parafGuru: true, catatanGuru: defaultCatatan } : item
      )
    );

    try {
      await updateDoc(doc(db, 'logbook', id), {
        parafGuru: true,
        catatanGuru: defaultCatatan,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `logbook/${id}`);
    }
  };

  const exportPDF = async () => {
    const { exportLogbookToPDF } = await import('../utils/pdfExport');
    exportLogbookToPDF(user, logbook);
  };

  const switchInternshipStatus = async (status: 'belum_magang' | 'sedang_magang') => {
    const updatedUser: UserProfile = {
      ...user,
      statusMagang: status,
      tempatMagangAktif: status === 'sedang_magang' ? initialUser.tempatMagangAktif : undefined,
    };
    setUser(updatedUser);

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), {
          ...updatedUser,
          id: currentUser.uid,
        });
      } catch (e) {
        console.warn('User status sync error:', e);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentUser,
        authLoading,
        signInWithGoogle,
        logOut,
        lowonganList,
        logbook,
        lamaranList,
        attendance,
        activeTab,
        setActiveTab,
        activeRole,
        setActiveRole,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        deviceViewMode,
        setDeviceViewMode,
        selectedLowonganForDetail,
        setSelectedLowonganForDetail,
        selectedLowonganForApply,
        setSelectedLowonganForApply,
        addLogbookEntry,
        addLamaran,
        checkInAttendance,
        checkOutAttendance,
        todayAttendance,
        approveLogbookEntry,
        exportPDF,
        switchInternshipStatus,
        isFirebaseConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
