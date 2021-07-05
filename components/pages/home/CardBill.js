import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import Fade from "react-reveal/Fade";

const CardBill = ({...props}) => {
  const { user } = useSelector(state => state)
  const router = useRouter()
  
  const handleDetailBill = () => router.push('/bill')
  return (
    <>
      {user?.userChecker?.isLoggedIn && (
        <Fade>
          <div className="rounded-2xl shadow-md text-sm overflow-hidden">
            <header className="py-3 gradient-blue text-white text-center text-base font-semibold">
              Current Bill
              {/* No Current Bill */}
            </header>
            {/* main no active service */}
            {/* <main className="w-44 mx-auto text-center text-xs font-medium py-4">
              <h3>No active service!</h3>
              <button type="button" className="button-blue-primary mt-6">
                Enable Services
              </button>
            </main> */}
            {/* active sercive */}
            <main className="p-4 space-y-2">
              <div className="flex justify-between space-x-4">
                <div className="flex flex-col border-b-1 w-1/2">
                  <h2 className="text-10px font-medium">Account Number</h2>
                  <p className="text-10px font-semibold text-blue-primary">
                    127611000123
                  </p>
                </div>
                <div className="flex flex-col border-b-1 w-1/2">
                  <h2 className="text-10px font-medium">Due Date:</h2>
                  <p className="text-10px font-semibold text-blue-primary">
                    January 10, 2021
                  </p>
                </div>
              </div>
              <div className="flex justify-between space-x-4">
                <div className="flex flex-col border-b-1 w-1/2">
                  <h2 className="text-10px font-medium">Package:</h2>
                  <p className="text-10px font-semibold text-blue-primary">
                    HiSpeed 100GB
                  </p>
                </div>
                <div className="flex flex-col border-b-1 w-1/2">
                  <h2 className="text-10px font-medium">Total Billing:</h2>
                  <p className="text-10px font-semibold text-blue-primary">
                    Rp568.000
                  </p>
                </div>
              </div>
            </main>
            <footer className="flex space-x-4 p-4 pt-0">
              <div className="w-1/2">
                <button onClick={handleDetailBill} className="button-outline-blue text-10px py-1 border-1">See Details</button>
              </div>
              <div className="w-1/2 self-stretch">
                <button className="button-blue-gradient text-10px py-1 h-full">Pay Now</button>
              </div>
            </footer>
          </div>
        </Fade>
      )}
    </>
  );
}

export default CardBill;