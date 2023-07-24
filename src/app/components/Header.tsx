import Image from 'next/image'
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
                        <Link href={{ pathname: '/about' }}>About</Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/contact' }}>Contact</Link>
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
