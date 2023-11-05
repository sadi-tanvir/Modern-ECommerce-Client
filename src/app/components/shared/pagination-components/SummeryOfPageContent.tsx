import React, { Component } from 'react'

interface SummeryOfPageContentTypes {
    page: number;
    size: number;
    totalStockCount: number;
}


export default class SummeryOfPageContent extends Component<SummeryOfPageContentTypes>{
    constructor(props: SummeryOfPageContentTypes) {
        super(props);
    };

    render() {
        const { page, size, totalStockCount } = this.props;
        return (
            <div className='mr-10'>
                <p className="text-sm text-gray-700">Showing
                    <span className="font-medium mx-1">{page == 0 ? page + 1 : (page * size) + 1}</span> to
                    <span className="font-medium mx-1">{page === 0 ? (page + 1) * size : ((page * size) + size) <= totalStockCount ? ((page * size) + size) : totalStockCount} </span> of
                    <span className="font-medium mx-1">{totalStockCount}</span> results
                </p>
            </div>
        );
    };
};
