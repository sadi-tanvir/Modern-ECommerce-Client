import Link from 'next/link';
import LoginForm from '../components/login/LoginForm';


const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-backgroundColor">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-4 text-secondary">Login</h2>
                <LoginForm />
                <h1 className='text-center mt-4 text-secondary'>Don&apos;t have an account?
                    <Link href={'/signup'}>
                        <span className='ml-1 text-primary'>Sing Up</span>
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default Login;