'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Chip } from '~/components/Chip';
import AttachmentButton from '~/components/Attachment';
import FileUpload from '~/components/FileUpload';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { AssignmentSubmission } from '~/types/enums/assignment';
import { AllowableFileTypeEnum, FolderEnum } from '~/types/enums/storage';
import { uploadFile } from '~/lib/file';
import { toast } from 'sonner';
import { ErrorToast } from '~/components/ui/error-toast';
import { SuccessToast } from '~/components/ui/success-toast';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [assignmentStatus, setAssignmentStatus] =
    useState<AssignmentSubmission | null>(null);
  const { data: assignment, isLoading } = api.assignment.getQuestById.useQuery({
    id: params.id,
  });

  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const downloadFileMutation = api.storage.generateDownloadUrl.useMutation();
  const submissionMutation = api.submission.postSubmission.useMutation();

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      if (assignment) {
        if (assignment.assignmentSubmissions !== null) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setFilename(assignment.assignmentSubmissions.filename);
            setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
          } catch (error) {
            console.log('Error while fetching download url');
          }
        } else {
          if (assignment.assignments.deadline < new Date()) {
            setAssignmentStatus(AssignmentSubmission.TERLAMBAT);
          } else {
            setAssignmentStatus(AssignmentSubmission.BELUM_KUMPUL);
          }
        }
      }

      if (!isLoading && !assignment) {
        router.push('/not-found');
      }
    };

    fetchDownloadUrl().catch((error) => {
      console.error('An unexpected error occurred in fetchDownloadUrl', error);
    });
  }, [assignment, isLoading]);

  useEffect(() => {
    if (file) {
      setFilename(file.name);
    } else {
      setFilename(null);
    }
  }, [file]);

  function handleBack() {
    router.back();
  }

  const handleDelete = () => {
    console.log('assingment status', assignmentStatus);
    if (
      assignmentStatus === AssignmentSubmission.TERKUMPUL ||
      assignmentStatus === AssignmentSubmission.BELUM_KUMPUL
    ) {
      setAssignmentStatus(AssignmentSubmission.BELUM_KUMPUL);
      setFilename(null);
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
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
        const downloadUrl = await downloadFileMutation.mutateAsync({
          folder: FolderEnum.ASSIGNMENT,
          filename: filename,
        });
        await uploadFile(url, file, AllowableFileTypeEnum.PDF);
        await submissionMutation.mutateAsync({
          assignmentId: params.id,
          filename,
          downloadUrl,
        });
        toast(<SuccessToast desc="Tugas berhasil terkumpul!" />);
      } catch (error) {
        toast(<ErrorToast desc="Silakan coba submit ulang!" />);
      }
    } catch (error) {
      toast(<ErrorToast desc="Silakan coba submit ulang!" />);
    } finally {
      setIsSubmitting(false);
    }
  };
  // To do : handle kalo no assignment (sbnrnya hampir ga mungkin)
  if (isLoading || !assignment || isSubmitting) {
    return <LoadingSpinnerCustom />;
  }
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
                <h3>{assignment.assignments.title}</h3>
                <div className="flex flex-row">
                  <p className="text-b4">
                    {' '}
                    <b>Deadline :</b>{' '}
                    {format(assignment.assignments.deadline, 'PPPP', {
                      locale: idLocale,
                    })}
                  </p>
                </div>
              </div>
              {assignmentStatus === AssignmentSubmission.TERKUMPUL && (
                <Chip label={assignmentStatus} variant="GREEN" />
              )}
              {assignmentStatus === AssignmentSubmission.BELUM_KUMPUL && (
                <Chip label={assignmentStatus} variant="YELLOW" />
              )}
              {assignmentStatus === AssignmentSubmission.TERLAMBAT && (
                <Chip label={assignmentStatus} variant="RED" />
              )}
            </div>
            <p className="text-b3 leading-[24px]">
              {assignment.assignments.description}
            </p>
            {assignment.assignments.file && (
              // To do : Handle buka + download soal
              <AttachmentButton
                fileName="Soal.pdf"
                fileUrl={assignment.assignments.file}
                isUserSubmit={false}
              />
            )}

            <div
              className={`flex flex-col overflow-visible w-full justify-center ${file === null ? 'h-36 items-center' : 'h-24 pl-3'} border-2 border-blue-300 rounded-[14px]`}
              style={{
                background:
                  'linear-gradient(to right, rgba(12,188,204,0.6), rgba(100,177,247,0.6))',
              }}
            >
              {filename ? (
                <AttachmentButton
                  fileName={filename}
                  fileUrl={assignment.assignmentSubmissions?.downloadUrl ?? ''}
                  isUserSubmit={true}
                  onDelete={handleDelete}
                />
              ) : (
                assignmentStatus === AssignmentSubmission.BELUM_KUMPUL && (
                  <div className="relative -top-4">
                    <Image
                      src="/images/detail/ubur-ubur.png"
                      alt="Ubur-Ubur"
                      width={120}
                      height={120}
                    />
                    <FileUpload
                      className="w-32 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5"
                      onSubmitted={setFile}
                    />
                  </div>
                )
              )}
            </div>
            {assignmentStatus === AssignmentSubmission.BELUM_KUMPUL && (
              <button
                className={`w-20 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5 ${
                  file === null
                    ? 'opacity-50 cursor-not-allowed'
                    : 'opacity-100'
                }`}
                onClick={handleSubmit}
                disabled={file === null}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
