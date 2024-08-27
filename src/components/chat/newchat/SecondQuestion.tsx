import React, { useState } from 'react';
import BoxButton from './BoxButton';
import { ScrollArea } from '~/components/ui/scroll-area';
import type { Dispatch, SetStateAction } from 'react';

type SecondQuestionProps = {
  handlePageChange: (page: number) => void;
  setTopic: Dispatch<SetStateAction<string>>;
};

const SecondQuestion = ({
  handlePageChange,
  setTopic,
}: SecondQuestionProps) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const topics = ['General', 'ITB', 'Film', 'Game', 'Makanan', 'Olahraga'];
  const handleButtonClick = (value: string) => {
    setSelectedButton(value);
  };

  return (
    <div className="flex flex-col items-center align-center gap-8 w-full p-6">
      <p className="text-white font-subheading text-sh3 font-bold">
        PILIH TOPIK KUY!
      </p>
      <ScrollArea className="h-52 w-full rounded-md">
        <div className="flex flex-col items-center justify-evenly gap-3 h-52 w-full">
          {topics.map((value) => (
            <BoxButton
              key={value}
              color={selectedButton === value ? 'lightblue' : 'blue'}
              size="custom"
              onClick={() => {
                handleButtonClick(value);
                setTopic(value);
              }}
            >
              {value}
            </BoxButton>
          ))}
        </div>
      </ScrollArea>
      <BoxButton
        color="pink"
        size="default"
        onClick={() => handlePageChange(3)}
        disabled={!selectedButton}
      >
        Lanjut
      </BoxButton>
    </div>
  );
};

export default SecondQuestion;
