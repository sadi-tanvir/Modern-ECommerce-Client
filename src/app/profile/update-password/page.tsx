import React from 'react';
import PasswordUpdateForm from '@/app/components/profile/update-password/PasswordUpdateForm';


const UpdatePassword: React.FC = () => {
    return (
        <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Change Password</h2>
                <PasswordUpdateForm />
            </div>
        </div>
    );
};

export default UpdatePassword;
