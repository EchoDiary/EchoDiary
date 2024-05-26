import { StorageImage } from "@aws-amplify/ui-react-storage";
import { FaRegTrashAlt } from "react-icons/fa";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MoodTag from "./MoodTag";
import { Button } from "./ui/button";
import AddDiaryDialogButton from "./AddDiaryDialogButton";

const client = generateClient<Schema>();

function DiaryCard({
  diaryId,
  content,
  images,
  mood,
  date,
}: {
  diaryId: string;
  content: string;
  images: string[];
  mood: string;
  date: string;
}) {
  const deleteDiary = async (id: string) => {
    try {
      await client.models.Diary.delete({ id });
    } catch {
      console.error("Failed to delete diary");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {mood && <MoodTag mood={mood} />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {images && images.length > 0 && (
              <div
                className="rounded-lg mb-4 overflow-hidden max-h-96 w-full relative object-cover"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
              >
                <StorageImage
                  alt={date}
                  path={images[0]}
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <p className="line-clamp-3">{content}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]">
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-between">
            <span className="text-lg">
              {
                // Date readable format and small time
                new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            </span>
            <span className="text-xs text-gray-500">
              {new Date(date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </DialogTitle>
        </DialogHeader>
        {images && images.length > 0 && (
          <Carousel
            opts={{
              loop: true,
              duration: 20,
            }}
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
                      <StorageImage
                        alt={date}
                        path={image}
                        style={{
                          aspectRatio: "300/200",
                          objectFit: "cover",
                        }}
                      />
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
        <div className="flex flex-row items-center justify-between -mt-5">
          {mood && <MoodTag mood={mood} />}
          <div className="flex gap-2 items-center">
            <AddDiaryDialogButton
              isEditing={true}
              editDiaryId={diaryId}
              editContent={content}
              editImages={images}
              editMood={mood}
              editDate={date}
            />
            <Button
              variant="outline"
              className="bg-transparent flex justify-center items-center gap-2 text-sm h-8 px-2 m-0 hover:border-red-500 hover:text-red-500"
              onClick={() => deleteDiary(diaryId)}
            >
              <FaRegTrashAlt className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="line-clamp-3">{content}</p>
      </DialogContent>
    </Dialog>
  );
}

export default DiaryCard;
