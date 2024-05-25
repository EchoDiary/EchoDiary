"use client";

import Navbar from "./Navbar";
import DiaryCard from "./DiaryCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Loader2 } from "lucide-react";
import SummaryCard from "./ui/SummaryCard";

const client = generateClient<Schema>();

function Dashboard({ signOut }: { signOut: () => void }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [diaries, setDiaries] = useState<any[]>([]);

  const [nextTokenString, setNextTokenString] = useState<string | null>(null);
  async function handleNext() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { data, nextToken, errors } = await client.models.Diary.list({
        limit: 6,
        nextToken: nextTokenString,
      });
      if (errors) {
        console.error(errors);
      }
      console.log(data);
      if (!nextToken) {
        setHasMore(false);
      } else {
        setNextTokenString(nextToken);
      }
      setDiaries((prev) => [...prev, ...data]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const createSub = client.models.Diary.onCreate().subscribe({
      next: (data) => {
        setDiaries([]);
        setNextTokenString(null);
        setPage(0);
        setHasMore(true);
      },
    });
    const updateSub = client.models.Diary.onUpdate().subscribe({
      next: (data) => {
        setDiaries([]);
        setNextTokenString(null);
        setPage(0);
        setHasMore(true);
      },
    });
    const deleteSub = client.models.Diary.onDelete().subscribe({
      next: (data) => {
        setDiaries([]);
        setNextTokenString(null);
        setPage(0);
        setHasMore(true);
      },
    });
    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Navbar signOut={signOut} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto p-4">
        <SummaryCard diaryCount={diaries.length || 0} />
        {diaries.map((diary: any) => (
          <DiaryCard
            key={diary.id}
            diaryId={diary.id}
            content={diary.content}
            images={diary.images}
            mood={diary.mood}
            date={diary.createdAt}
          />
        ))}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={handleNext}
          threshold={1}
        >
          {hasMore && (
            <div className="col-span-full flex flex-row items-center justify-center gap-2">
              <Loader2 className="my-4 h-8 w-8 animate-spin" /> Loading...
            </div>
          )}
        </InfiniteScroll>
      </div>
    </main>
  );
}

export default Dashboard;
