import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import StockAddForm from '@/app/components/admin/add-stock/StockAddForm';

const AddNewStock: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start py-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Stock</h2>
                    <StockAddForm />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewStock;
