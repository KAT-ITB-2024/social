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
    <div className="flex flex-col pt-6 px-4">
      <div className="justify-center flex flex-col items-center gap-x-8 mb-4">
        <Image
          src={profilePic ? profilePic : Person}
          alt="Profile"
          className="cursor-pointer w-28 h-28 mb-4"
        />
        <p className="text-turquoise-400 text-sh4 font-bold">{nama}</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">NIM</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">{nim}</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Fakultas</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">{fakultas}</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Jenis Kelamin</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">
          {jenisKelamin}
        </p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Bio</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">
          {bio ?? '-'}
        </p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Instagram</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">
          {instagram ?? '-'}
        </p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Email</p>
        <p className="text-turquoise-400 text-sh4 font-bold">{email ?? '-'}</p>
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
        className="flex flex-col items-center w-[343px] rounded-lg"
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
            className="absolute left-0 top-0 "
          />

          <Image
            src="/images/profile/starfish.png"
            alt="Starfish"
            width={150}
            height={150}
            className="absolute top-80 right-0"
          />
        </div>

        <div className="absolute top-4 right-4 flex space-x-2 z-2">
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
