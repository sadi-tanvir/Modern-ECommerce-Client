import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import NavItem from '../shared/NavItem';
import Button from '../shared/Button';
import CartNav from './CartNav';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
    const [isOpenNav, setIsOpenNav] = useState(false);



    // navbar toggle
    const toggleNavbar = () => {
        setIsOpenNav(!isOpenNav);
    };



    // redux
    const dispatch = useAppDispatch()
    const { isAuthenticate, isAdmin } = useAppSelector(state => state.authReducer);





    // refill redux store from localStorage
    useEffect(() => {
        if (localStorage.getItem('ownerInfo') && localStorage.getItem('accessToken')) {
            dispatch({ type: 'setOwnerInfo', payload: JSON.parse(localStorage.getItem('ownerInfo') as any) })
            dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem('accessToken') as string) })
            dispatch({ type: 'ownerRole', payload: JSON.parse(localStorage.getItem('ownerInfo') as any).role })
            if (JSON.parse(localStorage.getItem('ownerInfo') as any).role === 'admin') dispatch({ type: 'accessAdmin' })
            if (JSON.parse(localStorage.getItem('ownerInfo') as any).role === 'user') dispatch({ type: 'accessUser' })
            dispatch({ type: 'loginUser' })
        }
        if (localStorage.getItem('cart')) {
            dispatch({ type: 'reloadCart', payload: JSON.parse(localStorage.getItem('cart') as any) })
        }
    }, [])

    return (
        <nav className="bg-primary text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <div className="flex items-center flex-col justify-center sm:flex-row">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={100}
                                height={50}
                            />
                            <span className="text-xl font-bold sm:ml-2">Modern Commerce</span>
                        </div>
                    </Link>

                    <button
                        className="lg:hidden"
                        onClick={toggleNavbar}
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpenNav ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>

                    <ul className={`lg:flex ${isOpenNav ? 'block' : 'hidden'}`}>
                        <NavItem path='/'>Home</NavItem>
                        
                        {(isAuthenticate && isAdmin) && <NavItem path='/admin/manage-stocks'>Admin</NavItem>}
                        
                        <NavItem path='/stocks'>Products</NavItem>

                        {isAuthenticate &&
                            <>
                                <CartNav />
                                <ProfileMenu />
                                <Button onClick={() => dispatch({ type: 'logOutUser' })} color='red' buttonClass=" hover:bg-gray-500 lg:ml-7 w-40">
                                    Logout
                                </Button>
                            </>
                        }

                        {isAuthenticate ||
                            <>
                                <NavItem path='/login'>Login</NavItem>
                                <NavItem path='/signup'>Sign Up</NavItem>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;