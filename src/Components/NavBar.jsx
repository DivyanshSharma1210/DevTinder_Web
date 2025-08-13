import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Redirect to Error Page...
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl px-6 py-4 flex justify-between items-center text-white">
      {/* Branding and Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-6">
          <p className="hidden md:block text-white text-lg font-medium">
            Hello,{" "}
            <span className="font-bold text-white tracking-wide">
              {user.firstName}
            </span>
          </p>

          <div className="relative group">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white hover:ring-4 hover:ring-opacity-70 transition-all duration-200">
                <img
                  alt="user profile"
                  src={user.photoUrl}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="absolute right-0 mt-2 w-56 p-2 bg-white text-gray-800 rounded-xl shadow-2xl transition-all duration-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transform scale-95 group-hover:scale-100 origin-top-right"
            >
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span>Profile</span>
                    <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <a className="block px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
                  Settings
                </a>
              </li>
              <div className="border-t border-gray-200 my-2"></div>
              <li>
                <a
                  onClick={handleLogout}
                  className="block px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
