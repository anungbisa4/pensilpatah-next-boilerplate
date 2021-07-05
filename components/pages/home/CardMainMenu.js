import { useState, useEffect } from "react";
import Card from "@/components/Card/Card";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const CardMainMenuLoader = dynamic(() =>
  import("@/components/Loader/CardMainMenuLoader.js")
);

const CardmainMenu = ({ className }) => {
  const [status, setStatus] = useState(true);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user === "undefined") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [user?.userChecker]);
  return (
    <div className={`card-main-menu ${className}`}>
      <Card className="bg-white shadow-xl rounded-lg px-4 py-2">
        {status ? (
          <CardMainMenuLoader className="h-12 flex" />
        ) : (
          <div className="flex w-full h-full items-center justify-between transition-all ease-in duration-100">
            <div className="flex h-full items-center">
              <div className="w-12 h-12 relative hidden xs:flex transition-all">
                <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                  <span className="hidden group-hover:table-cell text-white font-bold align-middle">
                    AN
                  </span>
                  <Image
                    src="/img/allo-bank.png"
                    alt="image banner"
                    width={42}
                    height={42}
                    layout="responsive"
                    className="object-cover object-center w-full h-full visible group-hover:hidden"
                  />
                </div>
              </div>
              {user?.userChecker?.isLoggedIn ? (
                <div className="user-login ml-3 h-full flex flex-col justify-center">
                  <h1 className="text-sm font-semibold leading-4 truncate">
                    Rp. 0
                  </h1>
                  <label className="text-xs text-yellow-400 leading-4 truncate mt-1">
                    Allo Wallet
                  </label>
                </div>
              ) : (
                <div className="user-login ml-3">
                  <h1 className="text-xs font-semibold leading-4 truncate">
                    <Link href="/login">Login or Register</Link>
                  </h1>
                  <Link href="#">
                    <a className="text-xs font-medium text-yellow-400 leading-4 truncate">
                      Get more benefits!
                    </a>
                  </Link>
                </div>
              )}
            </div>
            <div className="coupon flex bg-gray-100 rounded-lg items-center p-2 px-3">
              <div className="hidden xs:flex mr-2 items-center">
                <Image
                  src="/dummy-img/discount.png"
                  alt="image banner"
                  width={29}
                  height={19}
                />
              </div>
              <div className="flex flex-col text-xxs">
                <div className="text-white p-1 px- bg-red-500 rounded-md text-center">
                  PROMO
                </div>
                <span className="text-center mt-2px text-10px font-medium">
                  See Coupon
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CardmainMenu;
