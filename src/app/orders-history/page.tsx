import OrdersItemList from "../components/orders-history/OrderItemLists";

const OrderHistory = () => {

    
    return (
        <div className="w-screen sm:w-full overflow-x-auto sm:overflow-x-visible bg-backgroundColor min-h-screen px-10 py-10">
            <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                <thead>
                    <tr className="bg-backgroundColor">
                        <th className="p-4 border border-gray-300 text-secondary">Order Id</th>
                        <th className="p-4 border border-gray-300 text-secondary">
                            <div className="font-semibold">Total Amount to pay</div>
                        </th>
                        <th className="p-4 border border-gray-300 text-secondary">order status</th>
                        <th className="p-4 border border-gray-300 text-secondary">payment status</th>
                        <th className="p-4 border border-gray-300 text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <OrdersItemList />
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;

