export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  isCorrect: boolean;
  word?: string;
  feedback?: string;
  gestureImage?: string;
  confidence?: number;
  details?: {
    handShape?: string;
    movement?: string;
    position?: string;
    expression?: string;
  };
}

export const historyItems: HistoryItem[] = [
  {
    id: "1",
    title: "Perkenalkan",
    date: "Kemarin",
    isCorrect: true,
    word: "Perkenalkan",
    feedback: "Gerakan tangan dan ekspresi wajah sangat tepat. Posisi tangan di depan dada dengan gerakan membuka telapak tangan ke kanan dan kiri secara bergantian menunjukkan makna 'perkenalkan' dengan jelas.",
    gestureImage: "/succes-gesture.svg",
    confidence: 95,
    details: {
      handShape: "Telapak tangan terbuka, jari-jari rapat",
      movement: "Gerakan membuka tangan ke kanan dan kiri bergantian",
      position: "Di depan dada, setinggi bahu",
      expression: "Ekspresi wajah ramah, tersenyum"
    }
  },
  {
    id: "2",
    title: "Nama",
    date: "9 Okt",
    isCorrect: true,
    word: "Nama",
    feedback: "Gerakan menunjuk ke dada dengan telapak tangan datar sangat akurat. Ini adalah tanda standar untuk 'nama' dalam BISINDO.",
    gestureImage: "/succes-gesture.svg",
    confidence: 92,
    details: {
      handShape: "Telapak tangan datar, jari-jari rapat",
      movement: "Menunjuk ke dada dengan ujung jari telunjuk",
      position: "Di tengah dada",
      expression: "Ekspresi wajah netral, fokus"
    }
  },
  {
    id: "3",
    title: "Saya",
    date: "9 Okt",
    isCorrect: true,
    word: "Saya",
    feedback: "Gerakan menepuk dada dengan ujung jari-jari telapak tangan sudah benar. Tanda ini mewakili 'saya/aku' dengan jelas.",
    gestureImage: "/succes-gesture.svg",
    confidence: 88,
    details: {
      handShape: "Telapak tangan dengan ujung jari-jari menyentuh",
      movement: "Menepuk dada lembut 2x",
      position: "Di sisi kiri dada",
      expression: "Ekspresi wajah tenang"
    }
  },
  {
    id: "4",
    title: "Terima kasih",
    date: "8 Okt",
    isCorrect: false,
    word: "Terima kasih",
    feedback: "Gerakan tangan terlalu cepat dan posisi tidak tepat. Untuk 'terima kasih', tangan harus mulai dari dagu lalu keluar ke depan dengan telapak tangan menghadap ke atas.",
    gestureImage: "/failed-gesture.svg",
    confidence: 45,
    details: {
      handShape: "Telapak tangan tidak sepenuhnya datar",
      movement: "Gerakan terlalu cepat dari dagu ke depan",
      position: "Mulai dari posisi terlalu tinggi",
      expression: "Ekspresi wajah kurang natural"
    }
  },
  {
    id: "5",
    title: "Selamat pagi",
    date: "8 Okt",
    isCorrect: false,
    word: "Selamat pagi",
    feedback: "Posisi tangan salah. Untuk 'selamat pagi', tangan kanan harus menyentuh dahi lalu turun ke depan, bukan dari sisi kepala.",
    gestureImage: "/failed-gesture.svg",
    confidence: 38,
    details: {
      handShape: "Jari-jari tidak rapat saat menyentuh dahi",
      movement: "Gerakan dari sisi kepala ke depan (seharusnya dari dahi)",
      position: "Mulai dari telinga bukan dahi",
      expression: "Ekspresi wajah datar"
    }
  },
  {
    id: "6",
    title: "Maaf",
    date: "7 Okt",
    isCorrect: false,
    word: "Maaf",
    feedback: "Gerakan menggosok telapak tangan tidak sinkron. Kedua tangan harus menggosok secara bergantian dengan ritme yang teratur.",
    gestureImage: "/failed-gesture.svg",
    confidence: 42,
    details: {
      handShape: "Telapak tangan terlalu kaku",
      movement: "Menggosok tidak bergantian, ritme tidak teratur",
      position: "Tangan terlalu jauh dari dada",
      expression: "Ekspresi wajah tidak menyesal"
    }
  },
  {
    id: "7",
    title: "Sampai jumpa",
    date: "7 Okt",
    isCorrect: false,
    word: "Sampai jumpa",
    feedback: "Gerakan melambaikan tangan terlalu tinggi dan cepat. Harus di depan bahu dengan gerakan pelan ke kiri-kanan.",
    gestureImage: "/failed-gesture.svg",
    confidence: 35,
    details: {
      handShape: "Jari-jari terlalu terbuka lebar",
      movement: "Melambaikan terlalu tinggi dan cepat",
      position: "Di atas kepala (seharusnya depan bahu)",
      expression: "Ekspresi wajah tidak ramah"
    }
  },
];

export const getHistoryItems = (searchQuery?: string): HistoryItem[] => {
  if (!searchQuery) return historyItems;
  return historyItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );
};
