export const MenuButton = ({
  label,
  variant,
}: {
  label: string;
  variant: 'Chat' | 'Leaderboard' | 'OSKM MBTI' | 'Class Selection';
}) => {
  let cn = '';
  let imgSrc = '';

  switch (variant) {
    case 'Chat':
      cn =
        'border-solid border-2 border-[#C5FFF3] shadow-md shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-3';
      imgSrc = '/components/icon-chat.png';
      break;
    case 'Leaderboard':
      cn =
        'border-solid border-2 border-[#C5FFF3] shadow-md shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5';
      imgSrc = '/components/icon-leaderboard.png';
      break;
    case 'OSKM MBTI':
      cn =
        'border-solid border-2 border-[#C5FFF3] shadow-md shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5';
      imgSrc = '/components/icon-mbti.png';
      break;
    case 'Class Selection':
      cn =
        'border-solid border-2 border-[#C5FFF3] shadow-md shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5 mr-3';
      imgSrc = '/components/icon-class.png';
      break;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className={cn}>
          <img src={imgSrc} className="w-20 h-auto" alt={label} />
        </div>
        <div className="text-sm text-turquoise-100 mt-3 text-center -mr-4">
          {label}
        </div>
      </div>
    </>
  );
};

export default MenuButton;
