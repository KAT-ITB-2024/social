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
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import { AssignmentConfirmationModal } from '~/components/assignment/ConfirmationModal';
import { AssingmentInfoModal } from '~/components/assignment/InfoModal';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TRPCError } from '@trpc/server';

export default function DetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const downloadFileMutation = api.storage.generateDownloadUrl.useMutation();
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>('');
  const [progress, setProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isOverDeadline, setIsOverDeadline] = useState(false);
  const [assignmentStatus, setAssignmentStatus] =
    useState<AssignmentSubmission | null>(null);
  const [sudahKumpul, setSudahKumpul] = useState(false);
  const {
    data: assignment,
    isLoading,
    refetch,
  } = api.assignment.getQuestById.useQuery(
    {
      id: params.id,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const submissionMutation = api.submission.postSubmission.useMutation();

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      const savedFileName = localStorage.getItem(
        `assignment_${params.id}_fileName`,
      );
      const savedDownloadUrl = localStorage.getItem(
        `assignment_${params.id}_downloadUrl`,
      );

      if (savedFileName && savedDownloadUrl) {
        setFilename(savedFileName);
        setDownloadUrl(savedDownloadUrl);
      }

      if (assignment) {
        setIsOverDeadline(assignment.assignments.deadline < new Date());
        if (assignment.assignmentSubmissions !== null) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setFilename(assignment.assignmentSubmissions.filename);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setDownloadUrl(assignment.assignmentSubmissions.downloadUrl);
            if (
              assignment.assignmentSubmissions.createdAt >
              assignment.assignments.deadline
            ) {
              setAssignmentStatus(AssignmentSubmission.TERLAMBAT);
            } else {
              setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
            }
            setSudahKumpul(true);
          } catch (error) {}
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

  function handleBack() {
    router.back();
  }

  const openModal = (isOpen: boolean): void => {
    setShowInfoModal(isOpen);
  };

  const handleDelete = () => {
    if (assignmentStatus === AssignmentSubmission.TERKUMPUL) {
      setAssignmentStatus(AssignmentSubmission.BELUM_KUMPUL);
    }
    localStorage.removeItem(`assignment_${params.id}_fileName`);
    localStorage.removeItem(`assignment_${params.id}_downloadUrl`);
    setFilename('');
    setDownloadUrl('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!file) {
      return;
    }
    try {
      setProgress(1);
      const { url, filename } = await uploadFileMutation.mutateAsync({
        filename: file.name,
        folder: FolderEnum.ASSIGNMENT,
        contentType: AllowableFileTypeEnum.PDF,
      });
      const downloadUrl = await downloadFileMutation.mutateAsync({
        filename: filename,
        folder: FolderEnum.ASSIGNMENT,
      });

      await submissionMutation.mutateAsync({
        assignmentId: params.id,
        filename,
        downloadUrl,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await uploadFile(url, file, AllowableFileTypeEnum.PDF);
      setProgress(0);
      if (assignmentStatus === AssignmentSubmission.BELUM_KUMPUL) {
        setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setDownloadUrl(downloadUrl);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setFilename(filename);
      setSudahKumpul(true);
      setShowInfoModal(true);
      void refetch();
    } catch (error) {
      if (error instanceof TRPCError) {
        toast(<ErrorToast desc={`${error.message}`} />);
      } else {
        toast(<ErrorToast desc="Silakan coba submit ulang!" />);
      }
    } finally {
      setProgress(0);
      setIsSubmitting(false);
    }
  };
  // To do : handle kalo no assignment (sbnrnya hampir ga mungkin)
  if (isLoading || !assignment || isSubmitting) {
    return <LoadingSpinnerCustom />;
  }
  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
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
        {/* {isUploading && <LoadingSpinnerCustom />} */}
        <div className="no-scrollbar mx-6 mt-20 overflow-y-scroll">
          <button onClick={handleBack}>
            <Image
              src="/images/detail/arrow-back.svg"
              alt="Arrow back"
              width={40}
              height={40}
            />
          </button>
          <div className="mt-[20px] flex flex-col gap-8 text-pink-400 lg:gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <h3>{assignment.assignments.title}</h3>
                <div className="flex flex-row">
                  <p className="text-b4">
                    <b>Deadline :</b>{' '}
                    {format(assignment.assignments.deadline, 'PPPP - HH:mm', {
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
            {assignment.assignments.filename && (
              <AttachmentButton
                fileName={assignment.assignments.filename}
                fileUrl={assignment.assignments.downloadUrl}
                isUserSubmit={false}
              />
            )}

            <div
              className={`flex w-full flex-col justify-center overflow-visible ${filename === '' ? 'min-h-36 items-center py-3' : 'min-h-24 p-3'} rounded-[14px] border-2 border-blue-300`}
              style={{
                background:
                  'linear-gradient(to right, rgba(12,188,204,0.6), rgba(100,177,247,0.6))',
              }}
            >
              {filename ? (
                <AttachmentButton
                  fileName={filename}
                  fileUrl={downloadUrl ?? ''}
                  isUserSubmit={true}
                  onDelete={handleDelete}
                  isDeleteable={
                    assignment.assignments.assignmentType == 'Side' &&
                    assignment.assignmentSubmissions
                      ? false
                      : assignmentStatus === AssignmentSubmission.TERLAMBAT
                        ? assignment.assignmentSubmissions
                          ? false
                          : true
                        : assignmentStatus === AssignmentSubmission.TERKUMPUL &&
                            isOverDeadline
                          ? false
                          : true
                  }
                />
              ) : (
                <div className="relative">
                  <Image
                    src="/images/detail/ubur-ubur.png"
                    alt="Ubur-Ubur"
                    width={120}
                    height={90}
                  />
                  <FileUpload
                    className="h-8 w-32 rounded-[4px] bg-blue-500 px-5 py-2 text-b5 text-[#FFFEFE]"
                    progress={progress}
                    setFile={setFile}
                    setFilename={setFilename}
                  />
                </div>
              )}
            </div>
            {(assignmentStatus === AssignmentSubmission.BELUM_KUMPUL ||
              (assignmentStatus === AssignmentSubmission.TERLAMBAT &&
                !filename) ||
              (assignmentStatus === AssignmentSubmission.TERLAMBAT &&
                filename &&
                !sudahKumpul)) && (
              <AssignmentConfirmationModal
                handleSubmit={handleSubmit}
                customTriggerButton={
                  <button
                    className={`h-8 w-20 rounded-[4px] bg-blue-500 px-5 py-2 text-b5 text-[#FFFEFE] ${
                      filename === ''
                        ? 'cursor-not-allowed opacity-50'
                        : 'opacity-100'
                    }`}
                    disabled={filename === ''}
                  >
                    Submit
                  </button>
                }
              />
            )}
          </div>
        </div>
      </div>
      <AssingmentInfoModal isOpen={showInfoModal} setIsOpen={openModal} />
    </main>
  );
}
