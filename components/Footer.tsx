import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex h-[60px] justify-center items-center bg-background text-foreground rounded-tl-lg rounded-tr-lg gap-4 relative">
      <p className="text-muted-foreground">Made with ❤️ by </p>
      <div className="flex gap-1">
        <Link href="https://dev.to/sidjs" target="_blank">
          <Image
            src="https://media.licdn.com/dms/image/D5603AQHoR9HnW-0huw/profile-displayphoto-shrink_400_400/0/1702790621615?e=1722470400&v=beta&t=gZZK2-6SGvQynLaKZ8L8hDI2_xSkfnRSDUwtZ7MK5Cg"
            alt="Logo"
            width={26}
            height={26}
            className="rounded-full object-cover hover:-translate-y-2 transition-all 200ms ease-in shadow-sm hover:shadow-lg"
          />
        </Link>
        <Link
          href="https://shivam-sharma-myportfolio.vercel.app"
          target="_blank"
        >
          <Image
            src="https://shivam-sharma-myportfolio.vercel.app/_next/image?url=%2Fassets%2Favatar.png&w=384&q=75"
            alt="Logo"
            width={26}
            height={26}
            className="rounded-full object-cover hover:-translate-y-2 transition-all 200ms ease-in shadow-sm hover:shadow-lg"
          />
        </Link>
      </div>
      <div className="md:absolute md:right-0">
        <Button className="flex gap-2 items-center bg-transparent text-muted-foreground">
          <FaGithub className="w-5 h-5 text-foreground" />
          Source code
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
