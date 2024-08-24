'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Chip } from '~/components/Chip';
import AttachmentButton from '~/components/Attachment';
import FileUpload from '~/components/FileUpload';
import { useRouter } from 'next/navigation';
import { type GetServerSideProps } from 'next';
import { api } from '~/trpc/react';
import { LoadingSpinner } from '~/components/Loading';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { type AssignmentData } from '~/types/payloads/assignment';
import { AssignmentSubmission } from '~/types/enums/assignment';

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [FileName, setFileName] = useState('');
  const [assignmentStatus, setAssignmentStatus] =
    useState<AssignmentSubmission | null>(null);
  const [currentAssingment, setCurrentAssignment] =
    useState<AssignmentData | null>(null);
  const { data: assignment, isLoading } = api.assignment.getQuestById.useQuery({
    id: params.id,
  });

  useEffect(() => {
    console.log('Ini assingment', assignment);
    if (assignment) {
      setCurrentAssignment(assignment);
      if (assignment.assignmentSubmissions !== null) {
        setAssignmentStatus(AssignmentSubmission.TERKUMPUL);
      } else {
        console.log('Ga terkumpul');
        if (assignment.assignments.deadline < new Date()) {
          console.log('Terlambat');
          setAssignmentStatus(AssignmentSubmission.TERLAMBAT);
        } else {
          console.log('belum kumpul');
          setAssignmentStatus(AssignmentSubmission.BELUM_KUMPUL);
        }
      }
    }
    // if (!isLoading && !assignment) {
    //   router.push('/not-found');
    // }
  }, [assignment, isLoading]);

  function handleBack() {
    router.back();
  }

  // To do : handle kalo no assignment (sbnrnya hampir ga mungkin)
  if (isLoading || !assignment) {
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
                  <p className="text-b4 font-bold "> Deadline :</p>
                  <p className="text-b4">
                    {' '}
                    {assignment.assignments.deadline.toDateString()}
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
                fileUrl="https://instagram.com"
                isUserSubmit={false}
              />
            )}

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
