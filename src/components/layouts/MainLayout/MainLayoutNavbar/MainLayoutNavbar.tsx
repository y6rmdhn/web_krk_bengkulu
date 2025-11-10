import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";

const MainLayoutNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#2451AB] via-[#2C5AA0] to-[#1E4A9C] text-white shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center relative">
              {/* Logo Container dengan Glass Effect */}
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg">
                <img
                  src="/img/jadi 2.png"
                  alt="KRK Logo"
                  className="w-12 h-12 object-contain transition-transform duration-200 group-hover:scale-110"
                />
                <img
                  src="/img/images 2.png"
                  alt="Bengkulu Logo"
                  className="w-14 h-12 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </div>

              {/* Animated Ping Dot */}
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0 right-0"></div>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight drop-shadow-sm">
                KRK Online
              </span>
              <span className="text-sm font-medium text-white/80 tracking-wide">
                Kota Bengkulu
              </span>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            {/* Login Button */}
            <Button
              asChild
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm rounded-2xl px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg group"
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogIn
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                <span>Login</span>
              </Link>
            </Button>

            {/* Register Button */}
            <Button
              asChild
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg rounded-2xl px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl group"
            >
              <Link to="/register" className="flex items-center gap-2">
                <UserPlus
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                <span>Register</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainLayoutNavbar;
