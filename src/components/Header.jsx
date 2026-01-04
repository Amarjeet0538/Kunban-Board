import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="mb-4 px-4 py-2 flex justify-between">
      <h1 className="text-2xl font-bold ">Project Name</h1>


      
      <Link className="border border-gray-300 py-1 px-2 rounded-md hover: bg-violet-400 text-white"
      to={"/login"}
      > Login</Link>



    </div>
  )
}

export default Header