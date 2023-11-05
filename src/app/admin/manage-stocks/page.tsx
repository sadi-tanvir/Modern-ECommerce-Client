import AdminDashboardLayout from "@/app/components/admin/AdminDashboardLayout";
import ManageAdminStockLayout from "@/app/components/admin/manage-stocks/ManageAdminStockLayout";

const StockTable = () => {
    return (
        <AdminDashboardLayout>
            <div className="w-screen bg-backgroundColor sm:w-full overflow-x-auto sm:overflow-x-visible relative pb-24">
                <ManageAdminStockLayout />
            </div>
        </AdminDashboardLayout>
    );
};

export default StockTable;

