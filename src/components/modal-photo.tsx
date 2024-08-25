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
  photo: StaticImageData;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="flex items-center justify-center h-full w-full bg-black">
        <DialogClose asChild>
          <Image
            src="/images/profile/clear_2.svg"
            alt="Close Icon"
            width={24}
            height={24}
            className="cursor-pointer absolute top-4 left-4"
          />
        </DialogClose>
        <div className="flex items-center justify-center">
          <Image
            src={photo}
            alt="Profile"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
