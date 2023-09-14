import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full h-16 p-4 flex justify-between items-center border-2 border-white">
        <ul className="flex justify-between items-center">
            <li className="ml-0 mr-2 sm:ml-4 sm:mr-7">
                <Link href="/" legacyBehavior>
                <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/new" legacyBehavior>
                <a>New Product</a>
                </Link>
            </li>

        </ul>
        <ul className="flex items-center ">
            <li>
                <Link href="/about" legacyBehavior>
                <a>About us</a>
                </Link>
            </li>
            <li className="mr-0 sm:mr-4 ml-2 sm:ml-7">
                <span >
                    <img
                    className="w-8 h-8 sm:w-12 sm:h-12"
                    src="https://static.vecteezy.com/system/resources/previews/010/054/157/non_2x/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg" alt="imagen boot" />
                </span>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar