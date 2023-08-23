'use client'
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import TextInputField from '../components/shared/TextInputField';
import Button from '../components/shared/Button';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { USER_SIGN_UP_MUTATION } from '@/gql/mutations/userAuthMutations';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { successAlert, errorAlert } from "../components/alert-functions/alert";

const SignUpForm = () => {
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    })

    // redux
    const { isAuthenticate, isAdmin } = useAppSelector(state => state.authReducer);

    // router
    const router = useRouter();

    // signIn mutation
    const [signUpMutation, { data, loading, error }] = useMutation(USER_SIGN_UP_MUTATION);

    // handle input change 
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    // handle user signUp
    const handleUserSignUp = (e: FormEvent) => {
        e.preventDefault();
        const { name, email, password, phone } = userInput;
        signUpMutation({
            variables: {
                info: { name, email, phone, password }
            }
        });
    };



    useEffect(() => {
        // if error
        if (error) errorAlert(error.message)

        //  success alert
        if (data?.signUpUser?.status) successAlert(data?.signUpUser.message);
    }, [data]);


    
    // authentication
    // useEffect(() => {
    //     if (isAuthenticate) {
    //         // redirect to login
    //         router.push('/')
    //     }
    // }, [isAuthenticate])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-secondary mb-4">Sign Up</h2>
                <form onSubmit={handleUserSignUp}>
                    <TextInputField
                        name="name"
                        labelName="Name"
                        placeholder="Your Name"
                        value={userInput.name}
                        onChange={handleInputChange}
                    />
                    <TextInputField
                        name="email"
                        labelName="Email"
                        placeholder="you@example.com"
                        inputType="email"
                        value={userInput.email}
                        onChange={handleInputChange}
                        isRequired={true}
                    />
                    <TextInputField
                        name="password"
                        labelName="Password"
                        placeholder="********"
                        inputType="password"
                        value={userInput.password}
                        onChange={handleInputChange}
                        isRequired={true}
                    />
                    <TextInputField
                        name="phone"
                        labelName="Phone"
                        placeholder="01xxxxxxxxx"
                        inputType="number"
                        value={userInput.phone}
                        onChange={handleInputChange}
                        isRequired={true}
                    />

                    <Button color='red' buttonType='submit' buttonClass='w-full'>Sign Up</Button>
                </form>
                <h1 className='text-center mt-4'>Already have an account?
                    <Link href={'/login'}>
                        <span className='ml-1 text-red-500'>Login</span>
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default SignUpForm;