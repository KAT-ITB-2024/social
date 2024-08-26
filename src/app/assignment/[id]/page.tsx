'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Chip } from '~/components/Chip';
import AttachmentButton from '~/components/Attachment';
import FileUpload from '~/components/FileUpload';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import { AssignmentSubmission } from '~/types/enums/assignment';
import { ErrorToast } from '~/components/ui/error-toast';
import { toast } from 'sonner';
import { FolderEnum } from '~/types/enums/storage';
import { SuccessToast } from '~/components/ui/success-toast';
import { assignmentTypeEnum } from '@katitb2024/database';
import { TRPCError } from '@trpc/server';

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: assignment, isLoading } = api.assignment.getQuestById.useQuery({
    id: params.id,
  });

  const [fileName, setFileName] = useState(
    assignment?.assignmentSubmissions?.filename ?? '',
  );
  const [downloadUrl, setDownloadUrl] = useState(
    assignment?.assignmentSubmissions?.downloadUrl ?? '',
  );
  const [assignmentStatus, setAssignmentStatus] =
    useState<AssignmentSubmission | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const postMutation = api.submission.postSubmission.useMutation();
  const putMutation = api.submission.putSubmission.useMutation();
  useEffect(() => {
    const savedFileName = localStorage.getItem(
      `assignment_${params.id}_fileName`,
    );
    const savedDownloadUrl = localStorage.getItem(
      `assignment_${params.id}_downloadUrl`,
    );

    if (savedFileName && savedDownloadUrl) {
      setFileName(savedFileName);
      setDownloadUrl(savedDownloadUrl);
    }

    if (assignment) {
      if (assignment.assignmentSubmissions !== null) {
        setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
        setFileName(assignment.assignmentSubmissions.filename);
        setDownloadUrl(assignment.assignmentSubmissions.downloadUrl);
      } else if (assignment.assignments.deadline < new Date()) {
        setAssignmentStatus(AssignmentSubmission.TERLAMBAT);
      } else {
        setAssignmentStatus(AssignmentSubmission.BELUM_KUMPUL);
      }
    }

    if (!isLoading && !assignment) {
      router.push('/not-found');
    }
  }, [assignment, isLoading, params.id, router]);

  function handleBack() {
    router.back();
  }

  async function handleFileUpload(fileName: string, downloadUrl: string) {
    setFileName(fileName);
    setDownloadUrl(downloadUrl);
    localStorage.setItem(`assignment_${params.id}_fileName`, fileName);
    localStorage.setItem(`assignment_${params.id}_downloadUrl`, downloadUrl);
  }

  const handleSubmit = async () => {
    setIsUploading(true);

    try {
      if (assignment?.assignmentSubmissions) {
        await putMutation.mutateAsync({
          submissionId: assignment.assignmentSubmissions.id,
          filename: fileName,
          downloadUrl: downloadUrl,
        });
      } else {
        await postMutation.mutateAsync({
          assignmentId: params.id,
          filename: fileName,
          downloadUrl: downloadUrl,
        });
      }

      setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
      localStorage.removeItem(`assignment_${params.id}_fileName`);
      localStorage.removeItem(`assignment_${params.id}_downloadUrl`);
      toast(
        <SuccessToast desc="Berhasil mengumpulkan tugas!" title="Sukses" />,
      );
      location.reload();
    } catch (error: unknown) {
      if (error instanceof TRPCError) {
        toast(<ErrorToast desc={error.message} title="Error" />);
      } else {
        toast(
          <ErrorToast
            desc={'Something went wrong when submitting your assignment'}
            title="Error"
          />,
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading || !assignment) {
    return <LoadingSpinnerCustom />;
  }

  const onRemove = () => {
    setFileName('');
    setDownloadUrl('');
    localStorage.removeItem(`assignment_${params.id}_fileName`);
    localStorage.removeItem(`assignment_${params.id}_downloadUrl`);
  };

  const isEditable = () => {
    // Side quest
    if (
      assignment.assignments.assignmentType === assignmentTypeEnum.enumValues[1]
    ) {
      return assignment.assignmentSubmissions === null;
    }
    // Main quest udah dinilai
    else {
      return assignment.assignmentSubmissions
        ? assignment.assignmentSubmissions.point === null
        : true;
    }
  };

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
        {/* {isUploading && <LoadingSpinnerCustom />} */}
        <div className="mx-6 mt-20 overflow-y-scroll no-scrollbar">
          <button onClick={handleBack}>
            <Image
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
            {assignment.assignments && (
              <AttachmentButton
                fileName={assignment.assignments.filename}
                fileUrl={assignment.assignments.downloadUrl}
                isUserSubmit={false}
              />
            )}

            <div
              className={`flex flex-col overflow-visible w-full justify-center ${
                fileName === '' ? 'h-36 items-center' : 'h-24 pl-3'
              } border-2 border-blue-300 rounded-[14px]`}
              style={{
                background:
                  'linear-gradient(to right, rgba(12,188,204,0.6), rgba(100,177,247,0.6))',
              }}
            >
              {fileName === '' ? (
                <div className="relative -top-4">
                  <Image
                    src="/images/detail/ubur-ubur.png"
                    alt="Ubur-Ubur"
                    width={120}
                    height={120}
                  />
                  <FileUpload
                    className="w-32 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5"
                    onSubmitted={handleFileUpload}
                    folder={FolderEnum.ASSIGNMENT}
                    onUploading={setIsUploading}
                  />
                </div>
              ) : (
                <AttachmentButton
                  fileName={fileName}
                  fileUrl={downloadUrl}
                  isUserSubmit={true}
                  onRemove={onRemove}
                  isReadonly={!isEditable()}
                />
              )}
            </div>
            {fileName !== '' && !isUploading && isEditable() && (
              <button
                onClick={handleSubmit}
                className="w-20 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5"
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
