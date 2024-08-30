'use client';
import { TRPCError } from '@trpc/server';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { ErrorToast } from '../ui/error-toast';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import { SuccessToast } from '../ui/success-toast';

interface ProfileDetailProps {
  nama: string;
  nim: string;
  fakultas: string;
  jenisKelamin: string;
  bio: string | null;
  instagram: string | null;
  email: string | null;
}

const sanitizeValue = (value: string | null) => {
  return value && value !== '' ? value : '-';
};
const isValidEmail = (email: string | null) => {
  if (!email) return true; // Allow null or empty strings
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ProfileDetails({
  nama,
  nim,
  fakultas,
  jenisKelamin,
  bio,
  instagram,
  email,
}: ProfileDetailProps) {
  const initialProfile = {
    nama,
    nim,
    fakultas,
    jenisKelamin,
    bio,
    instagram,
    email,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateProfileDataMutation = api.profile.updateProfileData.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfile({
      ...editProfile,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    if (!isValidEmail(editProfile.email)) {
      toast(<ErrorToast desc="Email tidak valid" />);
      setIsSubmitting(false);
      return;
    }

    try {
      const { email, bio, instagram } = editProfile;
      await updateProfileDataMutation.mutateAsync({
        email: email,
        bio: bio,
        instagram: instagram,
      });
      setProfile(editProfile);
      setIsEditing(false);
      toast(<SuccessToast desc="Profile berhasil diubah" />);
    } catch (error) {
      if (error instanceof TRPCError) {
        toast(<ErrorToast desc={'Error' + error.message} />);
      } else {
        toast(
          <ErrorToast desc={'Gagal mengubah profil, silahkan coba lagi'} />,
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  if (isSubmitting) {
    return <LoadingSpinnerCustom />;
  }

  return (
    <div className="text-center max-w-sm mx-auto mt-4">
      {isEditing ? (
        <div className="text-left space-y-4">
          <div>
            <p className="text-turquoise-400 text-b4 mb-1">Bio</p>
            <Input
              placeholder="Bio"
              className="w-full p-2 border-2 border-turquoise-400 rounded text-turquoise-400 "
              type="text"
              name="bio"
              value={editProfile.bio ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="text-turquoise-400 text-b4 mb-1">Instagram</p>
            <Input
              placeholder="Instagram"
              className="w-full p-2 border-2 border-turquoise-400 rounded text-turquoise-400 "
              type="text"
              name="instagram"
              value={editProfile.instagram ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="text-turquoise-400 text-b4 mb-1">Email</p>
            <Input
              placeholder="Email"
              className="w-full p-2 border-2 border-turquoise-400 rounded text-turquoise-400 "
              type="text"
              name="email"
              value={editProfile.email ?? ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <Button
              className="bg-lightYellow px-8 border-2 border-blue-600 text-purple w-20"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 px-8 text-shade-200 w-20"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-left space-y-4">
          <div>
            <p className="text-turquoise-400 text-b4">Nama</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {profile.nama}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">NIM</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {profile.nim}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Fakultas</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {profile.fakultas}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Jenis Kelamin</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {profile.jenisKelamin}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Bio</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {sanitizeValue(profile.bio)}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Instagram</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {sanitizeValue(profile.instagram)}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Email</p>
            <p className="text-turquoise-400 text-sh4 font-bold">
              {sanitizeValue(profile.email)}
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-blue-600 mt-2 px-8 mb-20"
              onClick={toggleEditMode}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
