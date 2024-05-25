import { StorageImage } from "@aws-amplify/ui-react-storage";

function DiaryCard({
  diaryId,
  content,
  images,
  mood,
  date,
}: {
  diaryId: string;
  content: string;
  images: string[];
  mood: string;
  date: string;
}) {
  return (
    <div className="flex w-[400px] h-[200px] overflow-hidden shadow-md">
      {images && images.length > 1 && (
        <StorageImage path={images[0]} alt="diary-image" />
      )}
      <div className="p-6 h-full">
        <h2>{mood}</h2>
        <p>{content}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default DiaryCard;
