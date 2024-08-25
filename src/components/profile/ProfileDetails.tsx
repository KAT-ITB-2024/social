'use client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

export default function ProfileDetails() {
  const initialProfile = {
    nama: 'Tamara Mayranda Lubis',
    nim: '18222026',
    fakultas: 'STEI-K',
    jenisKelamin: 'Perempuan',
    bio: '“Ayo temenan!”',
    instagram: '@oskm.itb',
    email: 'tamaramayranda@gmail.com',
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfile({
      ...editProfile,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="text-center max-w-sm mx-auto mt-4">
      {isEditing ? (
        <div className="text-left space-y-4">
          <div>
            <p className="text-turquoise-400 text-b4 mb-1">Bio</p>
            <Input
              className="w-full p-2 border-2 border-turquoise-400 rounded text-turquoise-400 text-opacity-50"
              type="text"
              name="bio"
              value={editProfile.bio}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="text-turquoise-400 text-b4 mb-1">Instagram</p>
            <Input
              className="w-full p-2 border-2 border-turquoise-400 rounded text-turquoise-400 text-opacity-50"
              type="text"
              name="instagram"
              value={editProfile.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="text-turquoise-400 text-b4 mb-1">Email</p>
            <Input
              className="w-full p-2 border-2 border-turquoise-400 rounded text-turquoise-400 text-opacity-50"
              type="text"
              name="email"
              value={editProfile.email}
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
              {profile.bio}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Instagram</p>
            <p className="text-turquoise-400 text-sh4 font-bold mb-4">
              {profile.instagram}
            </p>
          </div>
          <div>
            <p className="text-turquoise-400 text-b4">Email</p>
            <p className="text-turquoise-400 text-sh4 font-bold">
              {profile.email}
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
