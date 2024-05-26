import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import Marquee from '@/components/magicui/marquee';
import { CalendarIcon, FileTextIcon, GlobeIcon } from '@radix-ui/react-icons';
import { FaBolt, FaMicrophone } from 'react-icons/fa6';
import Image from 'next/image';

const files = [
  {
    name: 'New Year Reflections',
    body: 'Today was the first day of the new year. I spent the day with family and friends, reflecting on the past year and setting goals for the upcoming months. It feels refreshing to start anew.',
  },
  {
    name: 'Project Completion',
    body: 'Work has been hectic lately, but I finally managed to finish the big project I was working on. Celebrated with a quiet dinner at home. I need to find more balance between work and personal life.',
  },
  {
    name: 'Spring Hike',
    body: 'Went for a hike today and enjoyed the beautiful spring weather. The flowers are in full bloom and the air is crisp. It was a perfect day to disconnect from technology and reconnect with nature.',
  },
  {
    name: 'Summer Festival Fun',
    body: 'Had a great time at the summer festival. The music was fantastic, and I tried some delicious street food. Ran into some old friends and spent the evening reminiscing about the good old days.',
  },
  {
    name: 'Cozy Autumn Evening',
    body: 'The days are getting shorter and colder. Spent the evening curled up with a good book and a cup of hot chocolate. Sometimes, it’s nice to just stay in and enjoy the simple pleasures of life.',
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: 'Organized Journaling',
    description: 'Keep all your thoughts and memories in one place.',
    href: '#',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <Marquee
        pauseOnHover
        className='absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] '
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              'relative w-32 cursor-pointer overflow-hidden rounded-xl border-2 border-primary p-4',
              ' bg-gray-950/[.01] hover:bg-gray-950/[.05]',
              'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
              'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
            )}
          >
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-col'>
                <figcaption className='text-sm font-medium dark:text-white '>
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className='mt-2 text-xs'>{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: FaMicrophone,
    name: 'Voice-Activated Entry',
    description:
      'Speak naturally and let Echo transcribe your thoughts in real-time. No more tedious typing—just talk, and Echo does the rest.',
    href: '/',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <>
        <Image
          src='/images/ai-avatar.png'
          width={200}
          height={500}
          alt='AI Avatar'
          className='absolute right-14 z-10 top-10 rotate-12 pointer-events-none blur-sm group group-hover:blur-none transition-all duration-300'
        />
        <Image
          src='/images/waveform.png'
          width={400}
          height={500}
          alt='Waveform'
          className='absolute right-52 top-16 pointer-events-none blur-sm group group-hover:blur-none transition-all duration-300'
        />
      </>
    ),
  },
  {
    Icon: FaBolt,
    name: 'AI Powered Magic',
    description:
      'Too much content to sift through? Our  AI tools can summarize your entries, highlighting the most important moments and insights.',
    href: '/',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <Image
        src='/images/ai-summary.png'
        width={600}
        height={500}
        className='absolute right-5 blur-sm group group-hover:blur-none transition-all duration-300'
        alt='AI Magic'
      />
    ),
  },
  {
    Icon: CalendarIcon,
    name: 'Mood Tracking',
    description:
      'Automatically detect and log your mood based on your voice tone and word choices, providing valuable insights into your emotional journey.',
    className: 'col-span-3 lg:col-span-1',
    href: '/',
    cta: 'Learn more',
    background: (
      <Image
        src='/images/emotional.png'
        width={200}
        height={500}
        className='absolute right-5 blur-sm group group-hover:blur-none transition-all duration-300'
        alt='Emotions'
      />
    ),
  },
];

export default function FeaturesGrid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
