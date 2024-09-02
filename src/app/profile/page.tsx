import ProfileDetails from '~/components/profile/ProfileDetails';
import ProfileHeader from '~/components/profile/ProfileHeader';
import Image from 'next/image';
import { api } from '~/trpc/server';
import NotFound from '../not-found';

export default async function ProfilePage() {
  const userProfile = await api.profile.getUserProfile();
  if (!userProfile) {
    return <NotFound />;
  }
  const { profilePic } = userProfile;
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col p-0"
        style={{
          backgroundImage: 'url(/images/profile/BackgroundProfile.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
          <ProfileHeader profilePic={profilePic} />
          <ProfileDetails {...userProfile} />
        </div>
      </div>
    </main>
  );
}
