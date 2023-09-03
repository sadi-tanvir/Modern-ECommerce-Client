'use client'
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import TextInputField from "../shared/TextInputField"
import { useAppDispatch } from "@/redux/hooks/hooks"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client"
import { errorAlert, successAlert } from "../alert-functions/alert"
import { setCookie } from "cookies-next"
import Button from "../shared/Button"
import { USER_LOGIN_MUTATION } from "@/gql/mutations/userAuthMutations"

const LoginForm = () => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })

    // redux
    const dispatch = useAppDispatch()

    // router
    const router = useRouter();

    // signIn mutation
    const [signInMutation, { data, loading, error }] = useMutation(USER_LOGIN_MUTATION);

    // handle input change 
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };


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
        // if error
        if (error) errorAlert(error.message)

        // if login success
        if (data?.loginUser?.status) {
            const { user, token } = data?.loginUser;
            const ownerInfo = {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                image: user.image,
                role: user.role,
                gender: user.gender,
                currentAddress: user.currentAddress,
                permanentAddress: user.permanentAddress,
                dateOfBirth: user.dateOfBirth,
                accountStatus: user.accountStatus,
            }

            //  success alert
            successAlert(data?.loginUser.message)

            // set cookies
            setCookie('logged', 'true');

            // store data into localStorage
            localStorage.setItem("ownerInfo", JSON.stringify(ownerInfo))
            localStorage.setItem("accessToken", JSON.stringify(token))

            // dispatch data into redux store
            dispatch({ type: 'setOwnerInfo', payload: ownerInfo })
            dispatch({ type: 'accessToken', payload: token })
            dispatch({ type: 'ownerRole', payload: user.role })
            dispatch({ type: 'loginUser' })
            if (user.role === 'admin') {
                // set cookies
                setCookie('isAdmin', 'true');
                dispatch({ type: 'accessAdmin' })
            }
            if (user.role === 'user') dispatch({ type: 'accessUser' })

            // redirect to home page
            router.push('/profile')
        };
    }, [data, error]);

    return (
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

            <Button color='red' buttonType='submit' buttonClass='w-full'>Login</Button>
        </form>
    )
}

export default LoginForm