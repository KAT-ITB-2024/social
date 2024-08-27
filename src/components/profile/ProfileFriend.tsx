import Image from 'next/image';
import Person from 'public/images/profile/person.png';

interface ProfileDetailProps {
  nama: string;
  nim: string;
  fakultas: string;
  jenisKelamin: string;
  bio: string | null;
  instagram: string | null;
  email: string | null;
}

export default function ProfileFriend({
  nama,
  nim,
  fakultas,
  jenisKelamin,
  bio,
  instagram,
  email,
}: ProfileDetailProps) {
  return (
    <div className="relative flex flex-col pt-24 px-4 left-3">
      <div className="flex flex-row items-center gap-x-8 mb-8">
        <Image
          src={Person}
          alt="Profile"
          className="cursor-pointer w-28 h-28"
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
