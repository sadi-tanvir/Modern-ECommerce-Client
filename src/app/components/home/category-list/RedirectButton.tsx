'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import Button from '../../shared/Button';

const RedirectButton = () => {
    const router = useRouter();
    return (
        <Button buttonClass='ml-auto h-10 md:w-52' color='red' onClick={() => router.push('/stock-category')}>
            view all
        </Button>
    )
}

export default RedirectButton