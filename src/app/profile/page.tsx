import React from 'react';
import ProfileInformation from '../components/profile/ProfileInformation';

const UserProfile = () => {
  return (
    <div className="bg-backgroundColor min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-md">
        <ProfileInformation />
      </div>
    </div>
  );
};

export default UserProfile;
