'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavBarButtonProps = {
  name: string;
  href: string;
};

export default function NavBarButton({ name, href }: NavBarButtonProps) {
  const pathname = usePathname();
  const isRoute = pathname === href;
  const buttonClassName = isRoute
    ? 'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'
    : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';

  return (
    <Link key={name} href={href} className={buttonClassName}>
      {name}
    </Link>
  );
}
