// widthnya nanti di w-96;

const Card = () => {
  return (
    <div className="border-solid border-2 border-[#F06B02] rounded-2xl w-96 shadow-lg shadow-orange-200/90 bg-gradient-to-r from-[#FD9417] to-[#FFFFFF]">
      <div className="flex items-center justify-end">
        <div className="flex flex-col">
          <h1 className="text-xl text-white-100 text-wrap pl-6 mb-2">
            Corporate Social <br />
            Responsibility (CSR)
          </h1>
          <p className="text-xs text-balance pl-6">
            Membangun Tanggung Jawab Sosial di Kalangan Mahasiswa
          </p>
        </div>
        <img
          src="/components/coralpensu.png"
          className="w-40 h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Card;
