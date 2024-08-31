'use client';
import { useState } from 'react';
import FirstSection from '~/components/personality/FirstSection';
import Landing from '~/components/personality/Landing';
import MbtiResult from '~/components/personality/MbtiResult';
import { type State } from '~/components/personality/QnAData';
import LoadingMBTI from '~/components/personality/LoadingMBTI';
import { MBTI } from '~/types/enums/mbti';

export default function MbtiPage() {
  const [state, setState] = useState<State>('not started');
  const [mostType, setMostType] = useState<MBTI>('');

  let bgImgUrl = "url('/images/mbti/bg-mbti-landing.png')";
  if (state === 'started') {
    bgImgUrl = `url('/images/mbti/bg-mbti-firstSection.png')`;
  }
  if (state === 'loading') {
    bgImgUrl = `url('/images/mbti/bg-mbti-loading.png')`;
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
        {state == 'loading' && <LoadingMBTI onFinish={setState} />}
        {state == 'finished' && <MbtiResult type={mostType} />}
      </div>
    </main>
  );
}
