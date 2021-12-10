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
  background-color: rgba(255, 255, 255, .5);
`

export type NavigationProps = {
  className?: string
}
const Navigation = (props: NavigationProps) => {
  const toggleNav = useToggleNav();
  const navOpen = useSelectorPath('nav.open');
  const user = useSelectorPath('api.me.data');
  return (
    <NavigationStyled className={cn("navbar container-fluid navbar-expand-lg border-primary navbar-light", props.className)}>
      <button
        className={cn("navbar-toggler", {open: navOpen})}
        type="button"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link href="/"><a className="navbar-brand">Tool Starter</a></Link>
      <AuthNav />
      <div className={cn("collapse navbar-collapse", {show: navOpen})} id="navbarToggler">
        <ul className="navbar-nav">
          {user && <NavItem href="/profile">Profile</NavItem>}
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
      className={cn("btn btn-link me-1")}
      onClick={logout}
    >
      Logout
    </span>
  );
}

const AuthNav = () => {
  const user = useSelectorPath('api.me.data');
  const isActive = useIsActive();
  const isSignUp = isActive('/signup');
  if (user) {
    return (
      <div className="ms-auto order-lg-1">
        <Logout />
      </div>
    );
  }
  return (
    <div className="ms-auto order-lg-1">
      <Link href="/login">
        <a className={cn(
          "btn btn-link d-md-inline-block me-1",
          {'d-none': !isSignUp}
        )}>
          Login
        </a>
      </Link>
      <Link href="/signup">
        <a className={cn(
          "btn btn-primary d-md-inline-block",
          {'d-none': isSignUp}
        )}>
          Sign Up
        </a>
      </Link>
    </div>
  )
}

export default Navigation;