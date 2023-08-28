import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import ProductAddForm from '@/app/components/admin/add-product/ProductAddForm';



const AddNewProduct: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Product</h2>
                    <ProductAddForm />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewProduct;
