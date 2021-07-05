import { useState } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import { EyeIcon } from "@heroicons/react/outline";

const ContentArticle = ({ ...props }) => {
  return (
    <>
      <section className="content-article ">
        <h1 className="font-bold text-lg md:text-xl">
          Channel NUSANTARA hadir Eksklusif di TRANSVISION dijamin bikin nagih.
        </h1>
        <div className="flex py-4 text-sm md:text-base text-gray-powder">
          <span className="flex items-center">
            <TimeIcon className="w-4 h-4 text-gray-powder" />
            <label className="px-2 truncate font-medium">28 Feb 2021</label>
          </span>
          <span className="flex items-center ml-2">
            <EyeIcon className="w-4 h-4 text-gray-powder" />
            <label className="px-2 truncate font-medium">234 views</label>
          </span>
        </div>
        <article className="text-sm">
          <strong>Jakarta, 19 November 2020</strong> - Mengutip ungkapan yang
          ditulis oleh peneliti sejarah dari Universitas Ohio William Frederick
          yang menyebutkan bahwa musik dangdut adalah prisma yang peka dan
          berguna untuk memandang masyarakat Indonesia, sebab musik dangdut
          tidak hanya mencerminkan keadaan politik dan budaya nasional saja,
          tetapi juga membentuk gagasan tentang kelas, gender dan etnisitas di
          negara Indonesia modern. Berangkat dari hal tersebut, Transvision
          sebagai TV Berlangganan kebanggaan keluarga Indonesia menghadirkan
          channel baru yang sudah dipastikan akan bikin nagih pelanggan
          setianya, yaitu Channel Nusantara.
        </article>
      </section>
    </>
  );
};

export default ContentArticle;
