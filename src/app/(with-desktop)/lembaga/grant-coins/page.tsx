import { getServerAuthSession } from '~/server/auth';
import GrantMainContent from './main-content';
import { redirect } from 'next/navigation';

export default async function GrantCoins() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== 'ITB-X') {
    redirect('/login');
  }
  return <GrantMainContent />;
}
