import AdminDashboardLayout from "@/app/components/admin/AdminDashboardLayout";
import StockItemList from "@/app/components/admin/manage-stocks/StockItemList";

const StockTable = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-screen bg-backgroundColor sm:w-full overflow-x-auto sm:overflow-x-visible">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-secondary">
                            <th className="p-4 border border-gray-300">Image</th>
                            <th className="p-4 border border-gray-300">
                                <div className="font-semibold">Product</div>
                                <div className="text-sm ">{/* Add subtitle */}</div>
                            </th>
                            <th className="p-4 border border-gray-300">Status</th>
                            <th className="p-4 border border-gray-300">Category</th>
                            <th className="p-4 border border-gray-300">Price</th>
                            <th className="p-4 border border-gray-300">
                                <div className="font-semibold">Stock qty</div>/
                                <div className="text-sm ">sold qty</div>
                            </th>
                            <th className="p-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <StockItemList />
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout>
    );
};



export default StockTable;

