import Link from 'next/link';
import SignUpForm from '../components/signup/SignUpForm';

const SignUp = () => {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-secondary mb-4">Sign Up</h2>
                <SignUpForm />
                <h1 className='text-center text-secondary mt-4'>Already have an account?
                    <Link href={'/login'}>
                        <span className='ml-1 text-primary'>Login</span>
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default SignUp;