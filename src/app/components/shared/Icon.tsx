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
            <text x="30" y="80" fontSize="80">৳</text>
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
            <line x1="24" y1="22" x2="24" y2="30" stroke={`${pathname == '/admin/add-stock' ? '#000' : 'currentColor'}`} strokeWidth="2" strokeLinecap="round"></line>
            <line x1="22" y1="26" x2="26" y2="26" stroke={`${pathname == '/admin/add-stock' ? '#000' : 'currentColor'}`} strokeWidth="2" strokeLinecap="round"></line>

            {/* <!-- Product Details --> */}
            <text
                x="24"
                y="42"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
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
            <line x1="24" y1="25" x2="24" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round"></line>
            <line x1="22" y1="27" x2="26" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round"></line>
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
            <line x1="24" y1="28" x2="24" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"></line>
            <line x1="22" y1="30" x2="26" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"></line>
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
            <line x1="24" y1="28" x2="24" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"></line>
            <line x1="22" y1="30" x2="26" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"></line>
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

const PlusIcon = () => {
    return (
        <svg className="text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
    )
}

const MinusIcon = () => {
    return (
        <svg className="text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="15" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
    )
}

const DelIcon = () => {
    return (
        <svg className="text-red-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
    )
}

const DownArrowIcon = () => {
    return (
        <svg
            className="fill-current h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    )
}

const SearchIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8 8 8 0 110 16 8 8 0 01-8-8z" />
            <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l5 5" />
        </svg>
    )
}

const TwitterIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
    )
}

const YouTubeIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
    )
}

const FacebookIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
    )
}

const VerifyIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 text-green-500"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            />
        </svg>
    )
}


export { BdtIcon, AddStockIcon, AddProductIcon, AddCategoryIcon, AddBrandIcon, DashboardIcon, ActionIcon, PlusIcon, MinusIcon, DelIcon, DownArrowIcon, SearchIcon, TwitterIcon, YouTubeIcon, FacebookIcon, VerifyIcon }