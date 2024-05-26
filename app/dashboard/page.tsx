"use client";

import Image from "next/image";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

import Dashboard from "@/components/Dashboard";
import Link from "next/link";

Amplify.configure(outputs);

Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: outputs.custom.Predictions,
});

const components = {
  Header() {
    return (
      <div className="flex justify-center items-center pb-2">
        <Link href="/" className="cursor-pointer">
          <Image src="/images/logo.png" width={300} height={300} alt="logo" />
        </Link>
      </div>
    );
  },
};

function dashboard() {
  return (
    <Authenticator components={components}>
      {({ signOut, user }) => <Dashboard signOut={signOut as any} />}
    </Authenticator>
  );
}

export default dashboard;
