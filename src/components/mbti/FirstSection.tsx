import { Button } from '../ui/button';
import Question from './Question';
import { FirstSectionAnswers, FirstSectionQuestions } from './QnA';

export default function FirstSection() {
  return (
    <div className="flex flex-col items-center overflow-auto">
      <div className="flex flex-col items-center text-blue-600 mt-24 mx-8">
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
                question={item ?? ''}
                answers={FirstSectionAnswers[idx] ?? []}
              />
            );
          })}
        </div>
        <Button className="w-1/3 mb-16 bg-pink-400 py-5 font-body text-shadow-pink-sm text-[#FEFEFE] shadow-pink-sm">
          <p className="text-b3">Submit</p>
        </Button>
      </div>
    </div>
  );
}
