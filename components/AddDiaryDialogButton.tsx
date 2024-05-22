'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { FaMicrophone } from 'react-icons/fa6';
import { IoSparkles } from 'react-icons/io5';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Visualizer } from 'react-sound-visualizer';
import { useEffect, useRef, useState } from 'react';
import useMediaStream from 'use-media-stream';

import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../amplify/data/resource';
import toast from 'react-hot-toast';

const client = generateClient<Schema>();

const AddDiaryDialogButton = () => {
  const [transcription, setTranscription] = useState('');

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
  const [content, setContent] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useState(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setIsSpeechSupported(false);
    }
  });

  function handleRecord() {
    console.log('Recording');
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

  async function handleSave() {
    try {
      // const { data: newTodo } = await client.models.Diary.create({
      //   content: content,
      //   date: new Date().toISOString(),
      // });

      toast
        .promise(
          client.models.Diary.create({
            content: content,
            date: new Date().toISOString(),
          }),
          {
            loading: 'Saving diary entry...',
            success: 'Diary entry saved successfully',
            error: 'Error saving diary entry',
          }
        )
        .then(() => {
          setContent('');
          setIsOpen(false);
        })
        .finally(() => {
          setContent('');
        });
    } catch (error) {
      toast.error('Error saving diary entry');
      console.error('Error saving diary entry', error);
    }
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setContent('');
        }
        setIsOpen(isOpen);
      }}
    >
      <DialogTrigger
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Button>New Diary</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>
            <h1 className='text-2xl font-bold'>Add a new diary entry</h1>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-2 items-center'>
          {!isSupported || !isSpeechSupported ? (
            <DialogDescription>
              <p className='text-sm text-destructive'>
                Your browser does not support recording audio or speech
                recognition. Please try again with a different browser such a
                Chrome.
              </p>
            </DialogDescription>
          ) : (
            <>
              <div className='flex flex-row gap-4 items-start w-full'>
                <div className='w-24 h-24 aspect-square mt-4 rounded-full animate-bounce hover:animate-none relative overflow-hidden group'>
                  <Image
                    src='/images/ai-avatar.png'
                    fill={true}
                    alt='AI Avatar'
                  />
                </div>

                <div className='flex flex-col justify-center h-full w-fit'>
                  <h2 className='text-2xl font-semibold'>
                    {isActive ? 'Listening...' : "What's on your mind?"}
                  </h2>
                  {isActive ? (
                    <Visualizer
                      autoStart
                      mode='continuous'
                      audio={stream}
                      strokeColor='#f6ad55'
                    >
                      {({ canvasRef }) => (
                        <>
                          <canvas ref={canvasRef} height={50} />
                        </>
                      )}
                    </Visualizer>
                  ) : (
                    <p className='text-sm text-accent-foreground max-w-xs'>
                      Start speaking to our AI and share your thoughts by
                      clicking on avatar.
                    </p>
                  )}
                </div>
              </div>
              <button
                className='flex w-full items-center justify-center gap-2 bg-primary rounded-lg px-4 py-2 text-primary-foreground hover:scale-105 transition-all duration-200 hover:border-amber-500 hover:border-2'
                onClick={() => {
                  isActive ? handleStop() : handleRecord();
                }}
              >
                <FaMicrophone />
                <span>{isActive ? 'Stop Listening' : 'Start Listening'}</span>
              </button>
            </>
          )}
          <div className='grid w-full gap-3 my-2'>
            <Label htmlFor='message'>Your thoughts</Label>
            <Textarea
              rows={6}
              placeholder='Today was a good day. I went to the park and played with my friends. I also had a good meal and watched a movie. I am feeling happy and content.'
              name='message'
              id='message'
              className='placeholder:text-secondary-foreground/20'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className='flex flex-row gap-2 items-center'
            variant='outline'
          >
            <span>Optimize with AI</span>
            <IoSparkles className='text-primary' />
          </Button>
          <Button onClick={handleSave} className='w-full'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDiaryDialogButton;
