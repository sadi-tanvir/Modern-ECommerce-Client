'use client'
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import TextInputField from '../components/shared/TextInputField';
import Button from '../components/shared/Button';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { USER_LOGIN_MUTATION } from '@/gql/mutations/userAuthMutations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })

    // redux
    const dispatch = useAppDispatch()
    const { isAuthenticate, isAdmin } = useAppSelector(state => state.authReducer);

    // router
    const router = useRouter();

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
            const { user, token } = data?.loginUser;
            // success notification
            Toast.fire({
                icon: 'success',
                title: data?.loginUser.message
            })

            const userInfo = {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: user.role
            }

            // store data into localStorage
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
            localStorage.setItem("accessToken", JSON.stringify(token))

            // dispatch data into redux store
            dispatch({ type: 'setUserInfo', payload: userInfo })
            dispatch({ type: 'accessToken', payload: token })
            dispatch({ type: 'userRole', payload: user.role })
            dispatch({ type: 'loginUser' })
            if (user.role === 'admin') dispatch({ type: 'accessAdmin' })
            if (user.role === 'user') dispatch({ type: 'accessUser' })

            // success toast notification
            Toast.fire({
                icon: 'success',
                title: 'Successfully Logged In.'
            })

            // redirect to home page
            router.push('/')
        };
    }, [data]);


    // authentication
    useEffect(() => {
        if (isAuthenticate) {
            // redirect to login
            router.push('/')
        }
    }, [isAuthenticate])



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