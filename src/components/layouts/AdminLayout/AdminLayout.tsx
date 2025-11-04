import PageHead from "@/components/commons/PageHead";
import { useState, type ReactNode } from "react";
import AdminLayoutSidebar from "./AdminLayoutSidebar";
import { SIDEBAR_ADMIN } from "./AdminLayout.constan";

interface PropsType {
  title?: string;
  children: ReactNode;
  type?: string;
  desc?: string;
}

const AdminLayout = (props: PropsType) => {
  const { title, desc, children } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <AdminLayoutSidebar isOpen={open} sidebarItems={SIDEBAR_ADMIN} />
        <div className="h-screen w-full overflow-y-auto p-8 bg-gray-50">
          {/* <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar> */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">{desc}</h1>
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-semibold">Admin</h3>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
