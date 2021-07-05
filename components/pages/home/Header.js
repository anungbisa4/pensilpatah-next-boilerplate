import { useEffect, useState } from 'react'
import { BellIcon, SearchIcon, BurgerIcon } from "@/components/Icons"

import dynamic from 'next/dynamic'
import Link from "next/link"
// import Image from 'next/image'

// const SidebarMenu = dynamic(() => import('@/components/pages/home/SidebarMenu'))
const Sidebar = dynamic(() => import("@/components/pages/home/Sidebar"));


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* <SidebarMenu isOpen={isOpen} toggle={onClick} /> */}
      <Sidebar isOpen={isOpen} toggle={onClick} />
      <header className="header-home block fixed inset-x-0 h-40pt top-0 z-25 bg-white">
        <nav className="flex h-full justify-between items-center  py-4 px-6">
          <div
            className="flex w-14 justify-items-start items-center align-middle focus:outline-none cursor-pointer"
            onClick={onClick}
          >
            <BurgerIcon className="w-4 xs:w-5 outline-remove text-gray-a1a1" />
          </div>
          {/* <div className=> */}
          <img
            className="w-36 xs:w-44"
            src="/img/trvLogo.svg"
            alt="logo-trans"
          />
          {/* </div> */}
          <div className="flex w-14 items-center justify-between align-middle">
            <Link href="/search/package">
              <a className="pl-2 xs:pl-0 cursor-pointer active:opacity-70 text-gray-a1a1">
                <SearchIcon className="w-4 xs:w-5 outline-remove" />
              </a>
            </Link>
            <Link href="/notification">
              <a className="pl-2 xs:pl-0 cursor-pointer active:opacity-70">
                <BellIcon className="w-4 xs:w-5 outline-remove text-gray-a1a1" />
              </a>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header