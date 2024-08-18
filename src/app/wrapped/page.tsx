'use client';
import Stories from '@ryse/react-insta-stories';
import { WrappedStories } from './Content';

function Wrapped() {
  return (
    <div className="min-h-screen overflow-hidden bg-red-400">
      <Stories
        stories={WrappedStories}
        defaultInterval={1500}
        width={448}
        height={820}
      />
    </div>
  );
}

export default Wrapped;
