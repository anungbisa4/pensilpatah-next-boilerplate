import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Home = (props) => {
  return (
    <>
      <div>Pensilpatah next boilerplate</div>
      <div>Env : {process.env.baseUrl}</div>
    </>
  );
};


export default Home;
