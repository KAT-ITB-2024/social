import { getServerAuthSession } from '~/server/auth';
import ChangePasswordform from './ChangePasswordForm';
import { redirect } from 'next/navigation';

export default async function Change() {
  const Session = await getServerAuthSession();

  if (!Session) {
    redirect('/test/login');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Change Password</h1>
        <ChangePasswordform Session={Session} />
      </div>
    </main>
  );
}
