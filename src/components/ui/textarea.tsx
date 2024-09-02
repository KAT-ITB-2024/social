import * as React from 'react';

import { cn } from '~/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full resize-none overflow-hidden rounded-full bg-neutral-50 px-3 py-2 text-sm text-blue-400 placeholder:text-blue-200 focus:outline-none',
          className,
        )}
        ref={ref}
        {...props}
        rows={1}
        onInput={(e) => {
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
        }}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
