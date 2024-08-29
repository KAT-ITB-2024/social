'use client';
import { useEffect, useRef, useState } from 'react';
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

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const downloadFileMutation = api.storage.generateDownloadUrl.useMutation();
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>('');
  const [progress, setProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [assignmentStatus, setAssignmentStatus] =
    useState<AssignmentSubmission | null>(null);
  const { data: assignment, isLoading } = api.assignment.getQuestById.useQuery({
    id: params.id,
  });

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
        if (assignment.assignmentSubmissions !== null) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setFilename(assignment.assignmentSubmissions.filename);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setDownloadUrl(assignment.assignmentSubmissions.downloadUrl);
            setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
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

  async function handleFileUpload(fileName: string, downloadUrl: string) {
    setFilename(fileName);
    setDownloadUrl(downloadUrl);
    localStorage.setItem(`assignment_${params.id}_fileName`, fileName);
    localStorage.setItem(`assignment_${params.id}_downloadUrl`, downloadUrl);
  }

  const handleDelete = () => {
    if (
      assignmentStatus === AssignmentSubmission.TERKUMPUL ||
      assignmentStatus === AssignmentSubmission.BELUM_KUMPUL
    ) {
      setAssignmentStatus(AssignmentSubmission.BELUM_KUMPUL);
      localStorage.removeItem(`assignment_${params.id}_fileName`);
      localStorage.removeItem(`assignment_${params.id}_downloadUrl`);
      setFilename('');
      setDownloadUrl('');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!file) {
      return;
    }
    try {
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
        setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setDownloadUrl(downloadUrl);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFilename(filename);
        setShowInfoModal(true);
      } catch (error) {
        toast(<ErrorToast desc="Silakan coba submit ulang!" />);
      }
    } catch (error) {
      toast(<ErrorToast desc="Silakan coba submit ulang!" />);
    } finally {
      setProgress(0);
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
              className={`flex flex-col overflow-visible w-full justify-center ${filename === '' ? 'min-h-36 items-center py-3' : 'min-h-24 p-3'} border-2 border-blue-300 rounded-[14px]`}
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
                    assignment.assignmentSubmissions?.point === null
                  }
                />
              ) : (
                assignmentStatus === AssignmentSubmission.BELUM_KUMPUL && (
                  <div className="relative">
                    <Image
                      src="/images/detail/ubur-ubur.png"
                      alt="Ubur-Ubur"
                      width={120}
                      height={90}
                    />
                    <FileUpload
                      className="w-32 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5"
                      progress={progress}
                      setFile={setFile}
                      setFilename={setFilename}
                    />
                  </div>
                )
              )}
            </div>
            {assignmentStatus === AssignmentSubmission.BELUM_KUMPUL && (
              <AssignmentConfirmationModal
                handleSubmit={handleSubmit}
                customTriggerButton={
                  <button
                    className={`w-20 h-8 py-2 px-5 rounded-[4px] bg-blue-500 text-[#FFFEFE] text-b5 ${
                      filename === ''
                        ? 'opacity-50 cursor-not-allowed'
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
