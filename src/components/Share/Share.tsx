import ShareController from './ShareController';

interface Props {
  children: React.ReactNode;
  shareData: ShareData;
  onSuccess?: () => void;
  onError?: (error?: unknown) => void;
  onInteraction?: () => void;
  disabled?: boolean;
}

export default function Share({
  children,
  shareData,
  onInteraction,
  onSuccess,
  onError,
  disabled,
}: Props) {
  return (
    <>
      <ShareController
        shareData={shareData}
        onInteraction={onInteraction}
        onSuccess={onSuccess}
        onError={onError}
        disabled={disabled}
      >
        {children}
      </ShareController>
    </>
  );
}
