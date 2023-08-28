import React from 'react';
import RedirectButton from './RedirectButton';
import ProductView from './ProductView';


const FeaturedProductsLayout = () => {
    return (
        <>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto">
                    <div className='grid grid-cols-2 px-3'>
                        <h2 className="sm:text-2xl font-semibold mb-4 text-secondary">Featured Products - Just for you</h2>
                        <RedirectButton />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <ProductView />
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturedProductsLayout;