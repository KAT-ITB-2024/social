import React from 'react';

type ProgressBarProps = {
  page: number;
};

const ProgressBar = ({ page }: ProgressBarProps) => {
  return (
    <div className="flex flex-row gap-2">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1.5 w-7 rounded-full ${
            page === step ? 'bg-turquoise-200' : 'bg-neutral-50'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
