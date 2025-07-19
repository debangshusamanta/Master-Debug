import React, { useState, useEffect } from 'react';
import { avatarOptions } from '../assets/avater.js';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const ProfileAvatarSelector = ({ onAvatarChange }) => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const avatar = docSnap.data().avatar || '';
          setSelectedAvatar(avatar);
          if (onAvatarChange) {
            onAvatarChange(avatar);
          }
        }
      }
    };
    fetchUserAvatar();
  }, [user, onAvatarChange]);

  const handleAvatarClick = async (avatar) => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { avatar });
      setSelectedAvatar(avatar);
      if (onAvatarChange) {
        onAvatarChange(avatar); // 👈 Send the new avatar to parent (Account.jsx)
      }
      toast.success("Avatar updated successfully !");
    } catch (err) {
      console.error("Error updating avatar:", err);
    }
    setLoading(false);
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Choose Your Profile Logo</h2>
      <div className="grid grid-cols-5 gap-4">
        {avatarOptions.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index}`}
            className={`w-20 h-20 rounded-full cursor-pointer border-4 ${
              selectedAvatar === avatar ? 'border-green-500' : 'border-transparent'
            } hover:scale-105 transition`}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
      {loading && <p className="text-sm text-gray-400 mt-3">Updating...</p>}
    </div>
  );
};

export default ProfileAvatarSelector;
