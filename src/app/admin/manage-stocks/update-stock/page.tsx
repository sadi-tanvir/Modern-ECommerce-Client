import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import UpdateStockForm from '@/app/components/admin/manage-stocks/update-stock/UpdateStockForm';

const UpdateStock: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start py-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Update Stock</h2>
                    <UpdateStockForm />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default UpdateStock;
