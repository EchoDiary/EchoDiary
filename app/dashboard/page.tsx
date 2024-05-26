"use client";

import Image from "next/image";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

import Dashboard from "@/components/Dashboard";

Amplify.configure(outputs);

Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: outputs.custom.Predictions,
});

const components = {
  Header() {
    return (
      <div className="flex justify-center items-center pb-2">
        <Image src="/images/logo.png" width={300} height={300} alt="logo" />
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
