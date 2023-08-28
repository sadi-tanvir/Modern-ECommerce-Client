'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import axios from 'axios';
import React, { ChangeEvent, useRef } from 'react'
import { successAlert } from '../alert-functions/alert';

const ProfilePhoto = () => {


    // redux
    const dispatch = useAppDispatch()
    const { isAuthenticate, isAdmin, ownerInfo, accessToken } = useAppSelector(state => state.authReducer);

    // profile upload process
    const profilePhotoRef = useRef<HTMLInputElement>(null);
    const handleProfileUpload = () => {
        profilePhotoRef.current?.click();
    }
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();

            if (e.target?.files) {
                console.warn(e.target.files[0]);
                formData.append('profile_photo', e.target.files[0])
            };

            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile-pic-upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: accessToken
                    }
                }
            );

            if (res.data.status) {
                const info = res.data.owner;
                const ownerInfo = {
                    _id: info._id,
                    name: info.name,
                    email: info.email,
                    password: info.password,
                    phone: info.phone,
                    image: info.image,
                    role: info.role,
                    gender: info.gender,
                    currentAddress: info.currentAddress,
                    permanentAddress: info.permanentAddress,
                    dateOfBirth: info.dateOfBirth,
                    accountStatus: info.accountStatus,
                }

                // success alert
                successAlert(res.data.message);

                // update data into localStorage
                localStorage.setItem("ownerInfo", JSON.stringify(ownerInfo))

                // update data into redux store
                dispatch({ type: 'setOwnerInfo', payload: ownerInfo })
            }

            console.warn('uploaded', res);
        } catch (error) {
            console.warn(error);

        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/profile-pic/${ownerInfo.image}`}
                alt={ownerInfo.name}
                className="w-16 h-16 rounded-full"
            />
            <input
                type="file"
                className="hidden"
                ref={profilePhotoRef}
                onChange={handleChange}
            />
            <button
                onClick={handleProfileUpload}
                className="bg-red-500 text-white px-2 text-xs py-1 rounded-md hover:bg-opacity-75 transition-colors ml-auto mt-2">
                Upload Photo
            </button>
        </div>
    )
}

export default ProfilePhoto