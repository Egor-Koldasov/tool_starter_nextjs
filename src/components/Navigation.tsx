import { ComponentType } from "react";
import Link from 'next/link';

const Navigation: ComponentType = () => {
  return (
    <div className="navigation">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </div>
  );
}

export default Navigation;