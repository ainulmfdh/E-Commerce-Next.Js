/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yzrwhszehhfyduuuemnv.supabase.co'
            }
        ]
    }
};

export default nextConfig;
