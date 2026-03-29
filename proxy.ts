export { default } from "next-auth/middleware"

export function proxy() {
    
}

export const config = {
    matcher: [
        '/api/:path*'
    ]
}