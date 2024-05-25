
"use server"

function combineEntries(entries: any): string {
  return entries.map((entry: any) => {
    // Date with time, and day of the week
    const date = new Date(entry.createdAt).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    const mood = entry.mood ? ` Mood: ${entry.mood}` : ''; // include mood if it exists
    return `${entry.content}${mood} Date: ${date}`;
  }).join('\n'); // join each entry with a newline
}

export const generateHighlights = async (content: any) => {
  const text = combineEntries(content);
  try {
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
              role: "system",
              content: "Your task is to generate highlights of this week from the following Diary entries which has moood, date and content. For each entry, add some insights on how the user can improve their mental health and productivity. Make it as short and concise as possible."
            },
            {
              role: "user",
              content: text,
            },
          ],


        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();

    if (data) {
      return {
        data: data.choices[0].message.content
      }
    }
    else {
      return {
        error: "No data returned",
      }
    }
  } catch (error) {
    console.error(error);
    return {
      error: `${error}`,
    }
  }
}