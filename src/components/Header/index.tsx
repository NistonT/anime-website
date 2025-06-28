import { Link } from "@tanstack/react-router";
import logo from "/logo/logo.png";

export const Header = () => {
  return (
    <div className="flex absolute z-50">
      <div>
        <img className="w-52" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-between">
        <Link className="font-netflix-regular" to="/">
          Home
        </Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

{
  /* <div className='p-2 flex gap-2'>
				<Link to='/' className='[&.active]:font-bold'>
					Home
				</Link>{" "}
				<Link to='/about' className='[&.active]:font-bold'>
					About
				</Link>
			</div> */
}
