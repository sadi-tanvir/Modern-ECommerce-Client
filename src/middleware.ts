import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isLogin: any = request.cookies.get('logged')?.value || '';
    const isAdmin: any = request.cookies.get('isAdmin')?.value || '';

    const isPublicPath =
        path === '/login' ||
        path === '/signup';

    const isUserPath =
        path === '/cart' ||
        path === '/profile';

    const isAdminPath =
        path === '/admin' ||
        path === '/admin/manage-stocks' ||
        path === '/admin/manage-brands' ||
        path === '/admin/manage-categories' ||
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
        '/admin/manage-brands',
        '/admin/manage-categories',
        '/admin/add-category',
        '/admin/add-brand',
        '/admin/add-product',
        '/admin/add-stock',
        '/cart',
        '/profile',
        '/login',
        '/signup'
    ],
};