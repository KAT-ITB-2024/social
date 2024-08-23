'use client';
import Image from 'next/image';
import { useState } from 'react';
import FirstSection from '~/components/mbti/FirstSection';
import Landing from '~/components/mbti/Landing';
import { Button } from '~/components/ui/button';
// import bgLanding from '/public/images/mbti/bg-mbti-landing.png';
export default function MbtiPage() {
  const [status, setStatus] = useState('not start');
  function handleStart() {
    setStatus('started');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col items-center"
        style={{
          backgroundImage: "url('/images/mbti/bg-mbti-landing.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        {status === 'not start' && <Landing onStart={handleStart} />}
        {status === 'started' && <FirstSection />}
      </div>
    </main>
  );
}
