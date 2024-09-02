interface ResultData {
  type: string;
  personality: React.ReactNode;
  desc_string: string;
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
    desc_string:
      'Mova dikenal sebagai sosok yang memiliki semangat yang besar untuk mempelajari hal baru dan mudah beradaptasi dengan lingkungan baru. Mova mampu mengaplikasikan pengetahuanmu itu untuk menyelesaikan masalah di sekitar dan dikenal sebagai sosok yang berbeda dibandingkan dengan orang-orang di sekitarnya. Meskipun berbeda, Mova memiliki keberanian yang besar dalam menghadapi permasalahan dan tidak takut dengan kegagalan.',
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
    desc_string:
      'Kovva dikenal sebagai sosok yang mengandalkan logika dan rasionalitas dalam mempelajari hal baru serta memiliki aturan dan sistem dalam setiap hal yang ia lakukan. Kovva suka dengan pengembangan teknologi yang ada dan selalu berusaha untuk menguasai pengetahuan terbaru. Meskipun dikenal sebagai sosok yang kaku dalam bekerja, Kovva dapat menyelesaikan semua pekerjaannya karena memiliki sistem bekerja yang teratur.',
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
    desc_string:
      'Ketidakpastian menjadi ciri khas Odra, karena pergerakanmu yang tidak teratur dan sulit diprediksi membuatnya menjadi ancaman yang tidak bisa diremehkan. Keberadaan Odra adalah simbol dari kekuatan destruktif yang sulit dilawan, dan Odra tidak pernah takut untuk menunjukkan dominasinya. Meskipun menyeramkan dan cenderung ditakuti oleh orang-orang, Odra memiliki pesona yang memikat dalam kehadiranmu yang penuh misteri. Ada daya tarik yang tak bisa dijelaskan yang membuat orang-orang tertarik untuk mendekat, meskipun mereka sadar akan bahaya yang Odra bawa.',
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
    desc_string:
      'Sylas dikenal sebagai sosok yang mencintai kedamaian dan ketenangan dalam segala situasi. Sylas selalu berusaha untuk mempertahankan kedua hal tersebut di mana pun Sylas berada dan cenderung menghindari keributan. Menjamin pertumbuhan dan kedamaian diri merupakan kesukaannya, sehingga orang-orang cenderung datang kepada Sylas untuk mencari teman bercerita karena dia memiliki kondisi spiritual yang sangat baik.',
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
    desc_string:
      'Ozirron dikenal sebagai sosok yang bijak karena memiliki wawasan yang luas dan dapat melihat situasi dari berbagai sudut pandang. Pengetahuan yang mendalam dan pengalaman yang banyak ini Ozirron peroleh dari perjalanan hidup yang sudah cukup panjang. Ozirron pun tidak enggan dalam membagikan pengalaman dan pengetahuanmu tersebut untuk membantu orang di sekitarnya.',
  },
];
