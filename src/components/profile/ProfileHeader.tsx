'use client';
import Image from 'next/image';
import { useState } from 'react';
import CameraIcon from 'public/images/profile/CameraIcon.svg';
import ModalProfile from '../modal-profile';
import ModalPhoto from '../modal-photo';

export default function ProfileHeader({
  profilePic,
}: {
  profilePic: string | null;
}) {
  const [profileImage, setProfileImage] = useState<string>(
    profilePic == null || profilePic == ''
      ? '/images/profile/PersonImage.png'
      : profilePic,
  );

  const handleProfileImageChange = (newImage: string) => {
    setProfileImage(newImage);
  };

  return (
    <div className="relative flex flex-col items-center pt-24 px-4">
      <h3 className="text-h3 mb-3 text-turquoise-400 items-center text-shadow-orange-lg">
        Profile
      </h3>

      <div className="relative">
        <ModalPhoto
          triggerButton={
            <div
              style={{ position: 'relative', width: '160px', height: '160px' }}
            >
              <Image
                src={profileImage}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="cursor-pointer rounded-full"
              />
            </div>
          }
          photo={profileImage}
        ></ModalPhoto>
        <div className="absolute bottom-1 right-3">
          <ModalProfile
            triggerButton={
              <Image
                src={CameraIcon}
                alt="Camera Icon"
                className="cursor-pointer"
              />
            }
            title="Profile Photo"
            description="Upload your new profile photo"
            onProfileImageChange={handleProfileImageChange}
          />
        </div>
      </div>
    </div>
  );
}
