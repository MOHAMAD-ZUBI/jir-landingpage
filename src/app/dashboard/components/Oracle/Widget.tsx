"use client";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Checker } from "../../../../../types";

export default function Widget({ checker }: { checker: Checker }) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none bg-red-500">
      <div className=" h-[300px] bg-gradient-to-r p-4  from-blue-500 to-blue-900">
        <div className=" flex flex-col gap-4  h-full">
          <h1 className="text-white text-2xl font-bold">{checker.name}</h1>
          <h2 className=" text-center text-white text-4xl md:text-6xl font-bold">
            Actual: ${checker.real_val}
          </h2>
          <h2 className=" text-center text-white text-4xl md:text-6xl font-bold">
            Expected: ${checker.comparison_val}
          </h2>
        </div>
      </div>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Checker Data</p>
        <Button
          className="text-tiny text-white bg-black/20"
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
