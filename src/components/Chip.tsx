import { Badge } from './ui/badge';

export const Chip = ({
  label,
  variant,
}: {
  label: string;
  variant: 'RED' | 'YELLOW' | 'GREEN';
}) => {
  let cn = '';
  switch (variant) {
    case 'GREEN':
      cn = 'bg-success-200 border-success-600 text-success-600';
      break;
    case 'YELLOW':
      cn = 'bg-orange-100 border-orange-400 text-orange-500';
      break;
    case 'RED':
      cn = 'bg-error-200 border-error-600 text-error-600';
      break;
    default:
      break;
  }

  return (
    <Badge variant="kehadiran" className={cn}>
      {label}
    </Badge>
  );
};
