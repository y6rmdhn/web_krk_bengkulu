import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { X } from "lucide-react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropsType {
  sidebarItems?: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
}

const AdminLayoutSidebar = (props: PropsType) => {
  const { isOpen, sidebarItems = [], onClose } = props;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          {
            "opacity-100 visible": isOpen,
            "opacity-0 invisible": !isOpen,
          }
        )}
        onClick={onClose}
      />

      {/* --- Sidebar Container --- */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen w-[280px] flex-col justify-between border-r bg-white px-4 py-6 transition-transform duration-300 ease-in-out lg:static lg:w-[300px] lg:translate-x-0",
          {
            "translate-x-0 shadow-xl": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        {/* Header Sidebar */}
        <div className="w-full relative">
          {/* Tombol Close (Mobile Only) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-2 -top-2 lg:hidden text-gray-500"
            onClick={onClose}
          >
            <X size={20} />
          </Button>

          <div className="flex w-full justify-center items-center mb-8 gap-3 mt-2 lg:mt-0">
            <img
              src="/img/icon/Container.png"
              alt="logo"
              className="w-8 h-8 cursor-pointer object-contain"
              onClick={() => {
                navigate("/");
                onClose();
              }}
            />
            <p className="text-lg font-bold text-gray-800">Admin Panel</p>
          </div>

          {/* Menu List */}
          <div className="space-y-1.5">
            {sidebarItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/" && location.pathname.startsWith(item.href));

              return (
                <Button
                  key={item.key}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "flex justify-start items-center w-full h-11 px-4 rounded-lg transition-all duration-200",
                    {
                      "bg-[#006DE6] text-white hover:bg-[#0056b3] shadow-md shadow-blue-200":
                        isActive,
                      "text-gray-600 hover:bg-gray-100 hover:text-gray-900":
                        !isActive,
                    }
                  )}
                  onClick={() => {
                    navigate(item.href);
                    onClose();
                  }}
                >
                  <span
                    className={cn("text-lg mr-3", {
                      "text-white": isActive,
                      "text-gray-500": !isActive,
                    })}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Footer Sidebar (Logout) */}
        <div className="flex items-center pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="flex justify-start items-center w-full h-11 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
            onClick={() => {
              console.log("Logout clicked");
            }}
          >
            <CiLogout className="text-lg mr-3" />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminLayoutSidebar;
