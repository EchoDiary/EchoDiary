"use client";

import Navbar from "./Navbar";
import DiaryCard from "./DiaryCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { FilePlus2, Loader2 } from "lucide-react";
import SummaryCard from "./ui/SummaryCard";
import { set } from "date-fns";

const client = generateClient<Schema>();

function Dashboard({ signOut }: { signOut: () => void }) {
  // const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  const [diaries, setDiaries] = useState<any[]>([]);

  // const [nextTokenString, setNextTokenString] = useState<string | null>(null);
  // async function handleNext() {
  //   if (loading || !hasMore) return;
  //   setLoading(true);
  //   try {
  //     const { data, nextToken, errors } = await client.models.Diary.list({
  //       limit: 6,
  //       nextToken: nextTokenString,
  //     });
  //     if (errors) {
  //       console.error(errors);
  //     }
  //     console.log(data);
  //     if (!nextToken) {
  //       setHasMore(false);
  //       setLoading(false);
  //     } else {
  //       setNextTokenString(nextToken);
  //     }
  //     if (!data) {
  //       setHasMore(false);
  //       setLoading(false);
  //       return;
  //     }
  //     setDiaries((prev) => [...prev, ...data]);
  //     setPage(page + 1);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    const createSub = client.models.Diary.onCreate().subscribe({
      next: (data) => {
        getDiaries();
      },
    });
    const updateSub = client.models.Diary.onUpdate().subscribe({
      next: (data) => {
        getDiaries();
      },
    });
    const deleteSub = client.models.Diary.onDelete().subscribe({
      next: (data) => {
        getDiaries();
      },
    });
    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }, []);

  const getDiaries = async () => {
    setLoading(true);
    try {
      const { data, errors } = await client.models.Diary.listDiariesByDate(
        {
          type: "diary",
        },
        {
          sortDirection: "DESC",
        }
      );
      if (errors) {
        console.error(errors);
      }
      if (!data) {
        setLoading(false);
        return;
      }
      setDiaries(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <main>
      <Navbar signOut={signOut} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl h-full mx-auto p-4">
        <SummaryCard diaryCount={diaries.length || 0} />
        {diaries && diaries.length > 0
          ? diaries.map((diary: any) => (
              <DiaryCard
                key={diary.id}
                diaryId={diary.id}
                content={diary.content}
                images={diary.images}
                mood={diary.mood}
                date={diary.createdAt}
              />
            ))
          : !loading && (
              <div className="min-h-52 flex flex-col gap-4 items-center justify-center col-span-full border-border border rounded-lg">
                <FilePlus2 size={40} className="text-muted-foreground" />
                <p className="text-center text-lg  font-semibold text-muted-foreground">
                  Get started by adding your first diary entry.
                </p>
                <p className="text-center text-sm max-w-lg text-muted-foreground">
                  Write your first diary entry by clicking on the New Journal
                  button on the top right corner along with our AI features.
                </p>
              </div>
            )}

        {loading && (
          <div className="col-span-full flex flex-row items-center justify-center gap-2">
            <Loader2 className="my-4 h-8 w-8 animate-spin" /> Loading...
          </div>
        )}

        {
          // To be implemented after sort.
          /* <InfiniteScroll
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
        </InfiniteScroll> */
        }
      </div>
    </main>
  );
}

export default Dashboard;
