import Image, { type StaticImageData } from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from './ui/dialog-photo';

export default function ModalPhoto({
  triggerButton,
  photo,
}: {
  triggerButton: JSX.Element;
  photo: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="flex h-full w-full items-center justify-center bg-black">
        <DialogClose asChild>
          <Image
            src="/images/profile/clear_2.svg"
            alt="Close Icon"
            width={24}
            height={24}
            className="absolute left-4 top-4 cursor-pointer"
          />
        </DialogClose>
        <div className="flex h-full max-h-[80vh] w-full max-w-full items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src={photo}
              alt="Profile"
              className="absolute max-h-full max-w-full object-contain"
              fill
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
