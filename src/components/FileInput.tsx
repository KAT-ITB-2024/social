'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Submission from 'public/images/assignment/details/submission.png';
import { useState } from 'react';
import { FileChip } from './FileChip';
import { getFileDetail, uploadFile } from '~/lib/file';
import { api } from '~/trpc/react';
import { AllowableFileTypeEnum, FolderEnum } from '~/types/payloads/storage';

export const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const downloadFileMutation = api.storage.generateDownloadUrl.useMutation();
  const submissionMutation = api.submission.postSubmission.useMutation();
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
    if (!file) {
      return;
    }
    try {
      const { url, filename } = await uploadFileMutation.mutateAsync({
        folder: FolderEnum.ASSIGNMENT,
        filename: file.name,
        contentType: AllowableFileTypeEnum.PDF,
      });
      try {
        await uploadFile(url, file, AllowableFileTypeEnum.PDF);
        await submissionMutation.mutateAsync({
          assignmentId: 'm9ikdyam7mlbtd43i05abk5b',
          file: filename,
        });
      } catch (error) {}
      console.log('Ini url', url);
    } catch (error) {
      console.log('Error generating pre signed url');
    }
  };

  const handleDownload = async () => {
    console.log('Download');
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
      {file && (
        <Button
          onClick={() => {
            console.log('halo');
          }}
        >
          Download Testing
        </Button>
      )}
    </>
  );
};
