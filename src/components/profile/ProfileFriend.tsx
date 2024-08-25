import Image from 'next/image';
import Person from 'public/images/profile/person.png';
export default function ProfileFriend() {
  return (
    <div className="relative flex flex-col pt-24 px-4 left-3">
      <div className="flex flex-row items-center gap-x-8 mb-8">
        <Image
          src={Person}
          alt="Profile"
          className="cursor-pointer w-28 h-28"
        />
        <p className="text-turquoise-400 text-sh4 font-bold">Angelica Kierra</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">NIM</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">13522048</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Fakultas</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">STEI-K</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Jenis Kelamin</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">Perempuan</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Bio</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">“Hi!”</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Instagram</p>
        <p className="text-turquoise-400 text-sh4 font-bold mb-4">@oskm.itb</p>
      </div>
      <div>
        <p className="text-turquoise-400 text-b4">Email</p>
        <p className="text-turquoise-400 text-sh4 font-bold">
          angelicakierra@gmail.com
        </p>
      </div>
    </div>
  );
}
