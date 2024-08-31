import Image from 'next/image';
import Person from 'public/images/profile/person.png';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog-profile-friend';

interface ProfileDetailProps {
  nama?: string;
  nim?: string;
  fakultas?: string;
  jenisKelamin?: string;
  bio?: string | null;
  instagram?: string | null;
  email?: string | null;
}

function ProfileFriend({
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
          src={Person}
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
  profile,
  triggerButton,
}: {
  profile: ProfileDetailProps;
  triggerButton: JSX.Element;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        className="flex w-[80] flex-col items-center rounded-lg"
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
        <div className="z-10">
          <ProfileFriend {...profile} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
