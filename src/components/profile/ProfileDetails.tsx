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
    <div className="mx-auto mt-4 max-w-sm text-center">
      {isEditing ? (
        <div className="space-y-4 text-left">
          <div>
            <p className="mb-1 text-b4 text-turquoise-400">Bio</p>
            <Input
              placeholder="Bio"
              className="w-full rounded border-2 border-turquoise-400 p-2 text-turquoise-400"
              type="text"
              name="bio"
              value={editProfile.bio ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="mb-1 text-b4 text-turquoise-400">Instagram</p>
            <Input
              placeholder="Instagram"
              className="w-full rounded border-2 border-turquoise-400 p-2 text-turquoise-400"
              type="text"
              name="instagram"
              value={editProfile.instagram ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="mb-1 text-b4 text-turquoise-400">Email</p>
            <Input
              placeholder="Email"
              className="w-full rounded border-2 border-turquoise-400 p-2 text-turquoise-400"
              type="text"
              name="email"
              value={editProfile.email ?? ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button
              className="w-20 border-2 border-blue-600 bg-lightYellow px-8 text-purple"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="w-20 bg-blue-600 px-8 text-shade-200"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-left">
          <div>
            <p className="text-b4 text-turquoise-400">Nama</p>
            <p className="mb-4 text-sh4 font-bold text-turquoise-400">
              {profile.nama}
            </p>
          </div>
          <div>
            <p className="text-b4 text-turquoise-400">NIM</p>
            <p className="mb-4 text-sh4 font-bold text-turquoise-400">
              {profile.nim}
            </p>
          </div>
          <div>
            <p className="text-b4 text-turquoise-400">Fakultas</p>
            <p className="mb-4 text-sh4 font-bold text-turquoise-400">
              {profile.fakultas}
            </p>
          </div>
          <div>
            <p className="text-b4 text-turquoise-400">Jenis Kelamin</p>
            <p className="mb-4 text-sh4 font-bold text-turquoise-400">
              {profile.jenisKelamin}
            </p>
          </div>
          <div>
            <p className="text-b4 text-turquoise-400">Bio</p>
            <p className="mb-4 text-sh4 font-bold text-turquoise-400">
              {sanitizeValue(profile.bio)}
            </p>
          </div>
          <div>
            <p className="text-b4 text-turquoise-400">Instagram</p>
            <p className="mb-4 text-sh4 font-bold text-turquoise-400">
              {sanitizeValue(profile.instagram)}
            </p>
          </div>
          <div>
            <p className="text-b4 text-turquoise-400">Email</p>
            <p className="text-sh4 font-bold text-turquoise-400">
              {sanitizeValue(profile.email)}
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className="mb-20 mt-2 bg-blue-600 px-8"
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
