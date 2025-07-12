import { Link, useLocation } from "@tanstack/react-router";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const LinkRouter = ({ href, children, className }: Props) => {
  const { pathname } = useLocation();

  return (
    <>
      <Link
        className={`font-netflix ${pathname === href ? "text-white font-medium" : "hover:text-white hover:font-medium text-gray-200 font-normal"} ${className}`}
        to={href}
      >
        {children}
      </Link>
    </>
  );
};
