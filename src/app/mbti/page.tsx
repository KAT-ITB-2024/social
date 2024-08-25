'use client';
import Image from 'next/image';
import { useState } from 'react';
import FirstSection from '~/components/mbti/FirstSection';
import Landing from '~/components/mbti/Landing';
import { Button } from '~/components/ui/button';
import MbtiResult from '~/components/mbti/MbtiResult';
import { type State } from '~/components/mbti/QnAData';

export default function MbtiPage() {
  const [state, setState] = useState<State>('not started');
  const [mostType, setMostType] = useState('');

  let bgImgUrl = "url('/images/mbti/bg-mbti-landing.png')";
  if (state === 'started') {
    bgImgUrl = `url('/images/mbti/bg-mbti-firstSection.png')`;
  }
  if (state === 'finished') {
    bgImgUrl = `url('/images/mbti/bg-mbti-${mostType}.png')`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col items-center"
        style={{
          backgroundImage: bgImgUrl,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        {state == 'not started' && <Landing onStart={setState} />}
        {state == 'started' && (
          <FirstSection onFinished={setState} setMostType={setMostType} />
        )}
        {state == 'finished' && <MbtiResult type={mostType} />}
      </div>
    </main>
  );
}
