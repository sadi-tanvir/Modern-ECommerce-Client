'use client'
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import TextInputField from '../components/shared/TextInputField';
import Button from '../components/shared/Button';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { USER_LOGIN_MUTATION } from '@/gql/mutations/userAuthMutations';

const LoginForm = () => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })

    // signIn mutation
    const [signInMutation, { data, loading, error }] = useMutation(USER_LOGIN_MUTATION);

    // handle input change 
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    // notification toast
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    // handle user signUp
    const handleUserLogin = (e: FormEvent) => {
        e.preventDefault();
        const { email, password } = userInput;
        signInMutation({
            variables: {
                info: { email, password }
            }
        });
    };

    useEffect(() => {
        console.warn(data);
        // error notification
        if (error) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to Sign In'
            })
        }

        if (data?.loginUser?.status) {
            // success notification
            Toast.fire({
                icon: 'success',
                title: data?.loginUser.message
            })
        };
    }, [data]);



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleUserLogin}>
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

                    <Button buttonType='submit'>Login</Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;