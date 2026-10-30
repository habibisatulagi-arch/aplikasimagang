/**
 * Accessible Voice-to-Text Utility (Indonesian Language id-ID)
 * Supports Web Speech Recognition API with automatic graceful fallback
 */

export interface SpeechHandler {
  start: () => void;
  stop: () => void;
  isListening: boolean;
  isSupported: boolean;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onError?: (err: string) => void,
  onStatusChange?: (listening: boolean) => void
) {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }

  // @ts-expect-error - webkitSpeechRecognition is vendor prefixed
  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognizer = new SpeechRecognitionClass();

  recognizer.lang = 'id-ID'; // Bahasa Indonesia
  recognizer.continuous = true;
  recognizer.interimResults = true;
  recognizer.maxAlternatives = 1;

  recognizer.onstart = () => {
    onStatusChange?.(true);
  };

  recognizer.onend = () => {
    onStatusChange?.(false);
  };

  recognizer.onerror = (event: { error: string }) => {
    onStatusChange?.(false);
    onError?.(event.error);
  };

  recognizer.onresult = (event: any) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript;
      }
    }
    if (transcript.trim()) {
      onResult(transcript.trim());
    }
  };

  return recognizer;
}

// Quick phrase templates for SMK students in case microphone is disabled
export const quickIndonesianVoiceTemplates = [
  'Pagi ini saya mengikuti apel dan briefing bersama pembimbing lapangan membahas tugas harian.',
  'Membantu merapikan dokumen arsip kantor dan menginput data rekap ke spreadsheet komputer.',
  'Melakukan pengujian tombol aplikasi di smartphone untuk memastikan ukuran tombol minimal 48 pixel.',
  'Membantu perakitan kabel jaringan LAN dan memeriksa koneksi internet di ruang server kantor.',
  'Membuat materi visual poster promosi mingguan menggunakan template yang sudah disepakati.',
  'Mengikuti evaluasi sore bersama guru pembimbing sekolah dan mentor perusahaan.'
];
