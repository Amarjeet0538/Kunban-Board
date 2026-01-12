import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="mb-4 px-6 py-4 flex justify-between items-center">
      <h1 className="text-5xl font-bold">KOKUYO</h1>

      {user ? (
        <div className="flex items-center gap-3 relative group cursor-pointer">
          <User size={40} className="text-white bg-cyan-600 rounded-full m-1 p-2"/>
          <button className="text-gray-700 font-medium text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {user.firstName}
          </button>
          {isOpen &&
            <div className="absolute top-full right-0 z-20 w-40 text-center p-5 border border-gray-300 rounded-md bg-white text-black mt-2 shadow-lg">
              <p onClick={() => {navigate('/profile')}}
                  className='cursor-pointer text-m'>
                  My Account
              </p>
              <hr className='my-2 border-t border-black'/>
              <button
                onClick={handleLogout}
                className=" py-2 px-1 w-full  hover:bg-red-500 hover:text-white rounded-md  text-md cursor-pointer"
              >
                Logout
              </button>
          </div>
          }

        </div>
      ) : (
        <Link
          to="/login"
          className="border border-gray-300 py-2 px-4 rounded-md bg-violet-400 text-white hover:bg-violet-500 text-2xl"
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Header;
