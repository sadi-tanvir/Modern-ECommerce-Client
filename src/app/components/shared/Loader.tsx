import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <svg
                className="animate-spin h-12 w-12 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM13 18C13 18.553 12.553 19 12 19C11.447 19 11 18.553 11 18V13C11 12.447 11.447 12 12 12C12.553 12 13 12.447 13 13V18ZM12 9C11.447 9 11 8.553 11 8C11 7.447 11.447 7 12 7C12.553 7 13 7.447 13 8C13 8.553 12.553 9 12 9Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    )
}

export default Loader