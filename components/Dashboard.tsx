"use client";

import Navbar from "./Navbar";
import DiaryCard from "./DiaryCard";

function Dashboard({
  signOut,
  diaries,
}: {
  signOut: () => void;
  diaries: any[];
}) {
  return (
    <main>
      <Navbar signOut={signOut} />
      <div className="flex flex-wrap gap-7 p-10">
        {diaries.map((diary: any) => (
          <DiaryCard
            key={diary.id}
            diaryId={diary.id}
            content={diary.content}
            images={diary.images}
            mood={diary.mood}
            date={diary.date}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
