// import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
// import { Button } from '@/components/ui/button';
'use client';
import Image from 'next/image';
import AttachmentButton from '~/components/Attachment';
import { useState } from 'react';
import FileUpload from '~/components/FileUpload';
import { Chip } from '~/components/Chip';
import { ConfirmationModal } from '~/components/ConfirmationModal';
import kurakura from '/public/images/detail/kura-kura.png';
import gurita from '/public/images/detail/gurita.png';
import InfoModal from '~/components/InfoModal';
export default function DetailPage() {
  const [FileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(FileName);
  function handleBack() {
    console.log('back to previous page');
  }

  function handleSubmit() {
    setIsSubmitted(true);
  }

  function handleDeleteFile() {
    setFileName('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* {showModal != '' && <ModalSubmit onClose={handleBack} />} */}
      <div
        className="fixed-width-container flex flex-col"
        style={{
          backgroundImage: "url('/images/detail/bg-detail.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <InfoModal
          description="TugasMu berhasil dikumpul!"
          title="Terkumpul!"
          className="w-[282px] px-9 py-14 bg-blue-500 text-yellow rounded-[12px] border-none"
          image={gurita}
          isOpen={isSubmitted}
          setIsOpen={setIsSubmitted}
        />

        <div className="mx-6 mt-20">
          <button onClick={() => handleBack()}>
            <Image
              className=""
              src="/images/detail/arrow-back.svg"
              alt="Arrow back"
              width={40}
              height={40}
            />
          </button>
          <div className="mt-[8px] flex flex-col gap-5 text-pink-400">
            <div className="flex flex-col gap-2">
              <h3>Tugas Hari 1</h3>
              <div className="flex flex-row">
                <p className="text-b4 font-bold "> Deadline :</p>
                <p className="text-b4"> 13 September 2024</p>
              </div>
              <div>
                <Chip
                  label={isSubmitted ? 'terkumpul' : 'belum kumpul'}
                  variant={isSubmitted ? 'GREEN' : 'YELLOW'}
                />
              </div>
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
                  handleDelete={handleDeleteFile}
                />
              )}
            </div>
            {FileName != '' && (
              <ConfirmationModal
                action={handleSubmit}
                actionText="Kumpul Sekarang"
                description="Pastikan jawaban yang kamu unggah sudah benar!"
                image={kurakura}
                imageWidth={120}
                imageHeight={81}
                title="Kumpul?"
                customStylesTrigger="w-20 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5"
                triggerText="Submit"
                cancelText="Batal"
                key={1}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
