import { Logo } from "../Logo";
import { NavbarMobile } from "./NavbarMobile";
import { NavLinks } from "./NavLinks";


export const Navbar = ({isLoggedIn,isconnectionsPage=false}) => {

  return (
    <nav className={`${isconnectionsPage ? 'bg-card rounded-xl':'bg-background'} border-white/10 border-solid border-t-0 border-b border-l-0 border-r-0 backdrop-blur-md tex-white py-5`}>
      <div className="container mx-auto flex items-center justify-between h-full px-5">
        {isconnectionsPage && <NavbarMobile isLoggedIn={isLoggedIn} direction="left"/>}

        <Logo />
        {!isconnectionsPage && <NavLinks forDrawer={false} isLoggedIn={isLoggedIn}/>}
        
        {!isconnectionsPage && isLoggedIn && <span className="flex items-center md:hidden">
          <NavbarMobile isLoggedIn={isLoggedIn}/>
        </span>}
      </div>
    </nav>
  );
};
