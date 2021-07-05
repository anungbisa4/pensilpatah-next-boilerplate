import { useState } from "react";
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

export default function ActionDetailTransaction() {
  const router = useRouter()
  const state = useSelector(state => state)

  const { user } = useSelector((state) => state);
  const detail = user?.detail_transaction || "";

  console.log(detail)

  const onLink = (link, as) => router.push(link, as)
  return (
    <>
      <div className="flex space-x-4 mt-16">
        <div className="w-1/2">
          <button
            className="button-outline-blue text-sm"
            onClick={() =>
              onLink(
                "/tracking/[transaction_id]",
                `/tracking/${detail?.transaction_id}`
              )
            }
          >
            Tracking
          </button>
        </div>
        <div className="w-1/2">
          <button
            className="button-blue-gradient text-sm"
            onClick={() =>
              onLink(
                "/review/[package_id]/[transaction_id]",
                `/review/${detail?.package_id}/${detail?.transaction_id}`
              )
            }
          >
            Review
          </button>
        </div>
      </div>
    </>
  );
}
