import { Button } from '../ui/button';
import Question from './Question';
import { FirstSectionAnswers, FirstSectionQuestions } from './QnAData';
import type { Point, State } from './QnAData';
import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

interface FirstSectionProps {
  setMostType: Dispatch<SetStateAction<string>>;
  onFinished: Dispatch<SetStateAction<State>>;
}

export default function FirstSection({
  setMostType,
  onFinished,
}: FirstSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, Point>>(
    {},
  );
  const [isMissing, setIsMissing] = useState(false);

  const qtyQuestions = FirstSectionQuestions.length;
  const inputRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  inputRefs.current = Array(qtyQuestions)
    .fill(null)
    .map(() => React.createRef<HTMLDivElement>());

  if (isMissing && Object.keys(selectedAnswers).length == qtyQuestions) {
    setIsMissing(false);
  }

  const calcScore = () => {
    const score = {
      mova: 0,
      kovva: 0,
      odra: 0,
      sylas: 0,
      ozirron: 0,
    };

    for (const questionId in selectedAnswers) {
      if (selectedAnswers.hasOwnProperty(questionId)) {
        const point = selectedAnswers[questionId];
        if (point) {
          for (const key in score) {
            const typedKey = key as keyof Point;
            score[typedKey] += point[typedKey] ?? 0;
          }
        }
      }
    }

    let maxKey: keyof Point = 'mova';
    let maxVal = score[maxKey];
    for (const key in score) {
      const typedKey = key as keyof Point;
      if (score[typedKey] > maxVal) {
        maxVal = score[typedKey];
        maxKey = typedKey;
      }
    }
    setMostType(maxKey);
  };

  const handleSubmit = () => {
    const missingAnswers: number[] = [];

    for (let i = 0; i < qtyQuestions; i++) {
      if (!selectedAnswers.hasOwnProperty(i)) {
        missingAnswers.push(i);
      }
    }

    let firstIdx = -1;
    for (let idx = 0; idx < inputRefs.current.length; idx++) {
      const ref = inputRefs.current[idx];
      if (ref && missingAnswers.includes(idx)) {
        firstIdx = idx;
        break;
      }
    }

    if (missingAnswers.length === 0) {
      calcScore();
      onFinished('finished');
    } else {
      const firstMissingRef = inputRefs.current[firstIdx]?.current;
      if (firstMissingRef) {
        firstMissingRef.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
      setIsMissing(true);
    }
  };

  const handleClick = (questionId: number, point: Point) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: point,
    }));
  };

  return (
    <div className="flex flex-col items-center overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center text-blue-600 mt-24 w-5/6">
        <h2 className="text-h1 font-heading text-shadow-blue-md">
          First Section
        </h2>
        <p className="text-center text-shadow-green-lg text-b4 leading-[18px] font-body">
          Select one of the multiple choice below the question. Make sure to
          have completely answer all of the questions before submitting your
          answers. Good luck!
        </p>
        <div className="mt-5 w-full">
          {FirstSectionQuestions.map((item, idx) => {
            return (
              <Question
                key={idx}
                questionId={idx}
                question={item ?? ''}
                answers={FirstSectionAnswers[idx] ?? []}
                onAnswerClick={handleClick}
                missing={isMissing}
                inputRef={inputRefs.current[idx]!}
              />
            );
          })}
        </div>
        <Button
          className="w-1/3 mb-16 mt-5 bg-pink-400 py-5 font-body text-shadow-pink-sm text-[#FEFEFE] shadow-pink-sm"
          onClick={handleSubmit}
        >
          <p className="text-b3">Submit</p>
        </Button>
      </div>
      {isMissing && (
        <div className="rounded-xl text-white text-lg absolute top-24 bg-pink-400 w-5/6 py-5 text-center">
          You haven&rsquo;t answered all of the questions!
        </div>
      )}
    </div>
  );
}
