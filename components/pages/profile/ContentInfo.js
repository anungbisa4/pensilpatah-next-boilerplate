import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import fetchJson from "@/utils/fetchJson"
import useUser from "@/utils/hooks/useUser";
import cookies from "js-cookie"

import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserInfo } from "@/store/user/action";

const UserSolidIcon = dynamic(() => import("@/components/Icons/UserSolidIcon"));
const HeaderContent = dynamic(() => import("@/components/pages/profile/HeaderContent"));
const AccountCouponIcon = dynamic(() =>
  import("@/components/Icons/AccountCouponIcon")
);
const AccountSolidIcon = dynamic(() =>
  import("@/components/Icons/AccountSolidIcon")
);
const AccountTransactionIcon = dynamic(() =>
  import("@/components/Icons/AccountTransactionIcon")
);
const AccountHelpIcon = dynamic(() =>
  import("@/components/Icons/AccountHelpIcon")
);
const PopInfo = dynamic(() => import("@/components/pages/profile/PopInfo"));

const ContentInfo = ({...props}) => {
  const router = useRouter()
  const { userProfile, customerInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const logout = async (e) => {
    e.preventDefault();
    dispatch(deleteUserInfo());
    // dispatch((dispatch) => dispatch({ type: "DELETE_USER_INFO" }));
    cookies.remove("dlingo-trans-pwa");
    try {
      const clear = await fetchJson('/api/clearUser', { method: 'POST' })
      if (!clear.isLoggedIn) router.push("/");
    } catch(err) {
      throw err
    }
    // mutateUser(
    //   fetchJson('/api/clearUser', { method: 'POST' }),
    //   false
    // )
    // router.push("/");
  }

  console.log(userProfile, customerInfo);

  return (
    <>
      <div className="content-info relative w-full bg-gray-100 min-h-screen rounded-t-2xl mt-8 px-6 py-8">
        <PopInfo />
        <div className="grid grid-flow-row grid-cols-1 gap-8">
          <section>
            <HeaderContent
              icon={<AccountSolidIcon className="w-4 h-4 text-white" />}
              title="Profile"
              description="Edit and manage your profile detail"
            />
            <div className="mt-4 p-4 bg-white rounded-2xl">
              <div className="flex items-center">
                <UserSolidIcon className="w-8 text-gray-icon" />
                <div className="flex flex-grow flex-col ml-2">
                  <h2 className="text-xs font-semibold">
                    {customerInfo?.name || "user"}
                  </h2>
                  <label className="text-10px font-semibold text-gray-light-dark">
                    User
                  </label>
                </div>
              </div>
              <div className="mt-3 grid grid-flow-row grid-cols-1 gap-1">
                <div className="pb-3 border-solid border-gray-light-profile border-b">
                  <label className="text-10px font-semibold text-gray-light-dark">
                    Email
                  </label>
                  <h2 className="text-xs font-semibold">
                    {customerInfo?.email || "user@trans.com"}
                  </h2>
                </div>
                <div className="pb-3 border-solid border-gray-light-profile border-b">
                  <label className="text-10px font-semibold text-gray-light-dark">
                    Phone
                  </label>
                  <h2 className="text-xs font-semibold">
                    {customerInfo?.phone_number || "0"}
                  </h2>
                </div>
                <div className="">
                  <label className="text-10px font-semibold text-gray-light-dark">
                    My Address
                  </label>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs truncate w-5/6 font-semibold">
                      {customerInfo?.profileAddress || "Address not set"}
                    </h2>
                    <Link href="/all-address/[name]" as="/all-address/user">
                      <a>
                        <ChevronRightIcon className="w-5 text-gray-light-dark cursor-pointer active-icon-gray" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <HeaderContent
              icon={<AccountCouponIcon className="w-4 h-4 text-white" />}
              title="Coupon"
              description="View and use your coupon"
            />
            <div className="mt-4 p-4 bg-white rounded-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xs truncate w-5/6 font-bold">All Coupon</h2>
                <ChevronRightIcon className="w-5 text-gray-light-dark cursor-pointer active-icon-gray" />
              </div>
            </div>
          </section>
          <section>
            <HeaderContent
              icon={<AccountTransactionIcon className="w-4 h-4 text-white" />}
              title="Transaction History"
              description="See all your previous transaction"
            />
            <div className="mt-4 p-4 bg-white rounded-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xs truncate w-5/6 font-bold">
                  All Transaction
                </h2>
                <button
                  className="outline-remove"
                  onClick={() =>
                    router.push("transaction-history", "transaction-history")
                  }
                >
                  <ChevronRightIcon className="w-5 text-gray-light-dark cursor-pointer active-icon-gray" />
                </button>
              </div>
            </div>
          </section>
          <section>
            <HeaderContent
              icon={<AccountHelpIcon className="w-4 h-4 text-white" />}
              title="Help & Feedback"
              description="Reach us with your feedback and question"
            />
            <div className="mt-4 p-4 bg-white rounded-2xl">
              <div className="grid grid-flow-row grid-cols-1 gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs truncate w-5/6 font-bold">FAQ</h2>
                  <Link href="/faq">
                    <a>
                      <ChevronRightIcon className="w-5 text-gray-light-dark cursor-pointer active-icon-gray" />
                    </a>
                  </Link>
                </div>
                <span className="block w-full h-1px bg-gray-light-profile my-0.5" />
                <div className="flex items-center justify-between">
                  <h2 className="text-xs truncate w-5/6 font-bold">
                    Contact Us
                  </h2>
                  <ChevronRightIcon className="w-5 text-gray-light-dark cursor-pointer active-icon-gray" />
                </div>
              </div>
            </div>
          </section>
          <button
            type="reset"
            onClick={logout}
            className="rounded-full p-4 text-white gradient-blue active:bg-blue-primary focus:outline-none text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ContentInfo