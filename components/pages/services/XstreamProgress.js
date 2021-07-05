import { useState } from "react";
import { EyeIcon, EyeOffIcon, StarIcon } from "@heroicons/react/solid";
import { InfoCircleOutlineIcon, RetryIcon } from "@/components/Icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { apiXstreamReprocess } from "@/utils/apiHandlers";
import {
  RefreshIcon,
  MiniPackIcon,
  SettingAccountIcon,
  CopyIcon,
} from "@/components/Icons";
import { useRouter } from "next/router";
import Card from "@/components/Card/Card";
import Label from "@/components/Label/Label";
import base64 from "base-64";

const XstreamProgress = ({ status, accountXstream, onCheckStatus }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const router = useRouter();

  const handleLabel = (type) => {
    if (type === "failed") {
      return { type: "outline-failed", title: "Failed", outlineType: "failed" };
    }
    if (type === "inprogress") {
      return {
        type: "outline-inprogress",
        title: "In Process",
        outlineType: type,
      };
    }
    return {
      type: "outline-activated",
      title: "Activated",
      outlineType: "activated",
    };
  };
  const handleStatus = () => {
    onCheckStatus();
  };
  const handlePassword = (password) => {
    let seePassword = [];
    let arrayPassword = [...password];
    arrayPassword.map((item, index) => {
      index < 7 && seePassword.push("*");
    });
    seePassword = seePassword.join("");
    if (showPassword) {
      return base64.decode(password);
    }
    return arrayPassword.map((item, index) => (
      <StarIcon key={index} className="w-1.5 text-gray-a1a1" />
    ));
  };
  const handleClickPasswod = () => {
    setShowPassword(!showPassword);
  };

  const handleLink = (link) => {
    router.push(link);
  };

  const handleReprocess = () => {
    const body = {
      email: accountXstream?.email,
      activation_id: accountXstream?.activation_id,
    };
    apiXstreamReprocess(body)
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(accountXstream);
  };

  return (
    <>
      <section className="xstream-service_inprogress p-6 pt-8 pb-16">
        <div className="w-full flex justify-center border-1 rounded-full pt-[9px] pb-[10px] border-gray-warm">
          <span className="text-sm font-medium">{accountXstream?.email}</span>
        </div>
        <div className="w-60 min-h-[160px] mx-auto py-8">
          <img src="/dummy-img/xstream-service.webp" alt="xstream activation" />
        </div>
        <div className="space-y-4">
          <Card className="bg-white shadow-md2 rounded-[10px] p-3">
            <header className="flex justify-between items-center pb-2">
              <h1 className="text-sm font-bold">Status</h1>
              <div className="flex space-x-2">
                <Label
                  className="p-2 py-1 px-4 text-xs font-semibold rounded-full w-full flex justify-center"
                  type={handleLabel(status).type}
                  title={handleLabel(status).title}
                  outlineType={handleLabel(status).outlineType}
                />
                {status === "inprogress" && (
                  <button
                    onClick={handleStatus}
                    className="outline-remove active:opacity-70"
                  >
                    <RefreshIcon
                      className={`w-6 ${checkStatus ? "animate-spin" : ""}`}
                    />
                  </button>
                )}
                {status === "failed" && (
                  <button
                    onClick={handleStatus}
                    className="outline-remove active:opacity-70"
                  >
                    <InfoCircleOutlineIcon className={`w-6 text-red-error`} />
                  </button>
                )}
              </div>
            </header>
            <main className="divide-y-1">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-semibold py-2">Customer ID</h2>
                <span className="flex items-center text-xs font-medium text-gray-a1a1">
                  {accountXstream?.customer_id || "1278SA20210210000002"}
                  <CopyToClipboard
                    text={accountXstream?.customer_id || "1278SA20210210000002"}
                  >
                    <button className="outline-remove flex justify-center items-center w-full active:opacity-70 pl-2">
                      <CopyIcon className="w-4 text-blue-primary" />
                    </button>
                  </CopyToClipboard>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-semibold py-2">BOX ID</h2>
                <span className="text-xs font-medium text-gray-a1a1 flex items-center">
                  {accountXstream?.box_id || "007135515032021"}
                  <CopyToClipboard
                    text={accountXstream?.box_id || "007135515032021"}
                  >
                    <button className="outline-remove flex justify-center items-center w-full active:opacity-70 pl-2">
                      <CopyIcon className="w-4 text-blue-primary" />
                    </button>
                  </CopyToClipboard>
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h2 className="text-xs font-semibold pt-2">Device</h2>
                <span className="text-xs font-medium text-gray-a1a1">
                  {accountXstream?.mac_address || "Mac Address"}
                </span>
              </div>
            </main>
          </Card>
          <Card className="bg-white shadow-md2 rounded-[10px] p-3">
            <main className="divide-y-1">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-semibold py-2">Your Login Box</h2>
                <span className="text-xs font-medium text-gray-a1a1">
                  {accountXstream?.email}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h2 className="text-xs font-semibold pt-2">Password</h2>
                <div className="flex items-center w-1/2 justify-end overflow-x-scroll">
                  <span className="text-xs font-medium text-gray-a1a1 flex justify-end">
                    {handlePassword(accountXstream?.box_pw || "12345678")}
                  </span>
                  <button
                    className="outline-remove active:opacity-70"
                    onClick={handleClickPasswod}
                  >
                    {showPassword ? (
                      <EyeIcon className="ml-1 w-4 text-gray-a1a1" />
                    ) : (
                      <EyeOffIcon className="ml-1 w-4 text-gray-a1a1" />
                    )}
                  </button>
                </div>
              </div>
            </main>
          </Card>
        </div>
        {status === "activated" && (
          <div className="action-activated_service space-y-4 mt-6">
            <div>
              <button className="button-blue-gradient flex items-center text-sm font-semibold">
                <SettingAccountIcon className="w-6 text-white mr-2" />
                Manage Account
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  handleLink("/minipack/121/minipack-subscription")
                }
                className="button-blue-gradient flex items-center text-sm font-semibold"
              >
                <MiniPackIcon className="w-6 text-white mr-2" />
                Buy Minipack
              </button>
            </div>
          </div>
        )}
        {status === "failed" && (
          <div className="action-activated_service space-y-4 mt-6">
            <div>
              <button
                onClick={handleReprocess}
                className="button-blue-gradient flex items-center text-sm font-semibold"
              >
                <RetryIcon className="w-6 text-white mr-2" />
                Retry Activation
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default XstreamProgress;
