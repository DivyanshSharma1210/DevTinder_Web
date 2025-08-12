import { useSelector ,useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios"
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
     
  const handleLogout=async()=>{
 
    try
    {
        await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
        dispatch(removeUser());
       return navigate("/login");


    }
    catch(err)
    {
      // Redirect to Error Page...
      console.error(err)
    }
  }

  return (
    <>
      <div className="navbar bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg px-6">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform">
            DevTinder
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-white text-lg font-medium">
              Welcome,{" "}
              <span className="font-semibold">{user.firstName}</span>
            </p>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-4 hover:ring-white/50 transition-all"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
                  <img
                    alt="user"
                    src={user.photoUrl}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-lg shadow-xl mt-3 w-52 p-2 border border-gray-200"
              >
                <li>
                  <Link to="/profile" className="justify-between hover:bg-gray-100 rounded-md">
                    Profile
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <a className="hover:bg-gray-100 rounded-md">Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}className="hover:bg-gray-100 rounded-md">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
