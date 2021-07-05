import { useState } from "react";
import { useRouter } from "next/router" 
import { ChevronLeftIcon } from "@heroicons/react/outline"
import { BellIcon } from "@/components/Icons";
import PropTypes from "prop-types"
import Link from "next/link"

function Header({ backNav, isColor, title, notification, noMarginTop }) {
  const router = useRouter()
  const _onBack= () => router.back()
  return (
    <>
      <header className="header-product text-gray-600 body-font mb-8">
        <div className={` px-6 pt-8 flex items-center justify-center`}>
          <div className="flex flex-1 justify-start">
            {backNav && (
              <ChevronLeftIcon
                className={`w-8 h-8 ${
                  isColor ? "text-white" : ""
                } cursor-pointer`}
                onClick={_onBack}
              />
            )}
          </div>
          <div className="flex flex-1 justify-center">
            <h1
              className={`${isColor ? "text-white" : ""} text-2xl font-medium`}
            >
              {title}
            </h1>
          </div>
          <div className="flex flex-1 justify-end">
            {notification && (
              <Link href="/notification" shallow={true}>
                <a>
                  <BellIcon
                    className={`w-7 h-7 ${
                      isColor ? "text-white" : ""
                    } cursor-pointer`}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
