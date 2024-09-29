import { Link } from "react-router-dom";
import LOGO from "/logos/logo_mitic_light.png";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/features/authSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useAppSelector(selectAuth);

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="block lg:hidden text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <ul className="hidden lg:flex gap-8 ml-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-800 hover:text-gray-600 font-semibold"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-800 hover:text-gray-600 font-semibold"
                >
                  Administration
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="flex flex-col items-center justify-center">
                <p>{user?.email && user.email}</p>
                {user?.role === "administrateur" && "Administrateur"}
                {user?.role === "etudiant" && "Etudiant"}
                {user?.role === "enseignant" && "Enseignant"}
              </div>
            )}
            <img src={LOGO} alt="Logo" className="w-auto h-8 object-cover" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
