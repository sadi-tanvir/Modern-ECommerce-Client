import React from 'react'
import SidebarMenuItems from './SidebarMenuItems'

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="drawer lg:drawer-open bg-backgroundColor w-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-start bg-white">
                {/* Page content here */}
                {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                {children}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <SidebarMenuItems />
            </div>
        </div >
    )
}

export default AdminDashboardLayout