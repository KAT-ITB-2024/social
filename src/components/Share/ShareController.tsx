import { Button } from '~/components/ui/button';

interface Props {
  children: React.ReactNode;
  shareData: ShareData;
  onSuccess?: () => void;
  onError?: (error?: unknown) => void;
  onInteraction?: () => void;
  disabled?: boolean;
}

export default function ShareController({
  children,
  shareData,
  onInteraction,
  onSuccess,
  onError,
  disabled,
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
    <Button onClick={handleOnClick} disabled={disabled}>
      {children}
    </Button>
  );
}
