'use client';

import Image from 'next/image';
import PdfIcon from 'public/icons/pdf.svg';
import Trash from 'public/icons/trash.svg';
import { Button } from './ui/button';

export const FileChip = ({
  type,
  name,
  ext,
  action,
}: {
  type: string;
  name: string;
  ext: string;
  action?: () => void;
}) => {
  return (
    <div className="flex items-center justify-between w-fit h-fit py-[9px] px-[10px] gap-2.5 bg-shade-200 rounded-[10px]">
      {type === 'file' && (
        <>
          <div className="flex items-center min-h-[37px] min-w-[186px] px-[7px] py-[6px] gap-2 bg-pink-200/30 rounded-[10px]">
            {ext === 'pdf' && <Image src={PdfIcon} alt="pdf" />}
            <p className="font-subheading text-b4 text-neutral-700">{name}</p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            {action && (
              <Button
                size={'icon'}
                className=" flex items-center justify-center rounded-[50%] bg-transparent hover:opacity-80 hover:bg-transparent"
                onClick={action}
              >
                <Image src={Trash} alt="trash" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
