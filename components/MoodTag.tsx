import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MoodTag = ({ mood }: { mood: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-row gap-1 items-center justify-start text-base border-border border rounded-lg px-2 py-1 group">
            <div className="group-hover:scale-125 duration-300 transition-all group-hover:rotate-12">
              {" "}
              {mood === "Happy" ? (
                <span>😊</span>
              ) : mood === "Sad" ? (
                <span>😢</span>
              ) : mood === "Neutral" ? (
                <span>😐</span>
              ) : (
                <></>
              )}
            </div>
            <span>{mood}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {mood === "Happy"
              ? "You seem to be happy today!"
              : mood === "Sad"
              ? "You seem to be sad today!"
              : mood === "Neutral"
              ? "You seem to be neutral today!"
              : ""}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MoodTag;
