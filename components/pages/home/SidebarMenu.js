import { useState } from 'react'
import { Transition } from "@headlessui/react";
import Image from "next/image";
import CloseIcon from '@/components/Icons/CloseIcon'
import {
  VipIcon,
  AboutIcon,
  BenefitIcon,
  SettingIcon,
  UpdateIcon,
  RateIcon,
  FacebookIconCircle,
  LogoutIcon,
} from "@/components/Icons/SidebarIcon";


function SidebarMenu({ isOpen, toggle }) {
  return (
    <>
      <Transition show={isOpen}>
        {/* {(ref) => ( */}
        <section
          // ref={ref}
          className="sidebar-menu-home fixed inset-0 overflow-hidden z-50"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal={isOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="background-modal absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden={isOpen}
                onClick={toggle}
              ></div>
            </Transition.Child>
            <Transition.Child
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative w-10/12 max-w-md h-screen bg-white">
                <div className="h-full flex flex-col py-8 bg-white shadow-xl overflow-y-scroll">
                  <div className="flex flex-col justify-between mt-4 relative flex-1 px-3">
                    <div>
                      <div className="flex items-center justify-between px-3">
                        <img style={{ width: 200 }} src="/img/trvLogo.svg" />
                        <button
                          className="outline-none focus:outline-none"
                          onClick={toggle}
                        >
                          <CloseIcon className="w-8 h-8 text-gray-400" />
                        </button>
                      </div>
                      <div className="mt-8">
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-center">
                            <VipIcon className="w-8 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              VIP Access
                            </h1>
                          </div>
                          <button
                            type="button"
                            className="py-2 px-3  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full group-hover:bg-white group-hover:text-blue-600"
                          >
                            Upgrade
                          </button>
                        </a>
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-end">
                            <BenefitIcon className="w-8 h-7 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              Benefits
                            </h1>
                          </div>
                        </a>
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-end">
                            <SettingIcon className="w-8 h-7 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              Settings
                            </h1>
                          </div>
                        </a>
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-center">
                            <UpdateIcon className="w-8 h-7 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              Check for Update
                            </h1>
                          </div>
                        </a>
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-end">
                            <RateIcon className="w-8 h-7 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              Rate
                            </h1>
                          </div>
                        </a>
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-end">
                            <FacebookIconCircle className="w-8 h-7 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              Like Us on Facebook
                            </h1>
                          </div>
                        </a>
                        <a className="group flex items-center justify-between py-2 mb-4 last:mb-0 px-3 hover:bg-blue-600 rounded-md transition-200">
                          <div className="flex items-end">
                            <AboutIcon className="w-8 h-7 text-gray-sidebar group-hover:text-white" />
                            <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                              About Us
                            </h1>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="w-full px-2">
                      <a className="group w-full flex items-center justify-between py-2 px-3 hover:bg-blue-600 rounded-md transition-200">
                        <div className="flex items-center">
                          <LogoutIcon className="w-8 h-6 text-gray-sidebar group-hover:text-white" />
                          <h1 className="ml-6 text-14px font-semibold group-hover:text-white">
                            Logout
                          </h1>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </section>
        {/* )} */}
      </Transition>
    </>
  );
}

export default SidebarMenu