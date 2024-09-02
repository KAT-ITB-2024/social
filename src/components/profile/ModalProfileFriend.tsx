'use client';

import Image from 'next/image';
import Person from 'public/images/profile/person.png';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '../ui/dialog-profile-friend';
import { api } from '~/trpc/react';

export interface ProfileDetailProps {
  profilePic?: string | null | undefined;
  nama?: string;
  nim?: string;
  fakultas?:
    | 'FITB'
    | 'FMIPA'
    | 'FSRD'
    | 'FTMD'
    | 'FTTM'
    | 'FTSL'
    | 'FTI'
    | 'SAPPK'
    | 'SBM'
    | 'SF'
    | 'SITH'
    | 'STEI';
  jenisKelamin?: 'Male' | 'Female';
  bio?: string | null;
  instagram?: string | null;
  email?: string | null;
}

function ProfileFriend({
  profilePic,
  nama,
  nim,
  fakultas,
  jenisKelamin,
  bio,
  instagram,
  email,
}: ProfileDetailProps) {
  return (
    <div className="flex flex-col px-4 pt-6">
      <div className="mb-4 flex flex-col items-center justify-center gap-x-8">
        <Image
          src={profilePic ? profilePic : Person}
          alt="Profile"
          className="mb-4 h-28 w-28 cursor-pointer"
        />
        <p className="text-sh4 font-bold text-turquoise-400">{nama}</p>
      </div>
      <div>
        <p className="text-b4 text-turquoise-400">NIM</p>
        <p className="mb-4 text-sh4 font-bold text-turquoise-400">{nim}</p>
      </div>
      <div>
        <p className="text-b4 text-turquoise-400">Fakultas</p>
        <p className="mb-4 text-sh4 font-bold text-turquoise-400">{fakultas}</p>
      </div>
      <div>
        <p className="text-b4 text-turquoise-400">Jenis Kelamin</p>
        <p className="mb-4 text-sh4 font-bold text-turquoise-400">
          {jenisKelamin}
        </p>
      </div>
      <div>
        <p className="text-b4 text-turquoise-400">Bio</p>
        <p className="mb-4 text-sh4 font-bold text-turquoise-400">
          {bio ?? '-'}
        </p>
      </div>
      <div>
        <p className="text-b4 text-turquoise-400">Instagram</p>
        <p className="mb-4 text-sh4 font-bold text-turquoise-400">
          {instagram ?? '-'}
        </p>
      </div>
      <div>
        <p className="text-b4 text-turquoise-400">Email</p>
        <p className="text-sh4 font-bold text-turquoise-400">{email ?? '-'}</p>
      </div>
    </div>
  );
}

export default function ProfileFriendModal({
  userId,
  isDialogOpen = false,
  setIsDialogOpen,
}: {
  userId: string;
  isDialogOpen?: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const data = api.profile.getFriendProfile.useQuery({ userId });
  const { data: userProfile } = data;
  if (!userProfile) {
    return null;
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        className="flex w-[343px] flex-col items-center rounded-lg"
        style={{
          backgroundImage: 'url(/images/profile/BackgroundProfile.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="z-0">
          <Image
            src="/images/profile/turtle.png"
            alt="Fish"
            width={150}
            height={150}
            className="absolute left-0 top-0"
          />

          <Image
            src="/images/profile/starfish.png"
            alt="Starfish"
            width={150}
            height={150}
            className="absolute right-0 top-80"
          />
        </div>

        <div className="z-2 absolute right-4 top-4 flex space-x-2">
          <DialogClose asChild>
            <Image
              src="/images/profile/clear.svg"
              alt="Close Icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </DialogClose>
        </div>
        <div className="z-10 overflow-y-auto">
          <ProfileFriend {...userProfile} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
