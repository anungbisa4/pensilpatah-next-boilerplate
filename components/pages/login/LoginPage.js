import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router"
import dynamic from "next/dynamic";
import { apiGet } from "@/utils/requestApi";
import CircleSpinIcon from "@/components/Icons/CircleSpinIcon";
import cookie from "js-cookie"
import { LoginContext } from "@/utils/contexts/loginContext";

const Nav = dynamic(() => import("@/components/Navigation/Nav"));
const OvalWave = dynamic(() => import("@/components/waves/OvalWave"));
const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));

const data = {
  osType: "web",
  idfa: "223344556677",
  imei: "1122334455",
};
function LoginPage() {
  const router = useRouter()
  const { status, setStatus } = useContext(LoginContext);
  const [loading, setLoading] = useState(false)
  const [ type, setType ] = useState(null)
  const _onClick = async (type) => {
  const fetch = await apiGet("/transvisionplus/ctc/allo/auth/web", {
    redirectPageType: type,
    ...data,
  })
  try{
    setLoading(type)
    const url = fetch.data.result.url
    if(router.query?.path) {
      cookie.set("redirectTo", router.query?.path);
    }
    router.push(url);
  } catch(e) {
    setLoading(false);
    console.log(e)
  }
  };

  return (
    <>
      {status === "page" && (
        <div className="login-page w-full">
          <div className="absolute inset-x-0 top-0  z-50">
            <Nav backNav isColor />
          </div>
          <section className="relative w-full min-h-[300px]">
            <MainBanner
              className="relative overflow-hidden"
              src="/img/bg-login.jpg"
              height={500}
              width={500}
            />
            <div className="absolute w-full -bottom-1px">
              <OvalWave className="text-white" />
            </div>
          </section>
          <section className="pt-8 bg-white min-h-458pt">
            <div id="login-form" className="mx-auto px-6 sm:w-298pt">
              <h1 className="text-center text-sm mb-8">
                Enjoy Watching Many Blockbuster Movies and Favorite Shows with
                <strong> Transvision+</strong>, choice of Indonesian family for
                entertainments!
              </h1>
              <div className="mx-auto w-40">
                <button
                  onClick={() => _onClick("LOGIN")}
                  className="group w-full flex mx-auto text-sm font-semibold text-blue-primary border-1 border-blue-primary focus:outline-none rounded-full disabled:opacity-50 active:bg-blue-primary active:text-white justify-center py-3"
                  disabled={loading === "LOGIN"}
                >
                  {/* <span className="py-3 flex items-center w-full justify-center leading-none group-active:text-white"> */}
                  {loading === "LOGIN" ? (
                    <CircleSpinIcon className="w-5 text-blue-primary" />
                  ) : (
                    "LOGIN"
                  )}
                  {/* </span> */}
                </button>
              </div>
              <div className="relative mt-5 mb-5">
                <span className="absolute w-full h-1pt bg-gray-light-dark left-0 top-1/2" />
                <span className="block text-center text-xs relative mx-auto w-40 bg-white">
                  Don't have an acccount
                </span>
              </div>
              <div className="mx-auto w-40">
                <button
                  onClick={() => _onClick("REGISTER")}
                  className="group w-full flex mx-auto text-sm font-semibold text-blue-primary border-1 border-blue-primary focus:outline-none rounded-full disabled:opacity-50 active:bg-blue-primary active:text-white justify-center py-3"
                  disabled={loading === "REGISTER"}
                >
                  {/* <span className="py-3 flex items-center w-full justify-center leading-none active:text-white"> */}
                  {loading === "REGISTER" ? (
                    <CircleSpinIcon className="w-5 text-blue-primary" />
                  ) : (
                    "REGISTER"
                  )}
                  {/* </span> */}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default LoginPage;
