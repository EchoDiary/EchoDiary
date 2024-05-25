import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function analyseMood(sentiment: any): string {
  return sentiment.predominant === "POSITIVE" ? "Happy" :
    sentiment.predominant === "NEGATIVE" ? "Sad" :
      "Neutral"
}