import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { LinkRouter } from "../ui/Link";
import logo from "/logo/logo.png";

export const Header = () => {
  return (
    <div className="flex absolute z-50 gap-10">
      <div>
        <img className="w-52" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-between gap-5">
        <LinkRouter href={DASHBOARD_PAGES.HOME}>Home</LinkRouter>
        <LinkRouter href={DASHBOARD_PAGES.ABOUT}>About</LinkRouter>
      </div>
    </div>
  );
};
