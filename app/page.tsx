"use client";

import { Amplify } from "aws-amplify";
import { Predictions } from "@aws-amplify/predictions";
import outputs from "@/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard from "@/components/Dashboard";

Amplify.configure(outputs);

Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: outputs.custom.Predictions,
});

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => <Dashboard signOut={signOut as any} />}
    </Authenticator>
  );
}
