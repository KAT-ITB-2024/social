'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Chip } from '~/components/Chip';
import AttachmentButton from '~/components/Attachment';
import FileUpload from '~/components/FileUpload';
import { useRouter } from 'next/navigation';

export default function DetailPage() {
  const router = useRouter();
  const [FileName, setFileName] = useState('');
  console.log(FileName);
  function handleBack() {
    router.back();
  }

  const status = 'terkumpul';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col"
        style={{
          backgroundImage: "url('/images/detail/bg-detail.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-6 mt-20 overflow-y-scroll no-scrollbar">
          <button onClick={() => handleBack()}>
            <Image
              className=""
              src="/images/detail/arrow-back.svg"
              alt="Arrow back"
              width={40}
              height={40}
            />
          </button>
          <div className="mt-[20px] flex flex-col gap-8 lg:gap-4 text-pink-400">
            <div className="flex flex-col gap-2">
              <div>
                <h3>Tugas Hari 1</h3>
                <div className="flex flex-row">
                  <p className="text-b4 font-bold "> Deadline :</p>
                  <p className="text-b4"> 13 September 2024</p>
                </div>
              </div>
              {status === 'terkumpul' && (
                <Chip label={status} variant="GREEN" />
              )}
              {/* {status === 'belum kumpul' && (
                <Chip label={status} variant="YELLOW" />
              )}
              {status === 'terlambat' && <Chip label={status} variant="RED" />} */}
            </div>
            <p className="text-b3 leading-[24px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur
            </p>
            <AttachmentButton
              fileName="Soal.pdf"
              fileUrl="https://instagram.com"
              isUserSubmit={false}
            />

            <div
              className={`flex flex-col overflow-visible w-full justify-center ${FileName == '' ? 'h-36 items-center' : 'h-24 pl-3'} border-2 border-blue-300 rounded-[14px]`}
              style={{
                background:
                  'linear-gradient(to right, rgba(12,188,204,0.6), rgba(100,177,247,0.6))',
              }}
            >
              {FileName == '' ? (
                <div className="relative -top-4">
                  <Image
                    src="/images/detail/ubur-ubur.png"
                    alt="Ubur-Ubur"
                    width={120}
                    height={120}
                  />
                  <FileUpload
                    className="w-32 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5"
                    onSubmitted={setFileName}
                  />
                </div>
              ) : (
                <AttachmentButton
                  fileName={FileName}
                  fileUrl="https://instagram.com"
                  isUserSubmit={true}
                />
              )}
            </div>
            {FileName != '' && (
              <button className="w-20 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
