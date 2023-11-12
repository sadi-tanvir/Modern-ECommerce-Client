import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks/hooks';
import NavItem from '../shared/NavItem';

const ProfileMenu = () => {
    // navigation
    const pathname = usePathname();

    // redux
    const { name, image } = useAppSelector(state => state.authReducer.ownerInfo);

    return (
        <div className='mb-3 lg:mb-0'>
            <div className="dropdown dropdown-end ml-1 lg:ml-10">
                <label tabIndex={0} className='cursor-pointer flex justify-between items-center'>
                    <div className="avatar">
                        <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/profile-pic/${image}`} />
                        </div>
                    </div>
                    <span className='ml-2 font-bold'>{name.split(" ")[name.split(" ").length - 1]}</span>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 mt-5  bg-backgroundColor">
                    <Link href='/profile'>
                        <li className={`${pathname == '/profile' ? 'bg-primary rounded-lg text-white font-bold' : 'text-secondary font-semibold'} text-center`}><a>Profile</a></li>
                    </Link>
                    <Link href='/orders-history'>
                        <li className={`${pathname == '/orders-history' ? 'bg-primary rounded-lg' : 'text-secondary font-semibold'} text-center`}><a>Order History</a></li>
                    </Link>
                    {/* <li><a className='text-secondary'>Setting</a></li> */}
                </ul>
            </div>
        </div>
    )
}

export default ProfileMenu