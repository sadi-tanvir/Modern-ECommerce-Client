'use client'
import React, { useEffect, useState } from 'react'
import { GET_BRANDS_FOR_ADMIN } from '@/gql/queries/brand.queries'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_BRAND_BY_ID_MUTATION } from '@/gql/mutations/brand.mutations'
import { useRouter } from 'next/navigation'
import { errorAlert, successAlert, warningAlert } from '../alert-functions/alert'
import { ActionIcon } from '../shared/Icon'
import DropdownMenuItem from '../admin/DropdownMenuItem'
import BrandTableRowShimmerEffects from '../Shimmer-Effect/BrandTableRowShimmerEffects'
import { GET_ORDERS_HISTORY_BY_CUSTOMER_ID } from '@/gql/queries/order.queries'
import { useAppSelector } from '@/redux/hooks/hooks'


type BrandTypes = {
    _id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    status: string;
    location: string;
}
type OrderTypes = {
    _id: string;
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
    orderDate: string;
    userId: {
        name: string;
    }
    items: {
        _id: string;
        stockId: string;
        qty: number;
        price: number;
        name: string;
        imageUrl: string;
    }[]
};

const OrdersItemList = () => {

    // state
    const [openActionMenu, setOpenActionMenu] = useState(false)
    const [idForMenuAction, setIdForMenuAction] = useState("")

    // redux
    const { _id } = useAppSelector(state => state.authReducer.ownerInfo);

    // gql
    const orders = useQuery(GET_ORDERS_HISTORY_BY_CUSTOMER_ID, {
        variables: {
            id: _id
        }
    });

    console.log('orders', orders);


    // gql
    const brands = useQuery(GET_BRANDS_FOR_ADMIN);
    const [deleteBrandMutation, { data, loading, error }] = useMutation(DELETE_BRAND_BY_ID_MUTATION, {
        refetchQueries: [GET_BRANDS_FOR_ADMIN],
    });



    // router
    const router = useRouter();



    // handle action menu
    const handleActionMenu = (id: string) => {
        setOpenActionMenu(!openActionMenu)
        setIdForMenuAction(id)
    }


    // handle delete brand
    const handleDeleteBrand = (id: string) => {
        warningAlert('Yes, Create it!', () => (
            deleteBrandMutation({
                variables: {
                    id
                }
            })
        ))
    }

    useEffect(() => {
        // if brand not deleted
        if (error) errorAlert(error.message)

        // if brand deleted
        if (data) successAlert(data?.deleteProductById?.message);
    }, [data, error]);


    return (
        <>
            {orders?.data?.getOrdersByCustomerId?.length > 0 ?
                orders?.data?.getOrdersByCustomerId?.map((order: OrderTypes) => (
                    <tr onClick={() => openActionMenu ? setOpenActionMenu(false) : null} key={order._id} className='text-secondary'>
                        <td className="p-4 border border-gray-300">{order._id}</td>
                        <td className="p-4 border border-gray-300">৳ {order.amount}</td>
                        <td className="p-4 border border-gray-300">
                            <span className={`${order.orderStatus == 'delivered' ? 'bg-green-300 text-green-700' : 'bg-red-200 text-danger'} px-4 py-1 rounded-md font-semibold`}>
                                {order.orderStatus}
                            </span>
                        </td>
                        <td className="p-4 border border-gray-300  text-center">
                            <span className={`${order.paymentStatus == 'paid' ? 'bg-green-300 text-green-700' : 'bg-red-200 text-danger'} px-4 py-1 rounded-md font-semibold`}>
                                {order.paymentStatus}
                            </span>
                        </td>
                        <td className="p-4 border border-gray-300">
                            <div className="relative text-left  flex justify-center">
                                <button
                                    onClick={() => handleActionMenu(order._id)}
                                    type="button"
                                    className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-secondary focus:outline-none"
                                >
                                    <ActionIcon />
                                </button>
                                <div className={`${openActionMenu && (idForMenuAction == order._id) ? "visible" : "hidden"} origin-top-right absolute right-0 z-50 -mt-36 sm:mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        {/* <DropdownMenuItem rest="text-secondary" onClick={() => router.push(`/admin/manage-brands/update-brand?brandId=${order
                                            ._id}`)}>Edit</DropdownMenuItem> */}
                                        {order.paymentStatus === 'paid' || <DropdownMenuItem rest="text-danger" onClick={() => handleDeleteBrand(order._id)}>Delete</DropdownMenuItem>}
                                        {/* <DropdownMenuItem rest="text-secondary" onClick={() => router.push(`/admin/manage-brands/${order._id}`)}>Details</DropdownMenuItem> */}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                :
                [...Array(9)].map((elem, index) => (<BrandTableRowShimmerEffects key={index} />))
            }
        </>
    )
}

export default OrdersItemList