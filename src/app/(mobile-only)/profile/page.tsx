import ProfileDetails from '~/components/profile/ProfileDetails';
import ProfileHeader from '~/components/profile/ProfileHeader';
import Image from 'next/image';
import { api } from '~/trpc/server';
import { getServerAuthSession } from '~/server/auth';
import { notFound, redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }
  const userProfile = await api.profile.getUserProfile();
  if (!userProfile) {
    return notFound();
  }
  const { profilePic } = userProfile;
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container lg:no-scrollbar flex flex-col overflow-y-auto p-12"
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
          className="absolute right-0 z-0 h-auto w-auto max-w-full translate-y-[-60px] overflow-hidden object-cover"
        />
        <Image
          src="/images/profile/turtle.png"
          alt="Fish"
          width={200}
          height={200}
          className="absolute top-10 z-0 max-w-full overflow-hidden"
        />

        <Image
          src="/images/profile/starfish.png"
          alt="Starfish"
          width={250}
          height={250}
          className="absolute bottom-0 right-0 z-0 max-w-full overflow-hidden"
        />

        <div className="z-1 relative pl-4">
          <ProfileHeader profilePic={profilePic} />
          <ProfileDetails {...userProfile} />
        </div>
      </div>
    </main>
  );
}
