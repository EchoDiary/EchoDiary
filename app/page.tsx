import { Sora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FeaturesGrid from "@/components/FeaturesGrid";
import { FeaturesBeam } from "@/components/FeaturesBeam";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
});

export default function LandingPage() {
  return (
    <main
      className={cn("w-full min-h-screen overflow-x-hidden", sora.className)}
    >
      <LandingNavbar />
      <div className="flex relative px-6 md:px-24 flex-col items-center md:items-start justify-center min-h-[80dvh] h-full">
        <div className="flex flex-col items-center md:items-start justify-center gap-4">
          <h1 className="text-4xl font-bold text-left max-w-lg">
            Effortless Diaries, Powered by Your{" "}
            <span className="text-yellow-400">Voice & AI</span>
          </h1>
          <p className="text-lg text-center md:text-left max-w-2xl">
            EchoDiary transforms your spoken words into a beautifully organized,
            AI-enhanced diary. Speak, Reflect, and Cherish your moments
            effortlessly.
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button asChild variant="default">
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="#why-echodiary">Learn More</Link>
          </Button>
        </div>
        <Image
          src="/images/ai-avatar.png"
          width={500}
          height={500}
          className="hidden md:block absolute rotate-12  pointer-events-none right-0 top-10 "
          alt="landing"
        />
      </div>
      <div
        id="why-echodiary"
        className="flex relative px-6 md:px-24 flex-col items-center md:items-start justify-center min-h-dvh py-10 h-full"
      >
        <h1 className="text-4xl my-10 font-bold text-center">
          Why <span className="text-yellow-400">Echo Diary?</span>
        </h1>
        <FeaturesGrid />
      </div>
      <div className="flex relative px-6 md:px-24 flex-col items-center md:items-start justify-center min-h-dvh py-10 h-full">
        <div className="w-full grid grid-cols-2">
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-4xl my-10 font-bold text-left">
              How it <span className="text-yellow-400">Works?</span>
            </h1>
            <p className="text-lg text-left max-w-2xl">
              EchoDiary allows you to effortlessly capture your thoughts through
              voice-activated entry, turning your spoken words into text in
              real-time. Enhance your entries with photos, videos, and voice
              notes for a richer experience. The app's mood tracker analyzes
              your voice to log your emotional state automatically, while AI
              features provide intelligent summarization and optimization,
              ensuring your diary is both comprehensive and beautifully
              organized.
            </p>
          </div>

          <FeaturesBeam />
        </div>
      </div>
    </main>
  );
}

const LandingNavbar = () => {
  return (
    <div className="flex py-3 px-4 md:px-10 flex-row items-center justify-between bg-background border-b-2 border-secondary">
      <div>
        <Image src="/images/logo.png" alt="logo" width={200} height={150} />
      </div>
      <div className="flex gap-2">
        <Button asChild variant="default">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};
