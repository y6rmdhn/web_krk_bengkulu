import { type ReactNode } from "react";
import PageHead from "../features/PageHead";

interface PropsType {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropsType) => {
  const { children, title } = props;

  return (
    <>
      <PageHead title={title} />
      <section className="max-w-container p-6 relative">{children}</section>
    </>
  );
};

export default AuthLayout;
