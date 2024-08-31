import { Button } from '../ui/button';
import Question from './Question';
import { FirstSectionAnswers, FirstSectionQuestions } from './QnAData';
import type { Point, State } from './QnAData';
import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import Image from 'next/image';
import { MBTI, upperMBTI } from '~/types/enums/mbti';
import { api } from '~/trpc/react';

interface FirstSectionProps {
  setMostType: Dispatch<SetStateAction<MBTI>>;
  onFinished: Dispatch<SetStateAction<State>>;
}

export default function FirstSection({
  setMostType,
  onFinished,
}: FirstSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, Point>>(
    {},
  );
  const updateDBMutation = api.profile.updateUserMBTI.useMutation();
  const [isMissing, setIsMissing] = useState(false);
  const [confirmable, setConfirmable] = useState(false);
  const qtyQuestions = FirstSectionQuestions.length;
  const inputRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  inputRefs.current = Array(qtyQuestions)
    .fill(null)
    .map(() => React.createRef<HTMLDivElement>());

  if (isMissing && Object.keys(selectedAnswers).length == qtyQuestions) {
    setIsMissing(false);
  }

  const calcScore = async () => {
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
    const parsedType = maxKey.charAt(0).toUpperCase() + maxKey.slice(1);
    await updateDBMutation.mutateAsync({
      mbti: parsedType as upperMBTI,
    });
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
      setConfirmable(true);
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
      {confirmable && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute top-1/2 left-1/2 bg-blue-500 translate-x-[-50%] translate-y-[-50%] w-3/4 py-7 rounded-xl z-20">
            <div className="flex flex-col items-center text-yellow">
              <Image
                src={'/images/mbti/mbti-turtle.png'}
                width={180}
                height={120}
                alt="turtle"
                className="my-4"
              />
              <h2>Kumpul?</h2>
              <p className="w-3/4 text-center text-sm">
                Pastikan jawaban yang kamu unggah sudah benar!
              </p>
              <div className="flex flex-col w-3/4 mt-6">
                <Button
                  className="bg-yellow text-blue-500 mb-2"
                  onClick={async () => {
                    await calcScore();
                    onFinished('loading');
                  }}
                >
                  Kumpul Sekarang
                </Button>
                <Button
                  className="text-yellow border-yellow bg-blue-500 border-2"
                  onClick={() => {
                    setConfirmable(false);
                  }}
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
