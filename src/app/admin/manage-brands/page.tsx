import AdminDashboardLayout from "@/app/components/admin/AdminDashboardLayout";
import BrandItemList from "@/app/components/admin/manage-brands/BrandItemList";

const StockTable = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-screen sm:w-full overflow-x-auto sm:overflow-x-visible">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 border border-gray-300">Name</th>
                            <th className="p-4 border border-gray-300">
                                <div className="font-semibold">Email & Phone</div>
                            </th>
                            <th className="p-4 border border-gray-300">status</th>
                            <th className="p-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BrandItemList />
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout >
    );
};

export default StockTable;

