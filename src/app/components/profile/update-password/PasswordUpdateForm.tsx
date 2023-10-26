'use client'
import { useAppSelector } from '@/redux/hooks/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { errorAlert, successAlert } from '../../alert-functions/alert';
import TextInputField from '../../shared/TextInputField';
import Button from '../../shared/Button';

const PasswordUpdateForm = () => {
    const passwordStateValues = {
        newPass: '',
        oldPass: '',
    };
    // state
    const [password, setPassword] = useState(passwordStateValues);



    // redux
    const { accessToken } = useAppSelector(state => state.authReducer);



    // navigation
    const router = useRouter();



    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    };



    // handle submit to change password
    const handleChangePassword = async (event: FormEvent) => {
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
        };
    };


    return (
        <form onSubmit={handleChangePassword}>
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
            <Button buttonType='submit' buttonClass='w-full bg-primary'>Update</Button>
            {/* <Button onClick={() => router.push("/stocks")} buttonClass='w-full md:w-48 bg-danger'>
                Back to products List
            </Button> */}
        </form>
    );
};

export default PasswordUpdateForm;