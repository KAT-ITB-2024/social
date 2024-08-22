'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Submission from 'public/images/assignment/details/submission.png';
import { useState } from 'react';
import { FileChip } from './FileChip';
import { getFileDetail } from '~/lib/file';
import { api } from '~/trpc/react';

export const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (files) {
      setFile(files[0] ?? null);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    console.log('submit');
    try {
      // const result = uploadFileMutation.mutate({
      //   fileName:
      // })
      //   filen,
      // });
    } catch (error) {}
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-fit p-4 bg-gradient-to-br from-turquoise-200/60 to-blue-200/60 rounded-[14px] border-2 border-blue-300">
        <Input
          id="submission"
          type="file"
          accept="image/*,.pdf,.doc,.zip"
          className="hidden"
          onChange={fileUploadHandler}
        />

        {/* unsubmitted */}
        {!file && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Image src={Submission} alt="Submission" className="h-28 w-28" />
            <Button
              variant={'blue'}
              onClick={() => {
                document.getElementById('submission')!.click();
              }}
            >
              Upload File
            </Button>
          </div>
        )}

        {/* submitted */}
        {file && (
          <div className="flex flex-col items-start justify-center w-full h-full">
            <FileChip {...getFileDetail(file)} action={removeFile} />
          </div>
        )}
      </div>
      {file && (
        <Button onClick={handleSubmit} variant={'blue'} className="mt-5">
          Submit
        </Button>
      )}
    </>
  );
};
