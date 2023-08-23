'use client'
import { useAppSelector } from '@/redux/hooks/hooks';
import React from 'react';

const UserProfile = () => {
  const { isAuthenticate, isAdmin, userInfo } = useAppSelector(state => state.authReducer);

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-md">
        <div className="w-full text-end">
          <button className="bg-primary text-white px-4 py-1 rounded-md hover:bg-opacity-75 transition-colors ml-auto">
            Edit Profile
          </button>
        </div>
        <div className="flex items-center justify-between">
          <img
            src="https://img.freepik.com/premium-vector/empty-face-icon-avatar-with-black-hair-vector-illustration_601298-13402.jpg?w=2000"
            alt={userInfo.name}
            className="w-16 h-16 rounded-full"
          />
          <p className="text-sm text-green-500 font-semibold mt-5 uppercase">{userInfo.role}</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {userInfo.name}
        </h2>
        <p className="text-sm text-gray-500">{userInfo.email}</p>
        <div className="mt-6 border-t border-gray-300 pt-6">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-500 font-semibold">Verified</p>
          </div>
          <p className="text-gray-600 mt-2">{userInfo.phone}</p>
        </div>
        <div className="mt-6 border-t border-gray-300 pt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Personal Information
          </h3>
          <div className="flex space-x-2">
            <p className="text-gray-600">Gender:</p>
            <p className="text-gray-800 font-semibold">{userInfo.gender}</p>
          </div>
          <div className="flex space-x-2">
            <p className="text-gray-600">Date of Birth:</p>
            <p className="text-gray-800 font-semibold">{userInfo.dateOfBirth}</p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-300 pt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Addresses
          </h3>
          <p className="text-gray-600">{userInfo.currentAddress}</p>
          <p className="text-gray-600 mt-1">{userInfo.permanentAddress}</p>
        </div>
        <div className="mt-6 border-t border-gray-300 pt-6">
          <div className="flex items-center space-x-2">
            <p className="text-gray-600">Account Status:</p>
            <p className={`${'active' == 'active' ? 'text-green-500' : 'text-red-500'} font-semibold uppercase`}>active</p>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-gray-600">Dark Mode:</p>
            <p className="text-red-500 font-semibold">Disabled</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
