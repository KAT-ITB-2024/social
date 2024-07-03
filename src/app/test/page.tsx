import { redirect } from 'next/navigation';
import { getServerAuthSession } from '~/server/auth';
import LogoutButton from './logoutButton';
import { api } from '~/trpc/server';

const testResultPage = async () => {
  const user = await getServerAuthSession();

  if (!user) {
    redirect('/test/login');
  }
  const profile = await api.profile.getUserProfile();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-4xl font-bold">Welcome to KATITB2024</h1>
        <h2>
          You are logged in as {user.user.nim} ({user.user.role})
        </h2>
        <LogoutButton />
        <div>
          <h2>Profile</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
};

export default testResultPage;
