import { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion";
import { useRouter } from "next/router"

const PaymentSuccess = () => {
  const router = useRouter()

  return (
    <>
      <div className="payment-success mt-20 p-8 text-center bg-white rounded-2xl shadow-md2">
        <div className="w-90pt m-auto">
          <Image
            src="/icons/iconCheck.svg"
            alt="success payment"
            width={50}
            height={50}
            layout="responsive"
          />
        </div>
        <h1 className="font-bold text-lg text-blue-primary my-4">
          Payment Successful
        </h1>
        <div className="text-sm">
          Thank you for your payment. You can track your transaction{" "}
          <strong className="font-bold text-blue-primary">here</strong>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link href="/">
          <a className="text-blue-primary text-sm font-semibold">
            Back to Home
          </a>
        </Link>
        <Link href="#">
          <a>
            <motion.button
              onClick={() => router.push("/invoice", "/invoice")}
              whileTap={{ scale: 1.1, transition: { duration: 0.3 } }}
              className="flex mx-auto m-4 text-white text-sm font-semibold items-center gradient-blue border-2 border-blue-primary py-2 px-12 focus:outline-none rounded-full"
            >
              See Invoice
            </motion.button>
          </a>
        </Link>
      </div>
    </>
  );
}

export default PaymentSuccess