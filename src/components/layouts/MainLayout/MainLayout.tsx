// components/layouts/MainLayout/MainLayout.tsx
import PageHead from "@/components/commons/PageHead";
import { Fragment, type ReactNode } from "react";
import MainLayoutNavbar from "./MainLayoutNavbar";
import MainLayoutFooter from "./MainLayoutFooter";
import MainLayoutSubHeader from "./MainLayoutSubHeader/MainLayoutSubHeader";
import { cn } from "@/lib/utils";
import session from "@/utils/session";

interface PropsType {
  title: string;
  children: ReactNode;
  isBgGray?: boolean;
  isPaddingY?: boolean;
  isHomepage?: boolean;
}

const MainLayout = (props: PropsType) => {
  const { title, children, isBgGray, isPaddingY, isHomepage } = props;

  const isAuthenticated = session.getSession();

  return (
    <Fragment>
      <PageHead title={title} />
      <MainLayoutNavbar isAuth={isAuthenticated} />
      <MainLayoutSubHeader children={true} isAuth={isAuthenticated} />
      <div
        className={cn("w-full", {
          "bg-gray-100": isBgGray && !isHomepage,
          "py-10": isPaddingY && !isHomepage,
          "bg-transparent": isHomepage,
        })}
      >
        {children}
      </div>
      <MainLayoutFooter />
    </Fragment>
  );
};

export default MainLayout;
