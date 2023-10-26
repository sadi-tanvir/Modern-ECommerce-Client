
const ProductDetailsViewShimmerEffect = () => {
    return (
        <div className="w-screen h-screen bg-white">
            <div className="w-full flex justify-center items-cente">
                <div className="animate-pulse px-4 flex gap-5 mt-10 w-2/3">
                    <div className="h-80 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5 mt-4">
                        <div className="h-6 bg-gray-300 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
                            <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ProductDetailsViewShimmerEffect