import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


import Image from 'next/image'

async function Profile() {
    const { user } = await getSession();


    return (
        user && (
            <div className='flex flex-col items-center justify-start h-screen gap-4 mt-10'>
                <div className='flex flex-col gap-2 items-center'>
                    <Image 
                    className='rounded-full'
                    src={user.picture} alt={user.name} width={80} height={80} />
                    <h2 className='text-2xl font-mono'>Hola {user.nickname}!</h2>
                </div>
                 <p className='font-mono text-sm'>Email: {user.email}</p>
            </div>
        )
    )
}

export default withPageAuthRequired(Profile)