import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl font-semibold text-gray-600 mb-2">Oops! Page not found</p>
            <p className="text-lg text-gray-600 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
            <Link
                href="/"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
                Go back to the homepage
            </Link>
        </div>
    );
};
export default NotFoundPage;