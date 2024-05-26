"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import React, { forwardRef, useRef } from "react";
import {
  FaBolt,
  FaBookJournalWhills,
  FaFaceAngry,
  FaFaceKiss,
  FaFaceSmile,
  FaImages,
  FaMicrophone,
  FaPen,
  FaRegFaceSmile,
} from "react-icons/fa6";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export function FeaturesBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg  p-10"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-row items-stretch justify-between gap-4">
        <div className="flex flex-col justify-center gap-4">
          <div
            ref={div1Ref}
            className="flex flex-row z-10 items-center gap-2 p-2 px-4 border border-primary bg-white rounded-lg hover:scale-105 transition-all duration-300 w-fit"
          >
            <span className="text-base text-primary-foreground">Write</span>
            <FaPen className="text-primary" />
          </div>
          <div
            ref={div2Ref}
            className="flex flex-row z-10 items-center gap-2 p-2 px-4 border border-primary bg-white rounded-lg hover:scale-105 transition-all duration-300 w-fit"
          >
            <span className="text-base text-primary-foreground">Speak</span>
            <FaMicrophone className="text-primary" />
          </div>
          <div
            ref={div3Ref}
            className="flex flex-row z-10 items-center gap-2 p-2 px-4 border border-primary bg-white rounded-lg hover:scale-105 transition-all duration-300 w-fit"
          >
            <span className="text-base text-primary-foreground">Media</span>
            <FaImages className="text-primary" />
          </div>
          <div
            ref={div4Ref}
            className="flex flex-row z-10 items-center gap-2 p-2 px-4 border border-primary bg-white rounded-lg hover:scale-105 transition-all duration-300 w-fit"
          >
            <span className="text-base text-primary-foreground whitespace-nowrap">
              AI Magic
            </span>
            <FaBolt className="text-primary" />
          </div>
          <div
            ref={div5Ref}
            className="flex flex-row z-10 items-center gap-2 p-2 px-4 border border-primary bg-white rounded-lg hover:scale-105 transition-all duration-300 w-fit"
          >
            <span className="text-base text-primary-foreground whitespace-nowrap">
              Mood Analysis
            </span>
            <FaFaceSmile className="text-primary" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="h-24 w-24">
            <Image
              alt="Avatar"
              src="/images/ai-avatar.png"
              width={200}
              height={200}
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <div
            ref={div7Ref}
            className="flex flex-col gap-2 z-10 hover:bg-background shadow-xl bg-primary border-primary border-4 aspect-square rounded-full p-6 items-center justify-center transition-all 200ms ease-in"
          >
            <BsJournalBookmarkFill size={50} />
            <p className="text-base font-semibold text-center text-accent-foreground">
              My EchoDiary
            </p>
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
      />
    </div>
  );
}
