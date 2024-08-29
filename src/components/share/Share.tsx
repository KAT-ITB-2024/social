import ShareController from './ShareController';

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
}

export default function Share({
  children,
  shareData,
  onInteraction,
  onSuccess,
  onError,
  disabled,
  variant,
  size,
}: Props) {
  return (
    <>
      <ShareController
        shareData={shareData}
        onInteraction={onInteraction}
        onSuccess={onSuccess}
        onError={onError}
        disabled={disabled}
        variant={variant}
        size={size}
      >
        {children}
      </ShareController>
    </>
  );
}
