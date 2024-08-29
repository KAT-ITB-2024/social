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
    <div className="flex flex-col items-center align-center gap-8 w-full p-8">
      <div className="flex flex-col items-center align-center">
        <p className="text-white font-subheading text-sh3 font-bold">
          LAGI NYARI
        </p>
        <p className="text-white font-heading text-h1 ">JODOH?</p>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-3 w-full">
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
