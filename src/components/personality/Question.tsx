import { type RefObject, type MouseEventHandler, useState } from 'react';
import { RadioGroupItem, RadioGroup } from '../ui/radio-group';
import { Label } from '@radix-ui/react-label';
import type { Answer, Point } from './QnAData';
interface QuestionProps {
  question: string;
  answers: Answer[];
  questionId: number;
  onAnswerClick: (questionId: number, answer: Point) => void;
  missing: boolean;
  inputRef: RefObject<HTMLDivElement>;
}

export default function Question({
  question,
  answers,
  questionId,
  onAnswerClick,
  missing,
  inputRef,
}: QuestionProps) {
  const [answered, setAnswered] = useState(false);
  const handleAnswerChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!answered) {
      setAnswered(true);
    }
    const value = (event.target as HTMLInputElement).value;
    const answer = answers.find((ans) => ans.answer === value);
    if (answer) {
      onAnswerClick(questionId, answer.point);
    }
  };

  return (
    <div className="flex flex-col text-blue-600 gap-3 mb-7">
      <p className="text-sh5 font-bold text-center text-shadow-green-md">
        {question}
      </p>
      <div
        className={`py-6 px-6 border-4 rounded-3xl bg-turquoise-100 shadow-blue-xl 
        bg-opacity-70 focus-within:bg-opacity-100 ${missing && !answered ? 'border-pink-400' : 'border-turquoise-300'}`}
        ref={inputRef}
        tabIndex={-1}
      >
        <RadioGroup className="flex flex-col gap-[30px]">
          {answers.map((answer, idx) => {
            return (
              <div
                key={idx}
                className="text-blue-600 flex flex-col justify-center"
              >
                <div className="flex items-center space-x-5">
                  <RadioGroupItem
                    className={`flex-none rounded-full focus:shadow-[0_0_0_2px] focus:shadow-black 
                    cursor-pointer radio-circle w-5 h-5 ${missing && !answered ? 'border-pink-400 border-4' : 'border-2'}`}
                    value={answer.answer}
                    id={answer.answer}
                    onClick={handleAnswerChange}
                  />
                  <Label
                    htmlFor={answer.answer}
                    className="text-b4 font-body text-shade-100"
                  >
                    {answer.answer}
                  </Label>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
