import { storage } from "./storage/resource";
import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
  storage,
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "transcribe:StartStreamTranscriptionWebSocket",
      "comprehend:DetectSentiment",
    ],
    resources: ["*"],
  })
);

backend.addOutput({
  custom: {
    Predictions: {
      convert: {
        transcription: {
          defaults: {
            language: "en-US",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.authenticatedUserIamRole)
            .region,
        },
      },
      interpret: {
        interpretText: {
          defaults: {
            type: "sentiment",
            language: "en-US",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.authenticatedUserIamRole)
            .region,
        },
      },
    },
  },
});
