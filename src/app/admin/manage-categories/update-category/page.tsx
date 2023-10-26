import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import CategoryUpdateForm from '@/app/components/admin/manage-categories/update-category/CategoryUpdateForm';


const UpdateStock: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start py-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Update Category</h2>
                    <CategoryUpdateForm />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default UpdateStock;
