import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "transcribe:StartStreamTranscriptionWebSocket",
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
    },
  },
});