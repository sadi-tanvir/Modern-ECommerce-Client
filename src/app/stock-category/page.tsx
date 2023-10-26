import CategoryLists from "../components/stock-category/CategoryLists";

const CategoryList = () => {


    return (
        <div className="w-screen min-h-screen bg-backgroundColor">
            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-semibold mb-4 text-secondary">Categories</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 px-2 sm:px-0">
                    <CategoryLists />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;