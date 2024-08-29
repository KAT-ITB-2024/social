import React, { Dispatch, SetStateAction, useState } from 'react';
import BoxComponent from './Box';
import FirstQuestion from './FirstQuestion';
import SecondQuestion from './SecondQuestion';
import ThirdQuestion from './ThirdQuestion';
import ProgressBar from './ProgressBar';
import BackButton from './BackButton';
import BackButtonIcon from 'public/icons/newchat/backbutton.png';
import BackButtonHoverIcon from 'public/icons/newchat/backbutton-hover.png';
import { ChatTopic } from '~/types/enum/chat';

interface NewChatFormProps {
  findMatch: () => void;
  setAnonymous: Dispatch<SetStateAction<boolean>>;
  setTopic: Dispatch<SetStateAction<ChatTopic>>;
  setJodoh: Dispatch<SetStateAction<boolean>>;
}

const NewChatForm = ({
  findMatch,
  setAnonymous,
  setTopic,
  setJodoh,
}: NewChatFormProps) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <BoxComponent>
      <div className="absolute left-5 top-7">
        {page > 1 && (
          <BackButton
            defaultSrc={BackButtonIcon}
            hoverSrc={BackButtonHoverIcon}
            onClick={() => handlePageChange(page - 1)}
          />
        )}
      </div>
      <div className="relative top-10 flex flex-col items-center justify-center gap-2">
        <ProgressBar page={page} />
        {page === 1 && (
          <FirstQuestion
            handlePageChange={handlePageChange}
            setAnonymous={setAnonymous}
          />
        )}
        {page === 2 && (
          <SecondQuestion
            handlePageChange={handlePageChange}
            setTopic={setTopic}
          />
        )}
        {page === 3 && (
          <ThirdQuestion findMatch={findMatch} setJodoh={setJodoh} />
        )}
      </div>
    </BoxComponent>
  );
};

export default NewChatForm;
