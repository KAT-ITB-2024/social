import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { Chip } from '~/components/Chip';
import { FileChip } from '~/components/FileChip';

import BR from 'public/images/assignment/details/bottom-right.png';
import LT from 'public/images/assignment/details/left-top.png';
import M from 'public/images/assignment/details/middle.png';

import LeftArrow from 'public/icons/left-arrow.svg';
import { FileInput } from '~/components/FileInput';

const AssignmentDetailPage = () => {
  const dummy = {
    Title: 'Tugas Hari 1',
    Deadline: '13 September 2024',
    Status: 'belum kumpul', // belum kumpul, terkumpul, terlambat
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    Attachment: {
      type: 'file', // file, link
      name: 'Soal.pdf',
      ext: 'pdf', // pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png
    },
  };
  const { Title, Deadline, Status, Description, Attachment } = dummy;

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white z-0">
      <div className="h-screen w-full bg-[url('/images/assignment/main-background.png')] bg-center bg-no-repeat bg-cover p-6 pt-32">
        {/* Background Component */}
        <Image
          src={LT}
          alt="LT"
          className="fixed top-[-10%] left-0 w-[90%] z-10"
        />
        <Image src={BR} alt="BR" className="fixed right-0 bottom-0 z-10" />
        <Image
          src={M}
          alt="M"
          className="fixed w-[70%] left-[15%] top-[10%] z-10"
        />

        {/* Content */}
        <div className="relative w-full h-full z-20">
          <Button size={'icon'} className="bg-transparent mb-[35px]">
            <Image src={LeftArrow} alt="Left Arrow" />
          </Button>

          {/* Detail */}
          <div className="w-full flex flex-col gap-5 text-pink-400 mb-[11px]">
            {/* Header */}
            <div className="w-full flex flex-col gap-4">
              <h1 className="font-heading text-h3">{Title}</h1>
              <h2 className="font-subheading text-b4">
                <b>Deadline : </b> {Deadline}
              </h2>
              {Status === 'terkumpul' && (
                <Chip label={Status} variant="GREEN" />
              )}
              {Status === 'belum kumpul' && (
                <Chip label={Status} variant="YELLOW" />
              )}
              {Status === 'terlambat' && <Chip label={Status} variant="RED" />}
            </div>

            {/* Description */}
            <p className="font-subheading text-b3 leading-[150%]">
              {Description}
            </p>

            {/* Attachment */}
            <FileChip {...Attachment} />
          </div>

          {/* Submission */}
          <FileInput />
        </div>
      </div>
    </main>
  );
};

export default AssignmentDetailPage;
