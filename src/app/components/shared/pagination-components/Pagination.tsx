'use client'
import React, { Component } from 'react'
import { LeftArrowIcon, RightArrowIcon } from '../Icon'
import PageNumber from './PageNumber'
import LeftIndicatorBtn from './LeftIndicatorBtn'
import RightIndicatorBtn from './RightIndicatorBtn'
import SummeryOfPageContent from './SummeryOfPageContent'

interface PaginationPropsType {
    size: number;
    page: number;
    totalStockCount: number;
    setPage: (page: number) => void;
    handleDecreasePagination: () => void;
    handleIncreasePagination: () => void;
    positionOfPagination: string;
};

export default class Pagination extends Component<PaginationPropsType> {
    constructor(props: PaginationPropsType) {
        super(props);
    };


    render() {
        const { size, page, totalStockCount, setPage, handleDecreasePagination, handleIncreasePagination, positionOfPagination } = this.props;
        return (
            <div className={`overflow-auto absolute ${positionOfPagination} w-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-6 sm:px-6`}>
                <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    {/* summery of page content */}
                    <SummeryOfPageContent
                        page={page}
                        size={size}
                        totalStockCount={totalStockCount}
                    />
                    <div className='mt-5 sm:mt-0'>
                        <nav className="rounded-md shadow-sm flex justify-center items-center">
                            {/* page number decreasing button */}
                            <LeftIndicatorBtn handleDecreasePagination={handleDecreasePagination}>
                                <LeftArrowIcon />
                            </LeftIndicatorBtn>

                            {
                                // displaying all the page numbers
                                [...Array(Math.ceil(totalStockCount / size)).keys()].map((elem) => (
                                    <PageNumber
                                        key={elem}
                                        onClick={() => setPage(elem)}
                                        activePage={page}
                                        pageNumber={elem}
                                    />
                                ))
                            }

                            {/* page number increasing button */}
                            <RightIndicatorBtn handleIncreasePagination={handleIncreasePagination}>
                                <RightArrowIcon />
                            </RightIndicatorBtn>
                        </nav>
                    </div>
                </div>
            </div>
        );
    };
};
