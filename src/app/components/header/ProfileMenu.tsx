import React from 'react'
import Link from "next/link"

const ProfileMenu = () => {
    return (
        <Link href="/profile">
            <div className='mb-3 lg:mb-0'>
                <div className="dropdown dropdown-end lg:ml-10">
                    <label tabIndex={0} className='cursor-pointer flex justify-between items-center'>
                        <span className='mr-2 font-bold'>sadi</span>
                        <div className="avatar">
                            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://img.freepik.com/premium-vector/empty-face-icon-avatar-with-black-hair-vector-illustration_601298-13402.jpg?w=2000" />
                            </div>
                        </div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default ProfileMenu