'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const SidebarMenuItems = () => {
    const pathname = usePathname();

    // style={{ boxShadow: pathname == '/admin/manage-brands' ? `0 4px 0 0 #35af00` : "" }}

    const adminMenuPath = [
        {
            path: '/admin/manage-brands',
            labelName: "Manage Brands"
        },
        {
            path: '/admin/manage-categories',
            labelName: "Manage Categories"
        },
        {
            path: '/admin/add-stock',
            labelName: "Create Stock"
        },
        {
            path: '/admin/add-category',
            labelName: "Create Category"
        },
        {
            path: '/admin/add-brand',
            labelName: "Create Brand"
        },
    ]

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
                <li className={`${pathname == ('/admin/manage-stocks' || '/admin') ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`} style={{ boxShadow: pathname == '/admin/manage-stocks' ? `0 4px 0 0 #35af00` : "" }}>
                    <a className='hover:text-primary'>
                        Manage Stocks
                    </a>
                </li>
            </Link>

            {
                adminMenuPath.map((elem, index) => (
                    <Link key={index} href={elem.path}>
                        <li
                            className={`${pathname == elem.path ? 'bg-primary rounded-md text-white my-2' : ''} font-semibold`}
                            style={{ boxShadow: pathname == elem.path ? `0 4px 0 0 #35af00` : "" }}
                        >
                            <a>{elem.labelName}</a>
                        </li>
                    </Link>
                ))
            }

        </ul>
    )
}

export default SidebarMenuItems;