import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import NavItem from './shared/NavItem';
import Button from './shared/Button';

const Navbar = () => {
    const [isOpenNav, setIsOpenNav] = useState(false);

    const toggleNavbar = () => {
        setIsOpenNav(!isOpenNav);
    };

    // navigation
    const pathname = usePathname();

    // redux
    const dispatch = useAppDispatch()
    const { isAuthenticate, isAdmin } = useAppSelector(state => state.authReducer);

    // refill redux store from localStorage
    useEffect(() => {
        if (localStorage.getItem('userInfo') && localStorage.getItem('accessToken')) {
            dispatch({ type: 'setUserInfo', payload: JSON.parse(localStorage.getItem('userInfo') as any) })
            dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem('accessToken') as string) })
            dispatch({ type: 'userRole', payload: JSON.parse(localStorage.getItem('userInfo') as any).role })
            if (JSON.parse(localStorage.getItem('userInfo') as any).role === 'admin') dispatch({ type: 'accessAdmin' })
            if (JSON.parse(localStorage.getItem('userInfo') as any).role === 'user') dispatch({ type: 'accessUser' })
            dispatch({ type: 'loginUser' })
        }
        // if (localStorage.getItem('cart')) {
        //     dispatch({ type: 'reloadCart', payload: JSON.parse(localStorage.getItem('cart') as any) })
        // }
    }, [])

    return (
        <nav className="bg-blue-500 text-white py-4">
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
                        {
                            isAuthenticate ?
                                <>
                                    <NavItem path='/'>Home</NavItem>
                                    <Button onClick={() => dispatch({ type: 'logOutUser' })} color='red' buttonClass="px-8 py-1 hover:bg-gray-500">Logout</Button>
                                </>
                                :
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



/* import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <div className="navbar bg-base-100 h-[0px]">
            <div className="flex-1">
                <Link href={{ pathname: '/' }}>
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </Link>
            </div>
            <div className="flex-none">
                <div>
                    <input type="text" placeholder="search here" className="input input-bordered input-sm w-full max-w-xs border border-1 border-gray-500" />
                </div>
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href={{ pathname: '/signup' }}>Sign Up</Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/login' }}>Login</Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/posts' }}>Posts</Link>
                    </li>
                    <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}
 */