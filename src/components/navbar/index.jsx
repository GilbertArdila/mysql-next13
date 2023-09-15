'use client'
import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"

const Navbar = () => {
    //auth0
    const { user, error, isLoading } = useUser();
    
    
    return (
        <nav className="w-full h-16 p-4 flex justify-between items-center border-2 border-white">
            <ul className="flex justify-between items-center">
                <li className="ml-0 mr-2 sm:ml-4 sm:mr-7">
                    <Link href="/" legacyBehavior>
                        <a>Home</a>
                    </Link>
                </li>
                {user && (
                    <li>
                    <Link href="/new" legacyBehavior>
                        <a>New Product</a>
                    </Link>
                </li>

                )}
                
            </ul>
            <ul className="flex items-center ">
                <li>
                    <Link href="/about" legacyBehavior>
                        <a>About us</a>
                    </Link>
                </li>
                {!user ? (
                    <>
                    <li className="ml-2 mr-2 sm:ml-4 sm:mr-7">
                        <a href="/api/auth/login">Login</a>
                    </li>
                    
                </>
                ) : (
                    <>
                    <li className="ml-2 mr-2 sm:ml-4 sm:mr-7">
                        <a href="/api/auth/logout">Logout</a>
                    </li>
                    <li>
                    <Link href="/profile" legacyBehavior>
                        <a>Profile</a>
                    </Link>
                    </li>
                    <li className="mr-0 sm:mr-4 ml-2 sm:ml-7">
                    <span >
                        <img
                        className="w-10 h-10 sm:w-14 sm:h-14 rounded-full"
                            src={user.picture} alt={user.name} />
                    </span>
                </li>
                    </>
                )}
                
                
            </ul>
        </nav>
    )
}

export default Navbar