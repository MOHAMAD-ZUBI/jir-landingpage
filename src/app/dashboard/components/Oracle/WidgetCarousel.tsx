"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import client from "@/utils/client";

// interface Checker {
//   id: number;
//   name: string;
//   comparison_val: number;
//   actual_val: number;
//   shared_w_groups: boolean;
//   schedule: boolean;
//   created_at: string;
// }

interface Checker {
  name: string;
  matched: boolean;
  expected: number;
  actual: number;
  schedule: boolean;
  details: string;
}

const WidgetCarousel = () => {
  const [checkers, setCheckers] = useState<Checker[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const fetchCheckers = async () => {
    try {
      const { data } = await client.get("/v2/api/checker/");
      setCheckers(data);
    } catch (error) {
      console.error("Error fetching checkers:", error);
    }
  };

  useEffect(() => {
    fetchCheckers();
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {checkers?.map((checker, index) => (
            <div
              key={index}
              className={`flex-shrink-0 m-6 relative overflow-hidden ${
                checker.matched ? "bg-green-500" : "bg-red-500"
              } rounded-lg md:max-w-xl max-w-sm w-full shadow-lg`}
            >
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style={{ transform: "scale(1.5)", opacity: "0.1" }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <span className="block opacity-75 -mb-1">Checker Status</span>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="block font-semibold text-xl">
                      {checker.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Actual:</span>
                    <span className="block bg-white rounded-full text-blue-500 text-xs font-bold px-3 py-2 leading-none">
                      ${checker.actual.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expected:</span>
                    <span className="block bg-white rounded-full text-blue-500 text-xs font-bold px-3 py-2 leading-none">
                      ${checker.expected.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status:</span>
                    <span
                      className={`block rounded-full text-xs font-bold px-3 py-2 leading-none ${
                        checker.matched
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {checker.matched ? "Matched" : "Not Matched"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-opacity ${
          !canScrollPrev ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
      >
        <PiCaretLeftBold className="w-5 h-5" />
      </button>
      <button
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-opacity ${
          !canScrollNext ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
      >
        <PiCaretRightBold className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WidgetCarousel;
