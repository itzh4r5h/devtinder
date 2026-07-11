import { Logo } from "../Logo";
import { NavbarMobile } from "./NavbarMobile";
import { NavLinks } from "./NavLinks";


export const Navbar = ({isLoggedIn}) => {

  return (
    <nav className="bg-background border-white/10 border-solid border-t-0 border-b border-l-0 border-r-0 backdrop-blur-md tex-white py-5">
      <div className="container mx-auto flex items-center justify-between h-full px-5">
        <Logo />
        <NavLinks forDrawer={false} isLoggedIn={isLoggedIn}/>
        
        {isLoggedIn && <span className="flex items-center md:hidden">
          <NavbarMobile isLoggedIn={isLoggedIn}/>
        </span>}
      </div>
    </nav>
  );
};
