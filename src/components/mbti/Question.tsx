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
    <div className="flex flex-col text-blue-600 gap-3 mb-7">
      <p className="text-sh5 font-bold text-center text-shadow-green-md">
        {question}
      </p>
      <div
        className="py-6 px-6 border-2 rounded-3xl border-turquoise-300 bg-turquoise-100 shadow-blue-xl bg-opacity-70 focus-within:bg-opacity-100"
        style={{}}
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
                    className=" flex-none rounded-full focus:shadow-[0_0_0_1px] focus:shadow-black cursor-pointer"
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
