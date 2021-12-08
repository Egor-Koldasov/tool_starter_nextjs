import { ComponentType } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useSelectorPath } from "../../state/useSelector";
import { useToggleNav } from "../../state/modules/nav";
import { useLogout } from "../../state/modules/api/logout";
import styled from "styled-components";

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

export const NavigationStyled = styled.div`

`

export type NavigationProps = {
  className?: string
}
const Navigation = (props: NavigationProps) => {
  const toggleNav = useToggleNav();
  const navOpen = useSelectorPath('nav.open');
  return (
    <NavigationStyled className={cn("navbar container-fluid navbar-dark bg-primary navbar-expand-lg", props.className)}>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link href="/"><a className="navbar-brand ps-3">Tool Starter</a></Link>
      <AuthNav />
      <div className={cn("collapse navbar-collapse", {show: navOpen})} id="navbarToggler">
        <ul className="navbar-nav">
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/">About</NavItem>
        </ul>
      </div>
    </NavigationStyled>
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
      <div className="ms-auto order-lg-1">
        <Logout />
      </div>
    );
  }
  return (
    <div className="ms-auto order-lg-1">
      <Link href="/login"><a className={cn("btn btn-link text-light d-none d-md-inline-block me-1")}>Login</a></Link>
      <Link href="/signup"><a className={cn("btn btn-outline-light")}>Sign Up</a></Link>
    </div>
  )
}

export default Navigation;