import { useState, useEffect } from "react";
import Card from "@/components/Card/Card";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export default function TrackOrderCard() {
  const { user } = useSelector((state) => state);
  const tracking = user?.tracking;

  console.log(dayjs("21", "DD"));
  return (
    <Card className="card-rounded-xl">
      <header className="pb-4 mb-4 border-b-1 font-semibold">
        Track Order
      </header>
      {tracking?.tracking_history?.map((item, index) => {
        const active =
          index + 1 === tracking?.tracking_history.length
            ? "text-blue-primary"
            : "text-gray-light-dark";
        const firstLine =
          tracking?.tracking_history.length === 1
            ? "bg-white"
            : "bg-blue-primary";
        console.log(active);
        return (
          <div key={index + item.date} className="tracker-order">
            <div className="flex justify-between">
              <div className="flex">
                <div className="relative self-stretch mr-4">
                  <div className={`w-0.5 h-full relative ${firstLine}`}>
                    <div className="relative">
                      <span className="absolute w-5 h-5 rounded-full bg-white left-1/2 top-2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white"></span>
                      <span className="absolute w-5 h-5 rounded-full bg-blue-primary left-1/2 top-2 transform -translate-x-1/2 -translate-y-1/2 border-4 animate-pulse"></span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pb-4">
                  <h2 className={`font-semibold  ${active}`}>{item.desc}</h2>
                  <h2>{item.date}</h2>
                </div>
              </div>
              <div className="text-gray-light-dark w-2/6 text-right">
                {item.date} WIB
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}
