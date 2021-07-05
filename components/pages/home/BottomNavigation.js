import { useState } from "react";
// import Link from 'next/link'
// import Fade from "react-reveal/Fade";
import LinkNavBottom from "@/components/Link/LinkNavBottom";

const BottomNavigation = () => {
  return (
    <>
      {/* <div className="bottom-navigation w-full"> */}
      {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> */}
      {/* <Fade bottom duration={100}> */}
      <section
        id="bottom-navigation"
        className="block fixed inset-x-0 h-45pt w-full bottom-0 z-25 bg-white shadow-up"
      >
        <div id="tabs" className="flex  justify-between h-full items-center">
          <LinkNavBottom
            href="/"
            iconSrcActive="/icons/iconHomeSolid.svg"
            iconSrcOff="/icons/iconHomeOutlined.svg"
            title="Home"
          />
          <LinkNavBottom
            href="/products"
            iconSrcActive="/icons/iconProductsSolid.svg"
            iconSrcOff="/icons/iconProductsOutlined.svg"
            title="Products"
          />
          <LinkNavBottom
            href="/allo-explore"
            iconSrcActive="/icons/iconAllo@3x.jpg"
            iconSrcOff="/icons/iconAllo@3x.jpg"
            title="Allo Explore"
          />
          <LinkNavBottom
            href="/services/xstream"
            iconSrcActive="/icons/iconServiceSolid.svg"
            iconSrcOff="/icons/iconService.svg"
            title="Services"
          />
          <LinkNavBottom
            href="/profile"
            iconSrcActive="/icons/iconProfileSolid.svg"
            iconSrcOff="/icons/iconProfileOutlined.svg"
            title="Profile"
          />
        </div>
      </section>
      {/* </Fade> */}
      {/* </div> */}
    </>
  );
};

export default BottomNavigation;
