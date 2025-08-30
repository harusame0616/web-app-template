import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

import { Pagination } from "@/components/pagination";
import { CalendarIcon, UserIcon } from "lucide-react";
import { getNotes } from "./_data/note-data";
import { Note } from "./note";
import { NotesSearchCondition } from "./note-search-condition";

type NotesContainerProps = {
  condition: NotesSearchCondition;
};

export async function NotesContainer({ condition }: NotesContainerProps) {
  const { notes, totalPage } = await getNotes(condition);

  if (!notes?.length) {
    return <p className="text-center p-8">接客ノートがありません</p>;
  }

  return (
    <NotesPresenter
      notes={notes}
      totalPage={totalPage}
      page={condition.page || 1}
    />
  );
}

type NotesPresenterProps = {
  notes: Note[];
  totalPage: number;
  page: number;
};

export function NotesPresenter({
  notes,
  totalPage,
  page,
}: NotesPresenterProps) {
  return (
    <div>
      <div className="space-y-6">
        {notes.map((note) => {
          return (
            <Card key={note.noteId}>
              <CardHeader>
                <div className="flex">
                  <UserIcon /> 山田
                </div>
                <div className="flex">
                  <CalendarIcon /> 2024.12.15.11
                </div>
              </CardHeader>
              <CardContent>{note.text}</CardContent>
            </Card>
          );
        })}
      </div>
      <Pagination page={page} totalPage={totalPage} />
    </div>
  );
}

export function NotesSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          {index > 0 && <hr className="border-gray-200 my-6" />}
          <div className="space-y-4">
            <Skeleton className="h-5 w-48" />
            <div className="space-y-3 pl-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
