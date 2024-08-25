import Image from 'next/image';
import ProfileFriend from '~/components/profile/ProfileFriend';

export default function FriendPage() {
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
        <ProfileFriend />
      </div>
    </div>
  );
}
