"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import Widget from "./Widget";
import { Checker } from "../../../../../types";

const WidgetCarousel = ({ checkers }: { checkers: Checker[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

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
            <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
              <Widget checker={checker} />
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
