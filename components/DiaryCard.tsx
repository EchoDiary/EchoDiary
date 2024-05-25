import { StorageImage } from "@aws-amplify/ui-react-storage";
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-baseline">
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
                <StorageImage alt={date} path={images[0]} />
              </div>
            )}

            <p className="line-clamp-3">{content}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]">
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 items-baseline">
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
            {mood && <MoodTag mood={mood} />}
          </DialogTitle>
        </DialogHeader>
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
                      <StorageImage alt={date} path={image} />
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

        <p className="line-clamp-3">{content}</p>
      </DialogContent>
    </Dialog>
  );
}

export default DiaryCard;
