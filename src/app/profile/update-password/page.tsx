'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import TextInputField from '@/app/components/shared/TextInputField';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import axios from 'axios';
import { errorAlert, successAlert } from '@/app/components/alert-functions/alert';
import { useRouter } from 'next/navigation';


const UpdatePassword: React.FC = () => {
    // redux
    const dispatch = useAppDispatch()
    const { accessToken } = useAppSelector(state => state.authReducer);

    

    const passwordStateValues = {
        newPass: '',
        oldPass: '',
    }
    // state
    const [password, setPassword] = useState(passwordStateValues);
    


    // navigation
    const router = useRouter()
    


    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    };
    


    // handle submit to update owner profile
    const handleUpdateOwnerProfile = async (event: FormEvent) => {
        try {
            event.preventDefault();
            const { oldPass, newPass } = password;
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/change-password`,
                { oldPass, newPass },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            );

            if (res.data.message) {
                // success alert
                successAlert(res.data.message);

                // redirect to profile page
                router.push('/profile')
            }


        } catch (error: any) {
            console.error(error, 'error');
            errorAlert(error.response.data.message)
        }
    }



    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Update Profile</h2>
                    <form onSubmit={handleUpdateOwnerProfile}>
                        <TextInputField
                            name="oldPass"
                            labelName="Old Password"
                            placeholder="Old Password"
                            value={password.oldPass}
                            onChange={handleInputChange}
                            inputType='password'
                            isRequired={true}
                        />

                        <TextInputField
                            name="newPass"
                            labelName="New Password"
                            placeholder="New Password"
                            value={password.newPass}
                            onChange={handleInputChange}
                            inputType='password'
                            isRequired={true}
                        />


                        <Button color='red' buttonType='submit' buttonClass='w-full'>Update</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default UpdatePassword;
