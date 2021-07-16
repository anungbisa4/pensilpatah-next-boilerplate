import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image"

const Home = (props) => {
  return (
    <>
      <main>
        <div className="flex w-full h-screen justify-center items-center flex-col space-y-7">
          <Image src="/images/logo.png" layout="fixed" width={192} height={192 } alt="nice logo"/>
          <h1 className="font-bold text-2xl">Pensilpatah next boilerplate</h1>
          <h2>Env : {process.env.baseUrl}</h2>
          <p>Created By: Anung Aninditha</p>
        </div>
      </main>
    </>
  );
};


export default Home;
