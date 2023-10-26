'use client'
import { useAppSelector } from "@/redux/hooks/hooks";
import TextInputField from "../shared/TextInputField"
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { USER_SIGN_UP_MUTATION } from "@/gql/mutations/userAuthMutations";
import { errorAlert, successAlert } from "../alert-functions/alert";
import Button from "../shared/Button";

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

    return (
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

            <Button buttonType='submit' buttonClass='w-full bg-primary'>Sign Up</Button>
        </form>
    )
}

export default SignUpForm