import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMainLayoutNavbar from "./useMainLayoutNavbar";

interface PropTypes {
  isAuth: string | null;
}

const MainLayoutNavbar = (props: PropTypes) => {
  const { isAuth } = props;
  const { dataProfile, handleLogout } = useMainLayoutNavbar();

  console.log(dataProfile);

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
          {!isAuth ? (
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
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative cursor-pointer hover:bg-transparent/0 focus-visible:ring-0"
                >
                  <Avatar className="h-10 w-10 border border-white/30">
                    <AvatarImage src={undefined} alt="profil" />
                    <AvatarFallback className="bg-white/20 text-white">
                      user
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {dataProfile?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {dataProfile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Anda bisa tambahkan link ke dashboard di sini */}
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/admin/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard Admin</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainLayoutNavbar;
