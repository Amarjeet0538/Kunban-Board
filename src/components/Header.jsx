import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

function Header() {
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
        <div className="flex items-center gap-3">
          <User size={30}/>
          <span className="text-gray-700 font-medium text-3xl">
            {user.firstName}
          </span>

          <button
            onClick={handleLogout}
            className="border border-gray-300 py-2 px-4 rounded-md bg-violet-400 text-white hover:bg-violet-500 text-2xl"
          >
            Logout
          </button>
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
