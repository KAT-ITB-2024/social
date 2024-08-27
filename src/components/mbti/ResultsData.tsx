interface ResultData {
  type: string;
  personality: React.ReactNode;
}

export const ResultsData: ResultData[] = [
  {
    type: 'mova',
    personality: (
      <p className=" text-white w-5/6 mt-1">
        Kamu dikenal sebagai sosok yang memiliki{' '}
        <span className="font-bold">semangat yang besar </span>untuk mempelajari
        hal baru dan <span className="font-bold">mudah beradaptasi</span> dengan
        lingkungan baru. Kamu mampu mengaplikasikan pengetahuanmu itu untuk{' '}
        <span className="font-bold">menyelesaikan masalah</span> di sekitarmu
        dan dikenal sebagai{' '}
        <span className="font-bold">sosok yang berbeda </span>
        dibandingkan dengan orang-orang di sekitarmu. Meskipun berbeda, kamu
        memiliki <span className="font-bold">keberanian yang besar</span> dalam
        menghadapi permasalahan dan tidak takut dengan kegagalan.
      </p>
    ),
  },
  {
    type: 'kovva',
    personality: (
      <p className=" text-white w-5/6 mt-1">
        Kamu dikenal sebagai sosok yang mengandalkan{' '}
        <span className="font-bold">logika dan rasionalitas </span>dalam
        mempelajari hal baru serta memiliki aturan dan sistem dalam setiap hal
        yang kamu lakukan. Kamu suka dengan{' '}
        <span className="font-bold">pengembangan teknologi </span>yang ada dan
        selalu berusaha untuk{' '}
        <span className="font-bold">menguasai pengetahuan terbaru</span>.
        Meskipun dikenal sebagai sosok yang kaku dalam bekerja, kamu dapat
        menyelesaikan semua pekerjaanmu karena{' '}
        <span className="font-bold">memiliki sistem bekerja yang teratur</span>
      </p>
    ),
  },
  {
    type: 'odra',
    personality: (
      <p className=" text-white w-5/6 mt-1">
        Ketidakpastian menjadi ciri khasmu, karena pergerakanmu yang{' '}
        <span className="font-bold">tidak teratur </span>dan{' '}
        <span className="font-bold">sulit diprediksi</span> membuatmu menjadi
        ancaman yang tidak bisa diremehkan. Keberadaanmu adalah simbol dari
        kekuatan destruktif yang sulit dilawan, dan kamu tidak pernah takut
        untuk <span className="font-bold">menunjukkan dominasimu</span>.
        Meskipun menyeramkan dan cenderung ditakuti oleh orang-orang, kamu
        memiliki <span className="font-bold">pesona yang memikat </span>dalam
        kehadiranmu yang <span className="font-bold">penuh misteri</span>. Ada
        daya tarik yang tak bisa dijelaskan yang membuat orang-orang tertarik
        untuk mendekat, meskipun mereka sadar akan bahaya yang kamu bawa
      </p>
    ),
  },
  {
    type: 'sylas',
    personality: (
      <p className=" text-white w-5/6 mt-1">
        Kamu dikenal sebagai sosok yang{' '}
        <span className="font-bold"> kedamaian </span>dan
        <span className="font-bold"> ketenangan </span>dalam segala situasi.
        Kamu selalu berusaha untuk mempertahankan kedua hal tersebut di mana pun
        kamu berada dan cenderung
        <span className="font-bold"> menghindari keributan</span>. Menjamin
        pertumbuhan dan kedamaian diri merupakan kesukaanmu, sehingga
        orang-orang cenderung datang kepadamu untuk mencari teman bercerita
        karena kamu memiliki
        <span className="font-bold"> kondisi spiritual yang sangat baik</span>
      </p>
    ),
  },
  {
    type: 'ozirron',
    personality: (
      <p className=" text-white w-5/6 mt-1">
        Kamu dikenal sebagai sosok yang
        <span className="font-bold"> bijak </span>karena memiliki
        <span className="font-bold"> wawasan yang luas </span>dan dapat melihat
        situasi dari <span className="font-bold">berbagai sudut pandang</span>.{' '}
        <span className="font-bold">Pengetahuan yang mendalam </span>dan
        <span className="font-bold"> pengalaman yang banyak</span> ini kamu
        peroleh dari perjalanan hidupmu yang sudah cukup panjang. Kamu pun tidak
        enggan dalam membagikan pengalaman dan pengetahuanmu tersebut untuk
        <span className="font-bold"> membantu orang</span> di sekitarmu
      </p>
    ),
  },
];
