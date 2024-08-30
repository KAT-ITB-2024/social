interface Point {
  mova?: number;
  kovva?: number;
  odra?: number;
  sylas?: number;
  ozirron?: number;
}

interface Answer {
  answer: string;
  point: Point;
}

type State = 'not started' | 'started' | 'loading' | 'finished';

const FirstSectionQuestions: string[] = [
  'Apa tipe kepribadianmu?',
  'Apa rasa makanan favoritmu?',
  'Apa genre musik favoritmu?',
  'Kamu termasuk tim apa?',
  'Apa pelajaran peminatan SMA kesukaanmu?',
  'Kamu memiliki banyak tugas dengan tenggat 2 hari lagi, sedangkan kamu sedang merasa sangat lelah secara fisik dan mental. Apa yang akan kamu lakukan?',
  'Kamu berhasil diterima di kampus impianmu, ITB. Namun, kamu tidak mendapatkan fakultas yang menjadi pilihan pertamamu. Apa pandanganmu terkait hal ini?',
  'Saat ini fakultasmu sedang membutuhkan seorang ketua angkatan. Apakah kamu akan mengajukan diri menjadi seorang ketua angkatan?',
  'Di antara pilihan bidang/divisi berikut dalam satu kepengurusan angkatan, manakah yang akan menjadi pilihan bidang/divisimu?',
  'Apakah kamu semangat untuk OSKM ITB 2024?',
];

const FirstSectionAnswers: Answer[][] = [
  [
    {
      answer: 'Extrovert',
      point: {
        mova: 5,
        odra: 5,
      },
    },
    {
      answer: 'Ambivert',
      point: {
        ozirron: 5,
      },
    },
    {
      answer: 'Introvert',
      point: {
        sylas: 5,
        kovva: 5,
      },
    },
  ],
  [
    {
      answer: 'Pedas',
      point: {
        kovva: 5,
      },
    },
    {
      answer: 'Manis',
      point: {
        mova: 5,
        sylas: 5,
      },
    },
    {
      answer: 'Asin',
      point: {
        sylas: 5,
        ozirron: 5,
      },
    },
    {
      answer: 'Asam',
      point: {
        ozirron: 5,
      },
    },
    {
      answer: 'Pahit',
      point: {
        odra: 5,
      },
    },
  ],
  [
    {
      answer: 'Alternative',
      point: {
        kovva: 5,
      },
    },
    {
      answer: 'Pop',
      point: {
        mova: 5,
      },
    },
    {
      answer: 'Rock',
      point: {
        odra: 5,
      },
    },
    {
      answer: 'Indie',
      point: {
        sylas: 5,
      },
    },
    {
      answer: 'Classical',
      point: {
        ozirron: 5,
      },
    },
  ],
  [
    {
      answer: 'Bubur diaduk',
      point: {
        sylas: 5,
        mova: 5,
      },
    },
    {
      answer: 'Bubut tidak diaduk',
      point: {
        ozirron: 5,
        kovva: 5,
      },
    },
    {
      answer: 'Bubur disedot',
      point: {
        odra: 5,
      },
    },
  ],

  [
    {
      answer: 'Matematika',
      point: {
        kovva: 5,
      },
    },
    {
      answer: 'Fisika',
      point: {
        kovva: 5,
      },
    },
    {
      answer: 'Kimia',
      point: {
        ozirron: 5,
      },
    },
    {
      answer: 'Biologi',
      point: {
        sylas: 5,
      },
    },
    {
      answer: 'Sosiologi',
      point: {
        sylas: 5,
      },
    },
    {
      answer: 'Ekonomi',
      point: {
        mova: 5,
      },
    },
    {
      answer: 'Geografi',
      point: {
        odra: 5,
      },
    },
    {
      answer: 'Sejarah',
      point: {
        ozirron: 5,
      },
    },
  ],
  [
    {
      answer:
        'Tetap mengerjakan tugas agar dapat mengejar waktu tidur yang teratur',
      point: {
        kovva: 5,
        mova: 5,
      },
    },
    {
      answer:
        'Istirahat sejenak agar bisa bangun dengan kondisi yang lebih segar dan mengerjakan tugas dengan lebih baik',
      point: {
        sylas: 5,
        ozirron: 5,
      },
    },
    {
      answer: 'Tidak mengerjakan tugasnya',
      point: {
        odra: 5,
      },
    },
  ],
  [
    {
      answer:
        'Aku tidak masalah, aku tetap akan bisa berkembang di fakultas ini',
      point: {
        mova: 5,
        sylas: 5,
        odra: 5,
      },
    },
    {
      answer:
        'Aku merasa tidak puas, tetapi tidak apa-apa karena aku masih berhasil masuk ke ITB',
      point: {
        ozirron: 5,
      },
    },
    {
      answer:
        'Aku merasa tidak puas dan kemungkinan akan mengundurkan diri setelah TPB berakhir',
      point: {
        kovva: 5,
      },
    },
  ],
  [
    {
      answer: 'Ya, tentunya',
      point: {
        mova: 5,
        odra: 5,
      },
    },
    {
      answer: 'Tidak, aku akan membiarkan orang lain saja',
      point: {
        kovva: 5,
        ozirron: 5,
        sylas: 5,
      },
    },
  ],
  [
    {
      answer: 'Kesekretariatan/kebendaharaan',
      point: {
        odra: 5,
      },
    },
    {
      answer: 'Akademik dan keilmuan',
      point: {
        kovva: 5,
        ozirron: 5,
      },
    },
    {
      answer: 'Kesejahteraan anggota',
      point: {
        sylas: 5,
      },
    },
    {
      answer: 'Kreatif dan pensuasanaan',
      point: {
        sylas: 5,
      },
    },
    {
      answer: 'Manajemen sumber daya manusia',
      point: {
        kovva: 5,
      },
    },
    {
      answer: 'Relasi/hubungan masyarakat',
      point: {
        mova: 5,
      },
    },
    {
      answer: 'Acara',
      point: {
        ozirron: 5,
      },
    },
  ],
  [
    {
      answer: 'Ya',
      point: {
        kovva: 5,
        mova: 5,
        sylas: 5,
        ozirron: 5,
      },
    },
    {
      answer: 'Tidak',
      point: {
        odra: 5,
      },
    },
  ],
];

export { FirstSectionQuestions, FirstSectionAnswers };
export type { Answer, Point, State };
