import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isLogin: string = request.cookies.get('logged')?.value || '';
    const isAdmin: string = request.cookies.get('isAdmin')?.value || '';

    const isPublicPath =
        path === '/login' ||
        path === '/signup';

    const isUserPath =
        path === '/cart' ||
        path === '/cart/checkout' ||
        path === '/profile';

    const isAdminPath =
        path === '/admin' ||
        path === '/admin/manage-stocks' ||
        path === '/admin/manage-stocks/update-stock' ||
        path === '/admin/manage-brands' ||
        path === '/admin/manage-brands/update-brand' ||
        path === '/admin/manage-categories' ||
        path === '/admin/manage-categories/update-category' ||
        path === '/admin/manage-orders' ||
        path === '/admin/add-brand' ||
        path === '/admin/add-category' ||
        path === '/admin/add-product' ||
        path === '/admin/add-stock';

    if (isPublicPath && isLogin) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    };

    if (isUserPath && !isLogin) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    };

    if (isAdminPath && !isAdmin) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
};


export const config = {
    matcher: [
        '/admin',
        '/admin/manage-stocks',
        '/admin/manage-stocks/update-stock',
        '/admin/manage-brands',
        '/admin/manage-brands/update-brand',
        '/admin/manage-categories',
        '/admin/manage-categories/update-category',
        '/admin/manage-orders',
        '/admin/add-category',
        '/admin/add-brand',
        '/admin/add-product',
        '/admin/add-stock',
        '/cart',
        '/cart/checkout',
        '/profile',
        '/login',
        '/signup'
    ],
};