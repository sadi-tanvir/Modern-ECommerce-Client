import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';
import { NavItemTypes } from '@/types/shared.types';



const NavItem: React.FC<NavItemTypes> = ({ path, children }) => {
    // navigation
    const pathname = usePathname();
    return (
        <Link href={path}>
            <li className="my-3 py-1 lg:my-0 lg:mr-6">
                <a href="#" className={`${pathname == path ? 'block py-1 px-7 rounded bg-slate-600' : 'block p-1 rounded'} uppercase`}>
                    {children}
                </a>
            </li>
        </Link>
    )
}

export default NavItem;