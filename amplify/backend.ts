import { storage } from "./storage/resource";
import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { aiEnhanceText } from './functions/ai-enhance-text/resource';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  storage,
  aiEnhanceText
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

backend.aiEnhanceText.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: [
      `arn:aws:bedrock:*::foundation-model/mistral.mistral-7b-instruct-v0:2`,
    ],
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
