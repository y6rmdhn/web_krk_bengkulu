import PageHead from "@/components/commons/PageHead";
import React, { type ReactNode } from "react";

interface PropsType {
  title?: string;
  children: ReactNode;
}

const AuthLayouts = (props: PropsType) => {
  const { title, children } = props;

  return (
    <>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container">{children}</section>
    </>
  );
};

export default AuthLayouts;
