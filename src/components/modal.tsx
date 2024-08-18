import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function Modal({
  triggerButton,
  title,
  description,
  icon,
  children,
}: {
  triggerButton: JSX.Element;
  title: string;
  description: string;
  icon?: string;
  children?: string | JSX.Element | JSX.Element[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-[500px] flex flex-col">
        {icon && (
          <div className="w-[25px] h-[25px] relative">
            <Image
              src={icon}
              alt={description}
              className="fixed top-0 right-0 w-[90%]"
            />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <p>{description}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>{children}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
