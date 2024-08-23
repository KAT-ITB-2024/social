import Question from './Question';
interface Answers {
  answer: string;
  point: {
    mova?: number;
    kovva?: number;
    odra?: number;
    sylas?: number;
    ozirron?: number;
  };
}
const questions: string[] = [
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
const answers: Answers[][] = [
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
];
export default function FirstSection() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-blue-600 mt-24 mx-8">
        <h2 className="text-h1 font-heading text-shadow-blue-md">
          First Section
        </h2>
        <p className="text-center text-shadow-green-lg text-b4 leading-[18px] font-body">
          Select one of the multiple choice below the question. Make sure to
          have completely answer all of the questions before submitting your
          answers. Good luck!
        </p>
        <div className="mt-5 w-full">
          {questions.map((item, idx) => {
            return (
              <Question
                key={idx}
                question={questions[idx] ?? ''}
                answers={answers[idx] ?? []}
              />
            );
          })}
          <Question
            question="Apa tipe kepribadianmu?"
            answers={[
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
            ]}
          />
        </div>
      </div>
    </div>
  );
}
