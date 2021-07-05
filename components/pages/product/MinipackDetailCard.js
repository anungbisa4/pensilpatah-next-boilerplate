import { useState } from "react"

import dynamic from "next/dynamic"

const Dropdown = dynamic(() => import("@/components/Form/Dropdown"));

const MinipackDetailCard = ({...props}) => {
  return (
    <>
      <section className="bg-white w-full absolute bottom-0 left-0 rounded-t-2xl">
        <div className="relative w-full h-full px-6 py-9">
          <div className="absolute w-full top-0 left-0">
            <span className="mx-auto block w-10 h-1 bg-gray-light-dark rounded-full mt-2" />
          </div>
          <main className="pb-8">
            <h1 className="text-xl font-semibold pb-5">Minipack Sports</h1>
            <p className="text-xs font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi diam
              semper nisl auctor amet aliquam urna, laoreet. Gravida semper
              dolor metus gravida ut at maecenas id ac. Pulvinar in est, eget
              sollicitudin nec sed velit in vitae. Faucibus blandit tempus leo
              at urna, massa. Arcu fringilla tincidunt aliquet enim. Ut molestie
              adipiscing turpis neque, non ullamcorper tortor. Ipsum amet ac
              arcu quisque pharetra, lectus diam aliquam. Id at gravida sapien
              tellus aliquam senectus leo. At dolor arcu laoreet.
            </p>
          </main>
          <Dropdown items={[]} />
        </div>
      </section>
    </>
  );
}

export default MinipackDetailCard