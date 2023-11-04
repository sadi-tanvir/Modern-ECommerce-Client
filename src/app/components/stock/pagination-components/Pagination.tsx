'use client'
import React, { useEffect, useState } from 'react'
import { LeftArrowIcon, RightArrowIcon } from '../../shared/Icon'
import PageNumber from './PageNumber'
import LeftIndicatorBtn from './LeftIndicatorBtn'
import RightIndicatorBtn from './RightIndicatorBtn'


interface PaginationPropsType {
    size: number;
    page: number;
    totalStockCount: number;
    setPage: (page: number) => void;
}


const Pagination = ({ size, page, totalStockCount, setPage }: PaginationPropsType) => {


    return (
        <div className="absolute bottom-0 right-0 w-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-6 sm:px-6">
            <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className='mr-10'>
                    <p className="text-sm text-gray-700">Showing
                        <span className="font-medium mx-1">{page == 0 ? page + 1 : (page * size) + 1}</span> to
                        <span className="font-medium mx-1">{page === 0 ? (page + 1) * size : ((page * size) + size) <= totalStockCount ? ((page * size) + size) : totalStockCount} </span> of
                        <span className="font-medium mx-1">{totalStockCount}</span> results
                    </p>
                </div>
                <div className='mt-5 sm:mt-0'>
                    <nav className="rounded-md shadow-sm flex justify-center items-center">
                        <LeftIndicatorBtn>
                            <LeftArrowIcon />
                        </LeftIndicatorBtn>
                        {
                            [...Array(Math.ceil(totalStockCount / size)).keys()].map((elem) => (
                                <PageNumber
                                    key={elem}
                                    onClick={() => setPage(elem)}
                                    activePage={page}
                                    pageNumber={elem}
                                />
                            ))
                        }
                        <RightIndicatorBtn>
                            <RightArrowIcon />
                        </RightIndicatorBtn>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;