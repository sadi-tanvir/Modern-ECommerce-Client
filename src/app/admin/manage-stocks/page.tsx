'use client'
import StockTableRowShimmerEffects from "@/app/components/Shimmer-Effect/StockTableRowShimmerEffects";
import AdminDashboardLayout from "@/app/components/admin/AdminDashboardLayout";
import { errorAlert, successAlert, warningAlert } from "@/app/components/alert-functions/alert";
import { ActionIcon } from "@/app/components/shared/Icon";
import Loader from "@/app/components/shared/Loader";
import { DELETE_STOCK_MUTATION } from "@/gql/mutations/stock.mutations";
import { GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCKS_NAMES } from "@/gql/queries/stock.queries";
import { AdminStockDetailsType } from "@/types/admin.types";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



const StockTable = () => {
    // state
    const [openActionMenu, setOpenActionMenu] = useState(false)
    const [idForMenuAction, setIdForMenuAction] = useState("")


    // gql
    const stocks = useQuery(GET_STOCKS_FOR_ADMINISTRATOR);
    const [deleteStockMutation, { data, loading, error }] = useMutation(DELETE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCKS_NAMES],
    });


    // router
    const router = useRouter();



    // handle action menu
    const handleActionMenu = (id: string) => {
        setOpenActionMenu(!openActionMenu)
        setIdForMenuAction(id)
    }


    // handle delete stock
    const handleDeleteOrder = (id: string) => {
        warningAlert('Yes, Create it!', () => (
            deleteStockMutation({
                variables: {
                    id
                }
            })
        ))
    }

    useEffect(() => {
        // if stock not deleted
        if (error) errorAlert(error.message)

        // if stock deleted
        if (data) successAlert(data?.deleteStockById?.message);
    }, [data, error]);

    return (
        <AdminDashboardLayout>
            {/* {!stocks?.data?.getStocksWithDetails ? */}

            <div onClick={() => openActionMenu ? setOpenActionMenu(false) : null} className="w-screen sm:w-full overflow-x-auto sm:overflow-x-visible">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 border border-gray-300">Image</th>
                            <th className="p-4 border border-gray-300">
                                <div className="font-semibold">Product</div>
                                <div className="text-sm text-gray-600">{/* Add subtitle */}</div>
                            </th>
                            <th className="p-4 border border-gray-300">Status</th>
                            <th className="p-4 border border-gray-300">Category</th>
                            <th className="p-4 border border-gray-300">Price</th>
                            <th className="p-4 border border-gray-300">
                                <div className="font-semibold">Stock qty</div>
                                <div className="text-sm text-gray-600">sold qty</div>
                            </th>
                            <th className="p-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks?.data?.getStocksWithDetails?.length > 0 ?
                            stocks?.data?.getStocksWithDetails.map((stock: AdminStockDetailsType) => (
                                <tr key={stock._id}>
                                    <td className="p-4 border border-gray-300">
                                        <div className="flex justify-center">
                                            <Image
                                                src={stock.imageUrl}
                                                alt={stock.name}
                                                width={64}
                                                height={64}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        <div className="font-semibold">{stock.name}</div>
                                        <div className="text-sm text-gray-600">{stock.description}</div>
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        <span className={`${stock.status == 'in-stock' ? 'bg-green-300 text-green-700' : 'bg-red-300 text-red-700'}  px-2 rounded-md font-semibold`}>
                                            {stock.status}
                                        </span>
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        <span className="bg-green-300 text-green-700 px-2 rounded-md font-semibold">
                                            {stock.category.id.name}
                                        </span>
                                    </td>
                                    <td className="p-4 border border-gray-300">৳{stock.price}</td>
                                    <td className="p-4 border border-gray-300">
                                        <div className="font-semibold">stock / {stock.quantity} pcs</div>
                                        <div className="font-semibold">sold / {stock.sellCount} pcs</div>
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        <div className="relative inline-block text-left  flex justify-center">
                                            <button
                                                onClick={() => handleActionMenu(stock._id)}
                                                type="button"
                                                className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 focus:outline-none"
                                            >
                                                <ActionIcon />
                                            </button>
                                            <div className={`${openActionMenu && (idForMenuAction == stock._id) ? "visible" : "hidden"} origin-top-right absolute right-0 z-50 -mt-36 sm:mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >
                                                    <MenuItem onClick={() => router.push(`/admin/manage-stocks/update-stock?stockId=${stock
                                                        ._id}`)}>Edit</MenuItem>
                                                    <MenuItem rest="text-red-500" onClick={() => handleDeleteOrder(stock._id)}>Delete</MenuItem>
                                                    <MenuItem onClick={() => router.push(`/admin/manage-stocks/${stock._id}`)}>Details</MenuItem>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            :
                            [...Array(9)].map((elem, index) => (<StockTableRowShimmerEffects key={index} />))
                        }
                    </tbody>
                </table>
            </div>
            {/* // } */}
        </AdminDashboardLayout>
    );
};

const MenuItem = ({ children, rest, onClick }: { children: string, rest?: any, onClick: () => void }) => {
    return (
        <a onClick={onClick} href="#" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${rest}`} role="menuitem" >
            {children}
        </a>
    );
};

export default StockTable;

