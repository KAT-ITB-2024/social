const HistoryBar = ({ date }: { date: Date }) => {
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div className="max-w-md bg-blue-600 rounded-t-[46px] flex justify-center items-center w-full h-20 gap-20 shadow-green-xl p-6">
      <div className="flex flex-row justify-start bg-white rounded-[20px] pl-[21px] py-[15px] items-start w-full">
        <p className="text-sm font-normal text-pink-300">
          Percakapan ini berakhir pada {formatDate(date)}
        </p>
      </div>
    </div>
  );
};

export default HistoryBar;
