import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const LinkRouter = ({ href, children, className }: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname, href);
  }, [pathname]);

  return (
    <>
      <Link
        className={`font-netflix-regular ${pathname === href ? "text-white font-medium" : "hover:text-white hover:font-medium text-gray-200 font-normal"} ${className}`}
        to={href}
      >
        {children}
      </Link>
    </>
  );
};
