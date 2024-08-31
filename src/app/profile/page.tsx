import ProfileDetails from '~/components/profile/ProfileDetails';
import ProfileHeader from '~/components/profile/ProfileHeader';
import Image from 'next/image';
import { api } from '~/trpc/server';
import { notFound } from 'next/navigation';
// import ModalProfileFriend from '~/components/profile/ModalProfileFriend';

export default async function ProfilePage() {
  const userProfile = await api.profile.getUserProfile();
  if (!userProfile) {
    return notFound;
  }
  const { profilePic } = userProfile;
  return (
    <div
      style={{
        backgroundImage: 'url(/images/profile/BackgroundProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Image
        src="/images/profile/wave.png"
        alt="Wave"
        width={300}
        height={100}
        className="absolute left-0 translate-y-[-60px] rotate-[10deg] z-0 w-auto h-auto"
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
        className="absolute top-96 right-0 z-0"
      />

      <div className="relative z-1">
        <ProfileHeader profilePic={profilePic} />
        <ProfileDetails {...userProfile} />
      </div>

      {/* <div className='relative' >
        <ModalProfileFriend 
          profile={{
            nama: "Angelica Kierra",
            nim: "13522048",
            fakultas: "STEI-K",
            jenisKelamin: "Perempuan",
            bio: "Hi!",
            instagram: "@oskm.itb",
            email: "angelicakierra@gmail.com",
          }}
          triggerButton={
            <div className='flex justify-center'>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Friend Profile</button>
            </div>
          }
        />
      </div> */}
    </div>
  );
}
