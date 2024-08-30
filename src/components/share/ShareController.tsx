import { Button } from '~/components/ui/button';

interface Props {
  children: React.ReactNode;
  shareData: ShareData;
  onSuccess?: () => void;
  onError?: (error?: unknown) => void;
  onInteraction?: () => void;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'blue'
    | null
    | undefined;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  className?: string;
}

export default function ShareController({
  children,
  shareData,
  onInteraction,
  onSuccess,
  onError,
  disabled,
  variant,
  size,
  className,
}: Props) {
  const handleOnClick = async () => {
    onInteraction?.();
    if (navigator?.share) {
      try {
        await navigator.share(shareData);
        onSuccess?.();
      } catch (err) {
        onError?.(err);
      }
    }
  };

  return (
    <Button
      onClick={handleOnClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
