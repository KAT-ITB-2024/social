import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import DesktopView from './desktop-view';
import { api } from '~/trpc/server';
import { notFound } from 'next/navigation';

export default async function ResetToken() {
  const lembagaProfile = await api.lembaga.getCurrentProfile();

  if (!lembagaProfile) {
    return notFound();
  }
  return (
    <DesktopView
      lembaga={{
        name: lembagaProfile.name,
        currentToken: lembagaProfile.currentToken ?? '',
        image: lembagaProfile.logo,
      }}
    />
  );
}
