"use client";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Checker } from "../../../../../types";

export default function Widget({ checker }: { checker: Checker }) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none bg-red-500 w-full min-w-[280px] max-w-[400px]"
    >
      <div className="min-h-[200px] p-4 bg-gradient-to-r from-blue-500 to-blue-900">
        <div className="flex flex-col justify-between gap-3 h-full">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
            {checker.name}
          </h1>
          <h2 className="text-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Actual: ${checker.real_val}
          </h2>
          <h2 className="text-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Expected: ${checker.comparison_val}
          </h2>
        </div>
      </div>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-xs md:text-tiny text-white/80">Checker Data</p>
        <Button
          className="text-xs md:text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
  );
}
