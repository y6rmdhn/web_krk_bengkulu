import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#2451AB] text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex">
              <img src="/img/jadi 2.png" alt="" className="w-20 h-20" />
              <img src="/img/images 2.png" alt="" className="w-25 h-20" />
            </div>
            <span className="text-xl font-bold">Kota Bengkulu</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="bg-white text-[#13A110] px-4 py-2 font-medium hover:bg-green-50 transition-colors rounded-full"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
