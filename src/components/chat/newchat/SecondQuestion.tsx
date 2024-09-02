import React, { useState } from 'react';
import BoxButton from './BoxButton';
import { ScrollArea } from '~/components/ui/scroll-area';
import type { Dispatch, SetStateAction } from 'react';
import { ChatTopic } from '~/types/enum/chat';

type SecondQuestionProps = {
  handlePageChange: (page: number) => void;
  setTopic: Dispatch<SetStateAction<ChatTopic>>;
};

const topicLabels: Record<ChatTopic, string> = {
  [ChatTopic.GENERAL]: 'General',
  [ChatTopic.ITB]: 'ITB',
  [ChatTopic.FILM]: 'Film',
  [ChatTopic.GAME]: 'Game',
  [ChatTopic.OLAHRAGA]: 'Olahraga',
  [ChatTopic.MAKANAN]: 'Makanan',
};

const SecondQuestion = ({
  handlePageChange,
  setTopic,
}: SecondQuestionProps) => {
  const [selectedButton, setSelectedButton] = useState<ChatTopic | null>(null);

  const handleButtonClick = (value: ChatTopic) => {
    setSelectedButton(value);
    setTopic(value);
  };

  return (
    <div className="align-center flex w-full flex-col items-center gap-8 p-6">
      <p className="font-subheading text-sh3 font-bold text-white">
        PILIH TOPIK KUY!
      </p>
      <ScrollArea className="h-52 w-full rounded-md">
        <div className="flex h-52 w-full flex-col items-center justify-evenly gap-3">
          {Object.entries(topicLabels).map(([key, label]) => {
            const chatTopic = Number(key) as ChatTopic;
            return (
              <BoxButton
                key={key}
                color={selectedButton === chatTopic ? 'lightblue' : 'blue'}
                size="custom"
                onClick={() => handleButtonClick(chatTopic)}
              >
                {label}
              </BoxButton>
            );
          })}
        </div>
      </ScrollArea>
      <BoxButton
        color="pink"
        size="default"
        onClick={() => handlePageChange(3)}
        disabled={selectedButton === null}
      >
        Lanjut
      </BoxButton>
    </div>
  );
};

export default SecondQuestion;
