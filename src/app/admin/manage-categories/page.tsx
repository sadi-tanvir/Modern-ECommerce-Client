import AdminDashboardLayout from "@/app/components/admin/AdminDashboardLayout";
import CategoryItemList from "@/app/components/admin/manage-categories/CategoryItemList";


const StockTable = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-screen sm:w-full overflow-x-auto sm:overflow-x-visible">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-secondary">
                            <th className="p-4 border border-gray-300">Image</th>
                            <th className="p-4 border border-gray-300">Name</th>
                            <th className="p-4 border border-gray-300">Description</th>
                            <th className="p-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CategoryItemList />
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout>
    );
};

export default StockTable;

