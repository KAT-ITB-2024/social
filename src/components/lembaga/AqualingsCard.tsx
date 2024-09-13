import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ConfirmationModal } from '../ConfirmationModal';
import Penyu from 'public/images/kunjungan/Penyu.png';
interface AqualingsCardProps {
  nim: string;
  name: string;
  profileImage: string | null;
  onClick: () => void;
  isGranted: boolean | null;
}

function AqualingsCard({
  nim,
  name,
  profileImage,
  onClick,
  isGranted,
}: AqualingsCardProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="flex h-fit w-full items-center justify-between rounded-lg border-2 border-orange-300 bg-gradient-to-r from-orange-300 from-5% to-orange-200/50 to-15% px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Profile Image */}
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={profileImage ?? '/images/history/profile-default.png'}
            alt="Profile Image"
            width={56}
            height={56}
            className="rounded-full object-cover"
            onLoad={() => setLoaded(true)}
          />
          {!loaded && (
            <Image
              src="/images/history/profile-default.png"
              alt="Profile Placeholder"
              width={56}
              height={56}
              className="absolute inset-0 rounded-full object-cover"
            />
          )}
        </div>

        {/* Name & NIM */}
        <div className="flex flex-col">
          <p className="text-lg font-bold text-pink-400">{name}</p>
          <p className="text-base font-medium text-pink-200">{nim}</p>
        </div>
        {/* Grant Coins Button */}
        <ConfirmationModal
          triggerText=""
          customTriggerButton={
            <Button
              className="flex flex-row items-center gap-3 bg-orange-400 text-white"
              disabled={isGranted ?? false}
            >
              {!isGranted ? 'Grant Coins' : 'Granted'}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0834 3.50001H10.63C10.7034 3.29334 10.75 3.06668 10.75 2.83334C10.75 1.72668 9.85671 0.833344 8.75004 0.833344C8.05004 0.833344 7.44337 1.19334 7.08337 1.73334L6.75004 2.18001L6.41671 1.72668C6.05671 1.19334 5.45004 0.833344 4.75004 0.833344C3.64337 0.833344 2.75004 1.72668 2.75004 2.83334C2.75004 3.06668 2.79671 3.29334 2.87004 3.50001H1.41671C0.676707 3.50001 0.0900407 4.09334 0.0900407 4.83334L0.083374 12.1667C0.083374 12.9067 0.676707 13.5 1.41671 13.5H12.0834C12.8234 13.5 13.4167 12.9067 13.4167 12.1667V4.83334C13.4167 4.09334 12.8234 3.50001 12.0834 3.50001ZM8.75004 2.16668C9.11671 2.16668 9.41671 2.46668 9.41671 2.83334C9.41671 3.20001 9.11671 3.50001 8.75004 3.50001C8.38337 3.50001 8.08337 3.20001 8.08337 2.83334C8.08337 2.46668 8.38337 2.16668 8.75004 2.16668ZM4.75004 2.16668C5.11671 2.16668 5.41671 2.46668 5.41671 2.83334C5.41671 3.20001 5.11671 3.50001 4.75004 3.50001C4.38337 3.50001 4.08337 3.20001 4.08337 2.83334C4.08337 2.46668 4.38337 2.16668 4.75004 2.16668ZM12.0834 12.1667H1.41671V10.8333H12.0834V12.1667ZM12.0834 8.83334H1.41671V5.50001C1.41671 5.13334 1.71671 4.83334 2.08337 4.83334H4.80337L3.81671 6.18001C3.59671 6.48001 3.66337 6.90001 3.96337 7.11334C4.25671 7.32668 4.67671 7.26001 4.89004 6.96668L6.75004 4.43334L8.61004 6.96668C8.82337 7.26001 9.24337 7.32668 9.53671 7.11334C9.83671 6.90001 9.90337 6.48001 9.68337 6.18001L8.69671 4.83334H11.4167C11.7834 4.83334 12.0834 5.13334 12.0834 5.50001V8.83334Z"
                  fill="#FFFEFE"
                />
              </svg>
            </Button>
          }
          image={Penyu}
          title="Grant Coins"
          description="Siap kasih 100 coins untuk Aqualings sekarang?"
          actionText="Kasih Sekarang"
          cancelText="Batal Kasih"
          cancelColor="white"
          actionColor="bg-orange-400"
          actionTextColor="white"
          titleColor="text-orange-500"
          descriptionColor="text-orange-500"
          customBackgroundColor="white"
          action={onClick}
        />
      </div>

      {/* Grant Coins Button */}
      <Button
        className="flex flex-row items-center gap-2 rounded-md bg-orange-400 px-4 py-2 text-white"
        onClick={onClick}
        disabled={isGranted ?? false}
      >
        {!isGranted ? 'Grant Coins' : 'Granted'}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0834 3.50001H10.63C10.7034 3.29334 10.75 3.06668 10.75 2.83334C10.75 1.72668 9.85671 0.833344 8.75004 0.833344C8.05004 0.833344 7.44337 1.19334 7.08337 1.73334L6.75004 2.18001L6.41671 1.72668C6.05671 1.19334 5.45004 0.833344 4.75004 0.833344C3.64337 0.833344 2.75004 1.72668 2.75004 2.83334C2.75004 3.06668 2.79671 3.29334 2.87004 3.50001H1.41671C0.676707 3.50001 0.0900407 4.09334 0.0900407 4.83334L0.083374 12.1667C0.083374 12.9067 0.676707 13.5 1.41671 13.5H12.0834C12.8234 13.5 13.4167 12.9067 13.4167 12.1667V4.83334C13.4167 4.09334 12.8234 3.50001 12.0834 3.50001ZM8.75004 2.16668C9.11671 2.16668 9.41671 2.46668 9.41671 2.83334C9.41671 3.20001 9.11671 3.50001 8.75004 3.50001C8.38337 3.50001 8.08337 3.20001 8.08337 2.83334C8.08337 2.46668 8.38337 2.16668 8.75004 2.16668ZM4.75004 2.16668C5.11671 2.16668 5.41671 2.46668 5.41671 2.83334C5.41671 3.20001 5.11671 3.50001 4.75004 3.50001C4.38337 3.50001 4.08337 3.20001 4.08337 2.83334C4.08337 2.46668 4.38337 2.16668 4.75004 2.16668ZM12.0834 12.1667H1.41671V10.8333H12.0834V12.1667ZM12.0834 8.83334H1.41671V5.50001C1.41671 5.13334 1.71671 4.83334 2.08337 4.83334H4.80337L3.81671 6.18001C3.59671 6.48001 3.66337 6.90001 3.96337 7.11334C4.25671 7.32668 4.67671 7.26001 4.89004 6.96668L6.75004 4.43334L8.61004 6.96668C8.82337 7.26001 9.24337 7.32668 9.53671 7.11334C9.83671 6.90001 9.90337 6.48001 9.68337 6.18001L8.69671 4.83334H11.4167C11.7834 4.83334 12.0834 5.13334 12.0834 5.50001V8.83334Z"
            fill="#FFFEFE"
          />
        </svg>
      </Button>
    </div>
  );
}

export default AqualingsCard;
