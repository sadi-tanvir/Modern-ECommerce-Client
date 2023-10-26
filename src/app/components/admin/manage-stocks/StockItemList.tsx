'use client'
import { DELETE_STOCK_MUTATION } from "@/gql/mutations/stock.mutations";
import { GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCKS_NAMES } from "@/gql/queries/stock.queries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { errorAlert, successAlert, warningAlert } from "../../alert-functions/alert";
import { AdminStockDetailsType } from "@/types/admin.types";
import Image from "next/image";
import { ActionIcon } from "../../shared/Icon";
import DropdownMenuItem from "../DropdownMenuItem";
import StockTableRowShimmerEffects from "../../Shimmer-Effect/StockTableRowShimmerEffects";

const StockItemList = () => {

    // state
    const [openActionMenu, setOpenActionMenu] = useState(false)
    const [idForMenuAction, setIdForMenuAction] = useState("")



    // gql
    const stocks = useQuery(GET_STOCKS_FOR_ADMINISTRATOR);
    const [deleteStockMutation, { data, loading, error }] = useMutation(DELETE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCKS_NAMES],
    });



    // navigation
    const router = useRouter();



    // handle action menu
    const handleActionMenu = (id: string) => {
        setOpenActionMenu(!openActionMenu)
        setIdForMenuAction(id)
    }



    // handle delete stock
    const handleDeleteStock = (id: string) => {
        warningAlert('Yes, Create it!', () => (
            deleteStockMutation({
                variables: {
                    id
                }
            })
        ));
    };



    useEffect(() => {
        // if stock not deleted
        if (error) errorAlert(error.message)

        // if stock deleted
        if (data) successAlert(data?.deleteStockById?.message);
    }, [data, error]);

    return (
        <>
            {stocks?.data?.getStocksWithDetails?.length > 0 ?
                stocks?.data?.getStocksWithDetails.map((stock: AdminStockDetailsType) => (
                    <tr className="text-secondary" onClick={() => openActionMenu ? setOpenActionMenu(false) : null} key={stock._id}>
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
                            <div className="text-sm text-secondary">{stock.description}</div>
                        </td>
                        <td className="p-4 border border-gray-300">
                            <span className={`${stock.status == 'in-stock' ? 'bg-green-200 text-success' : 'bg-red-200 text-danger'}  px-2 rounded-md font-semibold`}>
                                {stock.status}
                            </span>
                        </td>
                        <td className="p-4 border border-gray-300">
                            <span className="bg-green-200 text-success px-2 rounded-md font-semibold">
                                {stock.category.id.name}
                            </span>
                        </td>
                        <td className="p-4 border border-gray-300">৳{stock.price}</td>
                        <td className="p-4 border border-gray-300">
                            <div className="font-semibold">stock / {stock.quantity} pcs</div>
                            <div className="font-semibold">sold / {stock.sellCount} pcs</div>
                        </td>
                        <td className="p-4 border border-gray-300">
                            <div className="relative text-left  flex justify-center">
                                <button
                                    onClick={() => handleActionMenu(stock._id)}
                                    type="button"
                                    className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-secondary focus:outline-none"
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
                                        <DropdownMenuItem  rest="text-secondary" onClick={() => router.push(`/admin/manage-stocks/update-stock?stockId=${stock
                                            ._id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem rest="text-danger" onClick={() => handleDeleteStock(stock._id)}>Delete</DropdownMenuItem>
                                        <DropdownMenuItem  rest="text-secondary" onClick={() => router.push(`/admin/manage-stocks/${stock._id}`)}>Details</DropdownMenuItem>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                :
                [...Array(9)].map((elem, index) => (<StockTableRowShimmerEffects key={index} />))
            }
        </>
    )
}

export default StockItemList