import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { AddBrandIcon, AddCategoryIcon, AddProductIcon, AddStockIcon, DashboardIcon } from '../shared/Icon';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-start bg-white">
                {/* Page content here */}
                {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                {children}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <Link href="/admin">
                        <li className={`${pathname == '/admin' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <DashboardIcon />
                                Dashboard
                            </a>
                        </li>
                    </Link>
                    <Link href="/admin/manage-stocks">
                        <li className={`${pathname == '/admin/manage-stocks' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <rect x="4" y="7" width="16" height="10" rx="2" ry="2"></rect>
                                    <line x1="12" y1="11" x2="12" y2="15"></line>
                                </svg>
                                Manage Stocks
                            </a>
                        </li>
                    </Link>
                    <Link href="/admin/add-stock">
                        <li className={`${pathname == '/admin/add-stock' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <AddStockIcon pathname='/admin/add-stock' />
                                Add Stock
                            </a>
                        </li>
                    </Link>
                    <Link href="/admin/add-product">
                        <li className={`${pathname == '/admin/add-product' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <AddProductIcon />
                                Add Product
                            </a>
                        </li>
                    </Link>
                    <Link href="/admin/add-category">
                        <li className={`${pathname == '/admin/add-category' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <AddCategoryIcon />
                                Add Category
                            </a>
                        </li>
                    </Link>
                    <Link href="/admin/add-brand">
                        <li className={`${pathname == '/admin/add-brand' ? 'bg-red-500 rounded-md text-white my-2' : ''}`}>
                            <a>
                                <AddBrandIcon />
                                Add Brand
                            </a>
                        </li>
                    </Link>
                </ul>
            </div>
        </div >
    )
}

export default AdminDashboardLayout