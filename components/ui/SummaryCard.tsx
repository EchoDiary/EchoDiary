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
    const generatedContent = await generateHighlights(diaries);
    if (generatedContent.error) {
      toast.error(generatedContent.error);
      setLoading(false);
      return;
    }
    setHighlightSummary(generatedContent.data as any);
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
          <CardContent className="flex w-full h-full flex-col md:flex-row p-4 px-8 gap-2 items-center justify-center">
            <div className="flex h-full  flex-col gap-2 justify-center md:basis-1/2">
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
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
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
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Generating your highlights...</p>
              <div className="animate-spin h-8 w-8 border-2 border-border rounded-full"></div>
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
                <p className="prose prose-lg prose-p:my-0 prose-p:leading-tight prose-ul:my-0 prose-ul:leading-tight prose-li:my-0 whitespace-pre-wrap">
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
