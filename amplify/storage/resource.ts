import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "diaryDrive",
  access: (allow) => ({
    "diary-images/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
