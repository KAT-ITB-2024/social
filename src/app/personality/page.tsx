'use client';
import { useState } from 'react';
import FirstSection from '~/components/personality/FirstSection';
import Landing from '~/components/personality/Landing';
import { type State } from '~/components/personality/QnAData';
import LoadingPersonality from '~/components/personality/LoadingPersonality';
import { Personality } from '~/types/enums/personality';
import PersonalityResult from '~/components/personality/PersonalityResult';

export default function PersonalityPage() {
  const [state, setState] = useState<State>('not started');
  const [mostType, setMostType] = useState<Personality>('');

  let bgImgUrl = "url('/images/personality/bg-personality-landing.png')";
  if (state === 'started') {
    bgImgUrl = `url('/images/personality/bg-personality-firstSection.png')`;
  }
  if (state === 'loading') {
    bgImgUrl = `url('/images/personality/bg-personality-loading.png')`;
  }
  if (state === 'finished') {
    bgImgUrl = `url('/images/personality/bg-personality-${mostType}.png')`;
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
        {state == 'loading' && <LoadingPersonality onFinish={setState} />}
        {state == 'finished' && <PersonalityResult type={mostType} />}
      </div>
    </main>
  );
}
