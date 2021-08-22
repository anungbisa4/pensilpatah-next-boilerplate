import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const SampleCDNvsOrigin = (props) => {
  return (
    <>
      <Head>
        <script src="/jwplayer.js" defer></script>
      </Head>
      <div>Pensilpatah next boilerplate</div>
      <div>Sample Context</div>
    </>
  );
};

export default SampleCDNvsOrigin;
