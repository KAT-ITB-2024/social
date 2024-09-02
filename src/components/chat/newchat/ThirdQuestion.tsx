import React, { useState } from 'react';
import BoxButton from './BoxButton';
import FindButton from './FindButton';
import type { Dispatch, SetStateAction } from 'react';

type ThirdQuestionProps = {
  findMatch: () => void;
  setJodoh: Dispatch<SetStateAction<boolean>>;
};

const ThirdQuestion = ({ findMatch, setJodoh }: ThirdQuestionProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleJodohClick = (value: boolean) => {
    setJodoh(value);
    setIsDisabled(false);
  };

  return (
    <div className="align-center flex w-full flex-col items-center gap-8 p-8">
      <div className="align-center flex flex-col items-center">
        <p className="font-subheading text-sh3 font-bold text-white">
          LAGI NYARI
        </p>
        <p className="font-heading text-h1 text-white">JODOH?</p>
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-3">
        <BoxButton
          color="pink"
          size="large"
          onClick={() => handleJodohClick(true)}
        >
          Iyah kak :3
        </BoxButton>
        <BoxButton
          color="white"
          size="large"
          onClick={() => handleJodohClick(false)}
        >
          Mau bestie aja
        </BoxButton>
      </div>
      <FindButton onClick={findMatch} disabled={isDisabled}>
        START FINDING!
      </FindButton>
    </div>
  );
};

export default ThirdQuestion;
