import StockCategoryLayout from '@/app/components/stock-category/category/StockCategoryLayout';

const StockDisplay = ({ params }: any) => {
    return (
        <div className="bg-gray-100">
            <StockCategoryLayout
                params={params}
            />
        </div>
    );
};

export default StockDisplay;
