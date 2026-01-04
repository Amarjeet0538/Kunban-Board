import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="mb-4 px-4 py-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Project Name</h1>

      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            {user.firstName}
          </span>

          <button
            onClick={handleLogout}
            className="border border-gray-300 py-1 px-3 rounded-md bg-violet-400 text-white hover:bg-violet-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="border border-gray-300 py-1 px-3 rounded-md bg-violet-400 text-white hover:bg-violet-500"
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Header;
