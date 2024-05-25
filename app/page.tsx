"use client";

import { Amplify } from "aws-amplify";
import AWS from "aws-sdk";
import { Predictions } from "@aws-amplify/predictions";
import outputs from "@/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard from "@/components/Dashboard";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";
import Image from "next/image";

Amplify.configure(outputs);

Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: outputs.custom.Predictions,
});

const client = generateClient<Schema>();

export default function App() {
  const [diaries, setDiaries] = useState<any>([]);

  function listDiaries() {
    client.models.Diary.observeQuery().subscribe({
      next: (response) => {
        setDiaries(response.items);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  useEffect(() => {
    listDiaries();
  }, []);

  const components = {
    Header() {
      return (
        <div className="flex justify-center items-center pb-2">
          <Image src="/images/logo.png" width={300} height={300} alt="logo" />
        </div>
      );
    },
  };

  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <Dashboard signOut={signOut as any} diaries={diaries as any} />
      )}
    </Authenticator>
  );
}
