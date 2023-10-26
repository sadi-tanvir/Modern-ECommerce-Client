'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const SidebarMenuItems = () => {
    const pathname = usePathname();
    return (
        <ul className="menu p-4 w-80 h-full bg-accent text-secondary">
            {/* <Link href="/admin"> */}
            {/* <li className={`${pathname == '/admin' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}> */}
            {/* <a> */}
            {/* <DashboardIcon /> */}
            {/* Dashboard */}
            {/* </a> */}
            {/* </li> */}
            {/* </Link> */}
            <Link href="/admin/manage-stocks">
                <li className={`${pathname == '/admin/manage-stocks' || pathname == '/admin' ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}>
                    <a>
                        Manage Stocks
                    </a>
                </li>
            </Link>
            <Link href="/admin/manage-brands">
                <li className={`${pathname == '/admin/manage-brands' ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}>
                    <a>
                        Manage Brands
                    </a>
                </li>
            </Link>
            <Link href="/admin/manage-categories">
                <li className={`${pathname == '/admin/manage-categories' ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}>
                    <a>
                        Manage Categories
                    </a>
                </li>
            </Link>
            <Link href="/admin/add-stock">
                <li className={`${pathname == '/admin/add-stock' ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}>
                    <a>
                        {/* <AddStockIcon pathname='/admin/add-stock' /> */}
                        Create Stock
                    </a>
                </li>
            </Link>
            {/* <Link href="/admin/add-product">
                        <li className={`${pathname == '/admin/add-product' ? 'bg-primary rounded-md text-white my-2' : ''}`}>
                            <a>
                                <AddProductIcon />
                                Add Product
                            </a>
                        </li>
                    </Link> */}
            <Link href="/admin/add-category">
                <li className={`${pathname == '/admin/add-category' ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}>
                    <a>
                        {/* <AddCategoryIcon /> */}
                        Create Category
                    </a>
                </li>
            </Link>
            <Link href="/admin/add-brand">
                <li className={`${pathname == '/admin/add-brand' ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}>
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