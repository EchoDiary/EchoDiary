import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { text } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "X-Title": `EchoDiary`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: `correct the grammar and restructure the following text into paragraphs if needed to improve clarity and flow without changing its meaning, provide only the modified text without any introductory phrases or additional comments. : "${text}".`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json("Internal server error", { status: 500 });
  }
}
