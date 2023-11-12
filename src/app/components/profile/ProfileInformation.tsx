'use client'
import { useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/navigation';
import React from 'react'
import ProfilePhoto from './ProfilePhoto';
import { VerifyIcon } from '../shared/Icon';
import Button from '../shared/Button';

const ProfileInformation = () => {
    const { ownerInfo } = useAppSelector(state => state.authReducer);

    // navigation
    const router = useRouter();

    return (
        <>
            <div className="w-full text-end">
                <Button
                    onClick={() => router.push('/profile/update-profile')}
                    buttonClass="bg-primary text-white px-4 py-1 rounded-md hover:bg-opacity-75 transition-colors ml-auto"
                    boxShadowColor='#35af00'
                    >
                    Edit Profile
                </Button>
            </div>
            <div className="flex items-center justify-between">
                <ProfilePhoto />
                <p className="text-sm text-success font-bold mt-5 uppercase">{ownerInfo.role}</p>
            </div>
            <h2 className="text-2xl font-semibold text-secondary mt-4">
                {ownerInfo.name}
            </h2>
            <p className="text-sm text-gray-500">{ownerInfo.email}</p>
            <div className="mt-6 border-t border-gray-300 pt-6">
                <div className="flex items-center space-x-2">
                    <VerifyIcon />
                    <p className="text-success font-semibold">Verified</p>
                </div>
                <p className="text-secondary mt-2">{ownerInfo.phone}</p>
            </div>
            <div className="mt-6 border-t border-gray-300 pt-6">
                <h3 className="text-lg font-semibold mb-2 text-secondary">
                    Personal Information
                </h3>
                <div className="flex space-x-2">
                    <p className="text-secondary">Gender:</p>
                    <p className="text-secondary font-semibold">{ownerInfo.gender}</p>
                </div>
                <div className="flex space-x-2">
                    <p className="text-secondary">Date of Birth:</p>
                    <p className="text-secondary font-semibold">{ownerInfo.dateOfBirth}</p>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-300 pt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Addresses
                </h3>
                <p className="text-secondary">{ownerInfo.currentAddress}</p>
                <p className="text-secondary mt-1">{ownerInfo.permanentAddress}</p>
            </div>

            <div className="mt-6 border-t border-gray-300 pt-4">
                <div className='flex justify-between items-center'>
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-secondary">Password:</p>
                        <p className={`text-secondary font-semibold uppercase mt-2`}>******</p>
                    </div>
                    <span onClick={() => router.push('/profile/update-password')} className='text-success cursor-pointer hover:underline'>change</span>
                </div>

                <div className='flex justify-between items-center'>
                    <div className="flex items-center space-x-2 mt-1">
                        <p className="text-secondary">Dark Mode:</p>
                        <p className="text-danger font-semibold">Disabled</p>
                    </div>
                    <span className='text-success cursor-pointer hover:underline'>change</span>
                </div>
            </div>
        </>
    )
}

export default ProfileInformation;