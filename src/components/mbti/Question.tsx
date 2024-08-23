import { Button } from '../ui/button';
import { RadioGroupItem, RadioGroup } from '../ui/radio-group';
import { Label } from '@radix-ui/react-label';
interface QuestionProps {
  question: string;
  answers: Answers[];
}
interface Answers {
  answer: string;
  point: {
    mova?: number;
    kovva?: number;
    odra?: number;
    sylas?: number;
    ozirron?: number;
  };
}

export default function Question({ question, answers }: QuestionProps) {
  return (
    <div className="flex flex-col text-blue-600 gap-3">
      <p className="text-blue-600 text-sh5 font-bold text-center">{question}</p>
      <div
        className="py-6 px-6 border-2 rounded-[12px] border-turquoise-300"
        style={{
          background:
            'radial-gradient(100% 100% at 0% 0%, rgba(197, 255, 243, 0.7) 0%, rgba(153, 224, 255, 0.7) 100%)',
        }}
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
                    className="bg-none w-6 h-6 rounded-full focus:shadow-[0_0_0_2px] focus:shadow-black cursor-pointer"
                    value={answer.answer}
                    id={answer.answer}
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
