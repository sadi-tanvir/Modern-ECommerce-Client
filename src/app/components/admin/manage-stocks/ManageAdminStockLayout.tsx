'use client'
import React, { useEffect, useState } from 'react';
import Pagination from '../../shared/pagination-components/Pagination';
import StockItemList from './StockItemList';

const ManageAdminStockLayout = () => {
    // pagination states
    const [totalStockCount, setTotalStockCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(5);



    // Handle Decrease Pagination
    const handleDecreasePagination = () => {
        if (page > 0) {
            setPage(page - 1);
        } else {
            setPage(Math.floor(totalStockCount / size));
        };
    };



    // Handle Increase Pagination
    const handleIncreasePagination = () => {
        if ((Math.floor(totalStockCount / size)) > page) {
            setPage(page + 1);
        } else {
            setPage(0);
        };
    };


    // get all stock count
    useEffect(() => {
        const fetchTotalStockCount = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/products-count`);
            const data = await response.json();
            setTotalStockCount(data.totalDocuments);
        };
        fetchTotalStockCount();
    }, [size]);

    return (
        <>
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
                    <StockItemList
                        size={size}
                        page={page}
                        setPage={setPage}
                    />
                </tbody>
            </table>

            {/* pagination */}
            <Pagination
                size={size}
                page={page}
                totalStockCount={totalStockCount}
                setPage={setPage}
                handleDecreasePagination={handleDecreasePagination}
                handleIncreasePagination={handleIncreasePagination}
                positionOfPagination='right-0'
            />
        </>
    );
};

export default ManageAdminStockLayout;