import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 w-full md:w-[80%] mx-auto flex justify-around items-center">
      <Link href="/">
        <h2 className="font-bold text-2xl">Next FullStack</h2>
      </Link>
      <ul className="flex gap-8">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
