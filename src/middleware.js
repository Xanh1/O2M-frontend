import { NextResponse } from 'next/server';
import { validarToken } from './hooks/service_auth'


export default async function middleware(request) {
    const token = request.cookies.get('token');
    
    if (!token) {
        const url = new URL(request.url);
        url.pathname = '/';
        return NextResponse.redirect(url.toString());
    }

    const validation = await validarToken(token.value);
    
    if (validation.code == 401) {
        const url = new URL(request.url);
        url.pathname = '/session';
        return NextResponse.redirect(url.toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/graphicMonitoring/:path*',
        '/monitoring/:path*',
        '/person/:path*',
        '/sensor/:path*',
    ]
};
