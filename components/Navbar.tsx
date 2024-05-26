import React from "react";
import { Button } from "./ui/button";
import AddDiaryDialogButton from "./AddDiaryDialogButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ signOut }: { signOut: () => void }) => {
  return (
    <div className="flex py-3 px-4 md:px-10 flex-row items-center justify-between bg-background border-b-2 border-secondary sticky top-0 z-30">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={200} height={55} />
      </Link>
      <div className="flex gap-2">
        <AddDiaryDialogButton isEditing={false} />
        <Button onClick={signOut} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
