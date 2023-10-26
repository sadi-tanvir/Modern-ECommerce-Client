import CategoryView from './CategoryView';
import RedirectButton from './RedirectButton';

const CategoryListLayout = () => {
    return (
        <>
            <div className="container mx-auto my-8">
                <div className='grid grid-cols-2 px-3'>
                    <h2 className="sm:text-2xl font-semibold mb-4 text-secondary uppercase">Categories</h2>
                    <RedirectButton />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 sm:px-0 mt-5">
                    <CategoryView />
                </div>
            </div>
        </>
    )
}

export default CategoryListLayout;