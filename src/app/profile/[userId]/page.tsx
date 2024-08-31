import Image from 'next/image';
import { notFound } from 'next/navigation';
import ModalProfileFriend from '~/components/profile/ModalProfileFriend';
import { api } from '~/trpc/server';
interface Params {
  userId: string;
}
export default async function FriendPage(
  {
    /*{ params }: { params: Params */
  },
) {
  // const { userId } = params;
  // const userProfile = await api.profile.getFriendProfile({ userId });
  // if (!userProfile) {
  //   return notFound;
  // }
  return (
    <div
      style={{
        backgroundImage: 'url(/images/profile/BackgroundProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Image
        src="/images/profile/wave.png"
        alt="Wave"
        width={300}
        height={100}
        className="absolute left-0 z-0 h-auto w-auto translate-y-[-60px] rotate-[10deg]"
      />
      <Image
        src="/images/profile/turtle.png"
        alt="Fish"
        width={200}
        height={200}
        className="absolute top-10 z-0"
      />

      <Image
        src="/images/profile/starfish.png"
        alt="Starfish"
        width={250}
        height={250}
        className="absolute right-0 top-96 z-0"
      />
      <div className="z-1 relative">
        {/* <ModalProfileFriend {...userProfile} /> */}
      </div>
    </div>
  );
}
