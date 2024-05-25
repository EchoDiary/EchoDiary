"use client";

import { Amplify } from "aws-amplify";
import { Predictions } from "@aws-amplify/predictions";
import outputs from "@/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard from "@/components/Dashboard";
import Image from "next/image";

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
export default function App() {
  return (
    <Authenticator components={components}>
      {({ signOut, user }) => <Dashboard signOut={signOut as any} />}
    </Authenticator>
  );
}
