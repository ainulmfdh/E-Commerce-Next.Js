/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qvzpinidezxniaijfmel.supabase.co'
            }
        ]
    }
};

export default nextConfig;
