import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import BrandUpdateForm from '@/app/components/admin/manage-brands/update-brand/BrandUpdateForm';


const UpdateBrand: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Update Brand</h2>
                    <BrandUpdateForm />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default UpdateBrand;
