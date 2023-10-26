import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import BrandAddForm from '@/app/components/admin/add-brand/BrandAddForm';


const AddNewBrand: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start py-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Brand</h2>
                    <BrandAddForm />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewBrand;
