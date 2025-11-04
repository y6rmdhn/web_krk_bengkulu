import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
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
}

const AdminLayoutSidebar = (props: PropsType) => {
  const { isOpen, sidebarItems = [] } = props;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cn(
        "border-default-200 fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      <div className="w-full">
        <div className="flex w-full justify-center items-center mb-8 gap-4">
          <img
            src="/img/icon/Container.png"
            alt="logo"
            width={30}
            height={30}
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          <p className="text-lg font-bold">KRK Online</p>
        </div>

        {/* Menu List */}
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href);

            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "flex justify-start items-center w-full h-12 px-4 rounded-lg transition-all duration-200",
                  {
                    "bg-[#006DE6] text-white hover:bg-[#0056b3]": isActive,
                    "text-gray-700 hover:bg-gray-100": !isActive,
                  }
                )}
                onClick={() => navigate(item.href)}
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

      <div className="flex items-center p-1">
        <Button
          color="primary"
          variant="outline"
          className="flex justify-start items-center rounded-lg w-full text-gray-700 hover:bg-gray-100 border-red-500"
          size="lg"
        >
          <CiLogout className="text-lg mr-3 text-red-500" />
          <span className="text-sm font-medium text-red-500">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminLayoutSidebar;
