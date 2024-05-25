"use client";

import { useRef, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import useMediaStream from "use-media-stream";
import { Visualizer } from "react-sound-visualizer";
import Image from "next/image";
import { FaMicrophone, FaRegPenToSquare } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { IoSparkles } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Divider, Loader } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../amplify/data/resource";
import toast from "react-hot-toast";
import { Predictions } from "@aws-amplify/predictions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { analyseMood } from "@/lib/utils";

const client = generateClient<Schema>();

const AddDiaryDialogButton = () => {
  const [transcription, setTranscription] = useState("");

  const recognitionRef = useRef<SpeechRecognition>();
  const {
    stream,
    start: startStream,
    stop: stopStream,
    isStreaming,
    isSupported,
  } = useMediaStream({
    mediaDeviceConstraints: { audio: true, video: false },
  });

  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOptimising, setIsOptimising] = useState(false);
  const [sentiment, setSentiment] = useState("");
  const [mood, setMood] = useState("");
  const [images, setImages] = useState([] as string[]);

  useState(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setIsSpeechSupported(false);
    }
  });

  function handleRecord() {
    console.log("Recording");
    if (isActive) {
      handleStop();
      setIsActive(false);
      return;
    }

    startStream();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.start();

    recognitionRef.current.onerror = (event) => {
      console.log(event);
      setIsSpeechSupported(false);
      handleStop();
    };

    recognitionRef.current.onstart = () => {
      setIsActive(true);
    };

    recognitionRef.current.onend = () => {
      handleStop();
    };

    recognitionRef.current.onresult = async function (event) {
      console.log(event);
      const newTranscript =
        event.results[event.results.length - 1][0].transcript;
      setTranscription((prev) => prev + newTranscript);
      setContent((prev) => prev + newTranscript);
    };
  }

  function handleStop() {
    recognitionRef.current?.stop();
    recognitionRef.current = undefined;
    stopStream();
    setIsActive(false);
  }

  async function handleSentimentAnalysis() {
    try {
      const response = await Predictions.interpret({
        text: {
          source: {
            text: content,
            language: "en",
          },
          type: "sentiment",
        },
      });
      if (response.textInterpretation.sentiment) {
        console.log(response.textInterpretation.sentiment);
        setSentiment(response.textInterpretation.sentiment.predominant);
        const interpretedMood = analyseMood(
          response.textInterpretation.sentiment
        );
        return interpretedMood;
      }
    } catch (error) {
      console.error("Error while analysing sentiment:", error);
      return;
    }
  }

  // Make a promise that does sentiment analysis and then saves the diary entry below

  async function handleSave() {
    try {
      toast
        .promise(
          new Promise(async (resolve, reject) => {
            const mood = await handleSentimentAnalysis();
            await client.models.Diary.create({
              content: content,
              images: images,
              mood: mood,
            })
              .then(() => {
                resolve("Diary entry saved successfully");
              })
              .catch((error) => {
                reject("Error saving diary entry");
              });
          }),
          {
            loading: "Saving diary entry...",
            success: "Diary entry saved successfully",
            error: "Error saving diary entry",
          }
        )
        .then(() => {
          setContent("");
          setIsOpen(false);
        })
        .finally(() => {
          setContent("");
        });
    } catch (error) {
      toast.error("Error saving diary entry");
      console.error("Error saving diary entry", error);
    }
  }

  async function handleOptimise() {
    if (!content) {
      toast.error("Please enter some text to optimise");
      return;
    }

    setIsOptimising(true);

    try {
      const response = await fetch("/api/optimise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        throw new Error("Failed to optimize text");
      }
      const data = await response.json();
      setContent(data.choices[0].message.content);
    } catch (error) {
      console.error("Error while optimizing text:", error);
      toast.error("Failed to optimize text. Please try again later.");
    } finally {
      setIsOptimising(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setContent("");
          setImages([]);
          setSentiment("");
          setMood("");
          setTranscription("");
        }
        setIsOpen(isOpen);
      }}
    >
      <DialogTrigger
        onClick={() => {
          setIsOpen(true);
        }}
        asChild
      >
        <Button className="flex flex-row gap-2 items-center">
          <FaRegPenToSquare />
          <span className="hidden md:block">New Journal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90%] gap-0 overflow-auto">
        <DialogHeader className="space-y-0">
          <DialogTitle className="space-y-0">
            <h1 className="text-2xl font-bold">Add a new diary entry</h1>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 items-center">
          {!isSupported || !isSpeechSupported ? (
            <DialogDescription>
              <p className="text-sm text-destructive">
                Your browser does not support recording audio or speech
                recognition. Please try again with a different browser such a
                Chrome.
              </p>
            </DialogDescription>
          ) : (
            <>
              <div className="flex flex-row gap-4 items-start w-full">
                <div className="w-24 h-24 aspect-square flex-shrink-0 mt-4 rounded-full animate-bounce hover:animate-none relative overflow-hidden group">
                  <Image
                    src="/images/ai-avatar.png"
                    fill={true}
                    alt="AI Avatar"
                  />
                </div>

                <div className="flex flex-col justify-center h-full w-fit">
                  <h2 className="text-2xl font-semibold">
                    {isActive ? "Listening..." : "What's on your mind?"}
                  </h2>
                  {isActive ? (
                    <Visualizer
                      autoStart
                      mode="continuous"
                      audio={stream}
                      strokeColor="#f6ad55"
                    >
                      {({ canvasRef }) => (
                        <>
                          <canvas ref={canvasRef} height={50} />
                        </>
                      )}
                    </Visualizer>
                  ) : (
                    <p className="text-sm whitespace-normal text-accent-foreground max-w-xs">
                      Start speaking to{" "}
                      <span className="font-bold italic">
                        <span>echo &#10024;</span>
                      </span>{" "}
                      and share your thoughts by clicking the button below.
                    </p>
                  )}
                </div>
              </div>
              <button
                className="flex w-full items-center justify-center gap-2 bg-primary rounded-lg px-4 py-2 text-primary-foreground hover:scale-105 transition-all duration-200 hover:border-amber-500 hover:border-2"
                onClick={() => {
                  isActive ? handleStop() : handleRecord();
                }}
              >
                <FaMicrophone />
                <span>{isActive ? "Stop Listening" : "Start Listening"}</span>
              </button>
            </>
          )}
          <div className="grid w-full gap-3 my-2">
            <Label htmlFor="message">Your thoughts</Label>
            <Textarea
              rows={6}
              placeholder="Today was a good day. I went to the park and played with my friends. I also had a good meal and watched a movie. I am feeling happy and content."
              name="message"
              id="message"
              className="placeholder:text-secondary-foreground/20"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Accordion className="w-full" type="single" collapsible>
            <AccordionItem className="w-full" value="item-1">
              <AccordionTrigger>Attach Images</AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="grid w-full gap-3 my-2">
                  <StorageManager
                    acceptedFileTypes={["image/*"]}
                    path={({ identityId }) => `diary-images/${identityId}/`}
                    isResumable
                    maxFileCount={5}
                    onUploadSuccess={(data) =>
                      setImages((prev) => [...prev, data.key || ""])
                    }
                    components={{
                      Container({ children }) {
                        return (
                          <div className="w-full rounded-[12px] border border-[#a69859] p-3">
                            {children}
                          </div>
                        );
                      },
                      DropZone({ children, displayText, inDropZone, ...rest }) {
                        return (
                          <div className="flex flex-col gap-4 justify-center items-center w-full">
                            <p>Drop files here</p>
                            <Divider size="small" label="or" maxWidth="10rem" />
                            {children}
                          </div>
                        );
                      },
                      FilePicker({ onClick }) {
                        return (
                          <Button
                            onClick={onClick}
                            className="text-md font-light rounded-sm"
                          >
                            Browse Files
                          </Button>
                        );
                      },
                      FileList({ files, onCancelUpload, onDeleteUpload }) {
                        return (
                          <div className="flex gap-4 w-full flex-wrap mt-3">
                            {files.map(
                              ({
                                file,
                                key,
                                progress,
                                id,
                                status,
                                uploadTask,
                              }) => (
                                <div
                                  className="flex flex-col items-center justify-center relative w-20 h-20 object-cover"
                                  key={key}
                                >
                                  {file && (
                                    <Image
                                      width={80}
                                      height={80}
                                      src={URL.createObjectURL(file)}
                                      alt={key}
                                      className="object-cover"
                                    />
                                  )}
                                  {progress < 100 ? (
                                    <Loader
                                      position="absolute"
                                      size="large"
                                      percentage={progress}
                                      isDeterminate
                                      isPercentageTextHidden
                                    />
                                  ) : null}

                                  <Button
                                    className="opacity-70 hover:opacity-100 rounded-full absolute bg-transparent hover:bg-transparent transition-all duration-200"
                                    onClick={() => {
                                      if (status === "uploading") {
                                        onCancelUpload({
                                          id,
                                          uploadTask: uploadTask!,
                                        });
                                      } else {
                                        onDeleteUpload({ id });
                                      }
                                    }}
                                  >
                                    <TiDeleteOutline className="w-[26px] h-[26px] text-red-700" />
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        );
                      },
                    }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <DialogFooter className="flex flex-col md:flex-row items-center w-full justify-center gap-4">
          {!isOptimising ? (
            <Button
              className="flex flex-row gap-2 items-center w-full md:w-fit"
              variant="outline"
              onClick={handleOptimise}
            >
              <span>Enhance with AI</span>
              <IoSparkles className="text-primary" />
            </Button>
          ) : (
            <Button
              className="flex flex-row gap-2 items-center"
              variant="outline"
              disabled
            >
              <span>Optimizing...</span>
              <TbReload className="w-5 h-5 text-primary animate-spin" />
            </Button>
          )}
          <Button
            onClick={() => {
              handleSave();
            }}
            className="w-full"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDiaryDialogButton;
