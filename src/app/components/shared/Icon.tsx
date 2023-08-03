const BdtIcon = ({ color }: { color: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="20"
            height="20"
            fill={color}
            className="line-through"
        >
            <text x="30" y="80" font-size="80">৳</text>
        </svg>
    )
}

const AddStockIcon = ({ pathname }: { pathname: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="#F5F5F5"
        >
            {/* <!-- Box Base --> */}
            <rect x="8" y="14" width="32" height="20" rx="4" ry="4" fill="#E0E0E0"></rect>

            {/* <!-- Box Details --> */}
            <rect x="12" y="18" width="24" height="6" rx="2" ry="2" ></rect>
            <rect x="12" y="26" width="16" height="6" rx="2" ry="2" ></rect>

            {/* <!-- Plus Sign --> */}
            <line x1="24" y1="22" x2="24" y2="30" stroke={`${pathname == '/admin/add-stock' ? '#000' : 'currentColor'}`} stroke-width="2" stroke-linecap="round"></line>
            <line x1="22" y1="26" x2="26" y2="26" stroke={`${pathname == '/admin/add-stock' ? '#000' : 'currentColor'}`} stroke-width="2" stroke-linecap="round"></line>

            {/* <!-- Product Details --> */}
            <text
                x="24"
                y="42"
                text-anchor="middle"
                font-size="12"
                font-weight="bold"
                fill="currentColor"
            >
                stock
            </text>
        </svg>
    )
}

const AddProductIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="none"
        >
            {/* <!-- Product Base --> */}
            <rect x="12" y="8" width="24" height="32" rx="6" ry="6" fill="#E0E0E0"></rect>

            {/* <!-- Product Screen --> */}
            <rect x="14" y="12" width="20" height="24" rx="2" ry="2" fill="#FFFDE7"></rect>

            {/* <!-- Product Stand --> */}
            <rect x="22" y="36" width="4" height="4" rx="1" ry="1" fill="#E0E0E0"></rect>

            {/* <!-- Camera Lens --> */}
            <circle cx="24" cy="33" r="2" fill="black"></circle>

            {/* <!-- Plus Sign --> */}
            <line x1="24" y1="25" x2="24" y2="29" stroke="white" stroke-width="2" stroke-linecap="round"></line>
            <line x1="22" y1="27" x2="26" y2="27" stroke="white" stroke-width="2" stroke-linecap="round"></line>
        </svg>

    )
}

const AddCategoryIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="#E0E0E0"
        >
            {/* <!-- Category Base --> */}
            <rect x="8" y="12" width="32" height="24" rx="6" ry="6" fill="#E0E0E0"></rect>

            {/* <!-- Category Symbol --> */}
            <rect x="18" y="16" width="12" height="12" rx="2" ry="2" fill="#9E9E9E"></rect>
            <rect x="16" y="18" width="12" height="12" rx="2" ry="2" fill="#FFF"></rect>
            <rect x="20" y="20" width="8" height="8" rx="1" ry="1" fill="#9E9E9E"></rect>

            {/* <!-- Plus Sign --> */}
            <line x1="24" y1="28" x2="24" y2="32" stroke="white" stroke-width="2" stroke-linecap="round"></line>
            <line x1="22" y1="30" x2="26" y2="30" stroke="white" stroke-width="2" stroke-linecap="round"></line>
        </svg>

    )
}

const AddBrandIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="#E0E0E0"
        >
            {/* <!-- Brand Base --> */}
            <rect x="8" y="12" width="32" height="24" rx="6" ry="6" fill="#E0E0E0"></rect>

            {/* <!-- Brand Symbol --> */}
            <circle cx="24" cy="26" r="10" fill="#9E9E9E"></circle>

            {/* <!-- Plus Sign --> */}
            <line x1="24" y1="28" x2="24" y2="32" stroke="white" stroke-width="2" stroke-linecap="round"></line>
            <line x1="22" y1="30" x2="26" y2="30" stroke="white" stroke-width="2" stroke-linecap="round"></line>
        </svg>
    )
}


const DashboardIcon = () => {
    return (
        <svg className='ml-3' fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" /></svg>
    )
}

const ActionIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
        >
            <path
                fillRule="evenodd"
                d="M5 8a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H6a1 1 0 01-1-1V8zm7-7a2 2 0 00-2 2v1h-1V3a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V3zM8 0a2 2 0 100 4 2 2 0 000-4z"
                clipRule="evenodd"
            />
        </svg>
    )
}


export { BdtIcon, AddStockIcon, AddProductIcon, AddCategoryIcon, AddBrandIcon, DashboardIcon, ActionIcon }