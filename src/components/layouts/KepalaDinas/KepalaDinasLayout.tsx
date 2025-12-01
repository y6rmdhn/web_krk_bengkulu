import PageHead from "@/components/commons/PageHead";
import { useState, type ReactNode } from "react";
import KepalaDinasLayoutSidebar from "./KepalaDinasLayoutSidebar";
import { SIDEBAR_ADMIN } from "./KepalaDinasLayout.constan";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface PropsType {
  title?: string;
  children: ReactNode;
  type?: string;
  desc?: string;
}

const KepalaDinasLayout = (props: PropsType) => {
  const { title, desc, children } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar Component */}
        <KepalaDinasLayoutSidebar
          isOpen={open}
          onClose={() => setOpen(false)}
          sidebarItems={SIDEBAR_ADMIN}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
          {/* Header Section (Mobile & Desktop) */}
          <header className="flex-shrink-0 px-4 py-4 md:px-8 bg-white border-b border-gray-200 lg:bg-transparent lg:border-none">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Tombol Hamburger (Mobile Only) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden -ml-2 text-gray-600"
                  onClick={() => setOpen(true)}
                >
                  <Menu size={24} />
                </Button>

                <h1 className="text-xl md:text-2xl font-semibold text-gray-800 truncate max-w-[200px] md:max-w-none">
                  {desc}
                </h1>
              </div>

              {/* Profile Info */}
              {/* <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <h3 className="text-sm font-bold text-gray-800">
                    Kepala Dinas
                  </h3>
                  <p className="text-xs text-gray-500">Role Kepala Dinas</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
                  KD
                </div>
              </div> */}
            </div>
          </header>

          {/* Scrollable Content Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default KepalaDinasLayout;
