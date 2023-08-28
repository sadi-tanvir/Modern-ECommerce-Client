'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const SidebarMenuItems = () => {
    const pathname = usePathname();
    return (
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* <Link href="/admin"> */}
            {/* <li className={`${pathname == '/admin' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}> */}
            {/* <a> */}
            {/* <DashboardIcon /> */}
            {/* Dashboard */}
            {/* </a> */}
            {/* </li> */}
            {/* </Link> */}
            <Link href="/admin/manage-stocks">
                <li className={`${pathname == '/admin/manage-stocks' || pathname == '/admin' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                    <a>
                        Manage Stocks
                    </a>
                </li>
            </Link>
            <Link href="/admin/manage-brands">
                <li className={`${pathname == '/admin/manage-brands' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                    <a>
                        Manage Brands
                    </a>
                </li>
            </Link>
            <Link href="/admin/manage-categories">
                <li className={`${pathname == '/admin/manage-categories' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                    <a>
                        Manage Categories
                    </a>
                </li>
            </Link>
            <Link href="/admin/add-stock">
                <li className={`${pathname == '/admin/add-stock' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                    <a>
                        {/* <AddStockIcon pathname='/admin/add-stock' /> */}
                        Create Stock
                    </a>
                </li>
            </Link>
            {/* <Link href="/admin/add-product">
                        <li className={`${pathname == '/admin/add-product' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <AddProductIcon />
                                Add Product
                            </a>
                        </li>
                    </Link> */}
            <Link href="/admin/add-category">
                <li className={`${pathname == '/admin/add-category' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                    <a>
                        {/* <AddCategoryIcon /> */}
                        Create Category
                    </a>
                </li>
            </Link>
            <Link href="/admin/add-brand">
                <li className={`${pathname == '/admin/add-brand' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                    <a>
                        {/* <AddBrandIcon /> */}
                        Create Brand
                    </a>
                </li>
            </Link>
        </ul>
    )
}

export default SidebarMenuItems