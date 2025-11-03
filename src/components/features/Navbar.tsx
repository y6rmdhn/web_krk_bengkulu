import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-[#2451AB] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <img src="/img/jadi 2.png" alt="logo" className="w-14 h-14" />
            <img src="/img/images 2.png" alt="logo" className="w-16 h-14" />
          </div>
          <span className="text-lg font-semibold">Kota Bengkulu</span>
        </Link>

        {/* Tombol Login (Tampil di semua ukuran layar) */}
        <Button
          asChild
          className="bg-white text-[#13A110] hover:bg-green-50 font-medium rounded-full"
        >
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </nav>
  );
}
