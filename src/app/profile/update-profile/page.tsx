import ProfileUpdateForm from '@/app/components/profile/update-profile/ProfileUpdateForm';


const AddNewCategory: React.FC = () => {

    return (
        <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Update Profile</h2>
                <ProfileUpdateForm />
            </div>
        </div>
    );
};

export default AddNewCategory;
