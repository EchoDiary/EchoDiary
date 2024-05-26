import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "./button";
import { FaBolt } from "react-icons/fa6";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import toast from "react-hot-toast";
import { generateHighlights } from "@/app/actions/generateHighlights.actions";
import Markdown from "react-markdown";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { Loader2 } from "lucide-react";

const client = generateClient<Schema>();

const SummaryCard = ({ diaryCount }: { diaryCount: number }) => {
  const [highlightSummary, setHighlightSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<string>>();
  const getDiariesOfWeek = async () => {
    try {
      const { data, errors } = await client.models.Diary.list({
        filter: {
          createdAt: {
            between: [
              new Date(
                new Date().setDate(new Date().getDate() - 7)
              ).toISOString(),
              new Date().toISOString(),
            ],
          },
        },
      });
      if (errors) {
        console.error(errors);
      }
      return data;
    } catch (error) {
      toast.error("Failed to get diaries of the week");
      console.error(error);
    }
  };

  function combineEntries(entries: any): string {
    return entries
      .map((entry: any) => {
        // Date with time, and day of the week
        const date = new Date(entry.createdAt).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
        const mood = entry.mood ? ` Mood: ${entry.mood}` : ""; // include mood if it exists
        return `${entry.content}${mood} Date: ${date}`;
      })
      .join("\n"); // join each entry with a newline
  }

  async function generateHighlightContent() {
    if (diaryCount < 3 || highlightSummary != "") return;
    setLoading(true);
    const diaries = await getDiariesOfWeek();
    if (!diaries) {
      setLoading(false);
      return;
    }
    // Each diary has an images array, we need to flatten it
    const images = diaries.flatMap((diary: any) => diary.images);
    console.log(images);
    setImages(images as any);

    // AI Generate Highlights
    const promptText = combineEntries(diaries);
    console.log(promptText);
    const { data: generatedContent, errors } =
      await client.queries.aiEnhanceText({
        text: promptText,
        mode: "highlight",
      });
    if (errors) {
      toast.error(errors[0].message);
      setLoading(false);
      return;
    }
    setHighlightSummary(generatedContent as string);
    console.log(generatedContent);
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger onClick={generateHighlightContent} asChild>
        <Card className="relative shadow-yellow-200 hover:scale-105 shadow-md transition-all min-h-40 h-full duration-300 cursor-pointer col-span-full overflow-hidden">
          <BorderBeam
            size={300}
            borderWidth={2.5}
            duration={7}
            colorFrom="#fff700"
            colorTo="#ff6200"
          />
          <CardContent className="flex w-full h-full flex-col-reverse md:flex-row p-4 px-8 gap-2 items-center justify-center">
            <div className="flex h-full flex-col gap-2 justify-center md:basis-1/2">
              <h2 className="text-2xl font-bold">
                View your highlights of the Week
              </h2>
              <p>
                Get AI generated insights on your week and how you can improve
                your mental health and productivity.
              </p>
              <Button className="w-fit flex flex-row gap-2 items-center hover:scale-105 hover:border-border border-2 z-10 transition-all duration-300">
                <span>View Highlights</span>
                <FaBolt />
              </Button>
            </div>
            <div className="basis-1/2 flex flex-row justify-end md:pr-8 z-10">
              <img
                className="md:h-44 hover:scale-110 hover:-rotate-6 transition-all duration-300"
                src="/images/summarize.png"
                alt="Summary"
              />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-y-auto w-[90%] md:min-w-[70%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Your Highlights of the Week
          </DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-1 items-center justify-center p-4">
          {diaryCount < 3 && (
            <p className="text-center">
              You need to have at least 3 diaries to view your highlights.
            </p>
          )}
          {loading ? (
            <div className="flex flex-col w-full gap-2 items-start justify-center">
              <p>Generating your highlights...</p>
              <Loader2 className="my-4 h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              {images && images.length > 0 && (
                <Carousel
                  opts={{
                    loop: true,
                    duration: 20,
                  }}
                  className="mx-8"
                >
                  <CarouselContent>
                    {
                      // Carousel images
                      images.map((image) => (
                        <CarouselItem key={image}>
                          <div
                            className="rounded-lg mb-4 overflow-hidden max-h-96 w-full relative object-cover"
                            style={{
                              aspectRatio: "300/200",
                              objectFit: "cover",
                            }}
                          >
                            <StorageImage alt={image} path={image} />
                          </div>
                        </CarouselItem>
                      ))
                    }
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              )}
              {highlightSummary && (
                <p className="prose prose-lg prose-yellow prose-p:my-0 prose-p:leading-tight prose-ul:my-0 prose-ul:leading-tight prose-li:my-0 whitespace-pre-wrap">
                  <Markdown>{highlightSummary}</Markdown>
                </p>
              )}
            </>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryCard;
