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
}

const MainLayout = (props: PropsType) => {
  const { title, children, isBgGray, isPaddingY } = props;

  const isAuthenticated = session.getSession();

  return (
    <Fragment>
      <PageHead title={title} />
      <MainLayoutNavbar isAuth={isAuthenticated} />
      <MainLayoutSubHeader children={true} isAuth={isAuthenticated} />
      <div
        className={cn("3xl:container max-w-screen", {
          "bg-gray-100": isBgGray,
          "py-10": isPaddingY,
        })}
      >
        {children}
      </div>
      <MainLayoutFooter />
    </Fragment>
  );
};

export default MainLayout;
