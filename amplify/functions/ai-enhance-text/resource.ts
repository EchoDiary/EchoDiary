import { defineFunction } from '@aws-amplify/backend';


export const aiEnhanceText = defineFunction({
  name: "aiEnhanceText",
  entry: "./handler.ts",
  timeoutSeconds: 40
});