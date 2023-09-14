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
        domains: ['static.vecteezy.com','res.cloudinary.com'],
    },
}

module.exports = nextConfig
