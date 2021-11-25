import { ComponentType } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useSelectorPath } from "../../state/state-update";
import { useToggleNav } from "../../state/modules/nav";
import { useLogout } from "../../state/modules/api/logout";


const useIsActive = () => {
  const router = useRouter();
  return (href: string) => {
    const active = router.pathname === href;
    return active;
  }
}
interface NavItemProps {
  href: string
}
const NavItem: ComponentType<NavItemProps> = (props) => {
  const isActive = useIsActive()
  const active = isActive(props.href);
  return (
    <li className="nav-item">
      <Link href={props.href}><a className={cn("nav-link", { active })}>{props.children}</a></Link>
    </li>
  );
}
const Navigation: ComponentType = () => {
  const toggleNav = useToggleNav();
  const navOpen = useSelectorPath('nav.open');
  return (
    <div className="navbar container-fluid navbar-dark bg-primary">
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link href="/"><div className="navbar-brand ps-3">Tool Starter</div></Link>
      <AuthNav />
      <div className={cn("collapse navbar-collapse", {show: navOpen})} id="navbarToggler">
        <ul className="navbar-nav">
          <NavItem href="/">Profile</NavItem>
          <NavItem href="/">About</NavItem>
        </ul>
      </div>
    </div>
  );
}

const Logout = () => {
  const logout = useLogout();
  return (
    <span
      className={cn("btn btn-link text-light me-1")}
      onClick={logout}
    >
      Logout
    </span>
  );
}

const AuthNav = () => {
  const user = useSelectorPath('api.me.data');
  if (user) {
    return (
      <div className="ms-auto">
        <Logout />
      </div>
    );
  }
  return (
    <div className="ms-auto">
      <Link href="/login"><a className={cn("btn btn-link text-light d-none d-md-inline-block me-1")}>Login</a></Link>
      <Link href="/signup"><a className={cn("btn btn-outline-light")}>Sign Up</a></Link>
    </div>
  )
}

export default Navigation;