import { api } from '~/trpc/server';
import { notFound, redirect } from 'next/navigation';
import MainContent from './main-content';
import { getServerAuthSession } from '~/server/auth';

export interface Lembaga {
  name: string;
  currentToken: string | null;
  image: string | null;
  visitorCount: number | null;
}

export default async function LembagaPage() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== 'ITB-X') {
    redirect('/login');
  }
  const lembagaProfile = await api.lembaga.getCurrentProfile();

  if (!lembagaProfile) {
    return notFound();
  }
  return (
    <MainContent lembaga={{ ...lembagaProfile, image: lembagaProfile.logo }} />
  );
}
