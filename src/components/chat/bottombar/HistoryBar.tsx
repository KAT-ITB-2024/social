const HistoryBar = ({ date }: { date: Date }) => {
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div className="flex h-20 w-full max-w-md items-center justify-center gap-20 rounded-t-[46px] bg-blue-600 p-6 shadow-green-xl">
      <div className="flex w-full flex-row items-start justify-start rounded-[20px] bg-white py-3 pl-[21px]">
        <p className="text-sm font-normal text-pink-300">
          Percakapan ini berakhir pada {formatDate(date)}
        </p>
      </div>
    </div>
  );
};

export default HistoryBar;
