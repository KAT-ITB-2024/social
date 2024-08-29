import React from 'react';
import Image from 'next/image';
import Kepiting from 'public/images/chat/newchat/kepiting.png';
import BoxButton from './BoxButton';
import type { Dispatch, SetStateAction } from 'react';

type FirstQuestionProps = {
  handlePageChange: (page: number) => void;
  setAnonymous: Dispatch<SetStateAction<boolean>>;
};

const FirstQuestion = ({
  handlePageChange,
  setAnonymous,
}: FirstQuestionProps) => {
  return (
    <div className="flex flex-col items-center align-center gap-16 p-8">
      <div className="flex flex-col items-center align-center">
        <Image src={Kepiting} alt="kepiting" width={264} height={190} />
        <p className="text-sh2 font-subheading font-bold text-white">
          MAU ANONIM?
        </p>
      </div>
      <div className="flex flex-row items-conter justify-evenly gap-3">
        <BoxButton
          color="pink"
          size="default"
          onClick={() => {
            setAnonymous(true);
            handlePageChange(2);
          }}
        >
          Boleh
        </BoxButton>
        <BoxButton
          color="white"
          size="default"
          onClick={() => {
            setAnonymous(false);
            handlePageChange(2);
          }}
        >
          Ril Aja
        </BoxButton>
      </div>
    </div>
  );
};

export default FirstQuestion;
