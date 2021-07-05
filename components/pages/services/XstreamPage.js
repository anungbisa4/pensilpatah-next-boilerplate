import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiXstreamAccountInfo } from "@/utils/apiHandlers";
import { useSelector, useDispatch } from "react-redux";

import dynamic from "next/dynamic";

const XstreamProgress = dynamic(
  () =>
    import("@/components/pages/services").then((mod) => mod.XstreamProgress),
  {
    loading: () => <></>,
  }
);
const XstreamActivation = dynamic(
  () =>
    import("@/components/pages/services").then((mod) => mod.XstreamActivation),
  {
    loading: () => <></>,
  }
);

const XstreamPage = ({ setLoadingScreen }) => {
  const router = useRouter();
  const [page, setPage] = useState("activation");
  const { user } = useSelector((state) => state);
  const [accountXstream, setAccountXstream] = useState(null);

  async function checkAccountXstream(email) {
    try {
      setLoadingScreen(true);
      const response = await apiXstreamAccountInfo(email);
      console.log(response);
      setAccountXstream(response.data?.result);
      const statusActivation = response.data?.result?.activation_status;
      if (statusActivation) {
        setLoadingScreen(false);
        if (statusActivation === "In Process") {
          setPage("inprogress");
        }
        if (statusActivation === "Activated") {
          setPage("activated");
        }
        if (statusActivation === "Failed") {
          setPage("failed");
        }
      }
    } catch (err) {
      const statusCode = err?.err?.response?.status;
      if (statusCode === 400) {
        setLoadingScreen(false);
        setPage("activation");
      }
    }
  }
  useEffect(() => {
    let unmounted = false;
    const email = user?.userChecker?.email || null;
    checkAccountXstream(email);
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      {page === "activation" && <XstreamActivation />}
      {page === "activated" && (
        <XstreamProgress status="activated" accountXstream={accountXstream} />
      )}
      {page === "inprogress" && (
        <XstreamProgress
          status="inprogress"
          accountXstream={accountXstream}
          onCheckStatus={() => checkAccountXstream(user?.userChecker?.email)}
        />
      )}
      {page === "failed" && (
        <XstreamProgress
          status="failed"
          accountXstream={accountXstream}
          onCheckStatus={() => checkAccountXstream(user?.userChecker?.email)}
        />
      )}
    </>
  );
};

export default XstreamPage;
