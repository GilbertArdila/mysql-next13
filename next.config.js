/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/products',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['static.vecteezy.com'],
    },
}

module.exports = nextConfig
