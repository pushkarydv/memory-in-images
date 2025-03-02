'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className='p-1 my-2 flex items-center gap-3 border-1 border-base-200 rounded-full max-w-fit mx-auto sticky top-0'>
      {[
        { name: 'Search', link: '/' },
        { name: 'Upload', link: '/upload' },
        { name: 'Deploy', link: '/deploy' },
      ].map((obj, index) => (
        <Link
          key={index}
          href={obj.link}
          className={`px-2 py-1 rounded-full transition-all ${
            pathname === obj.link ? 'bg-base-200' : ''
          }`}
        >
          {obj.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
