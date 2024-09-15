import { getNotes } from "@/actions/noteMethods";
import NoteCard from "@/components/custom/NoteCard";

export default async function Home() {
  //  TODO:
  //  - - - > implement like and comment feature
  //          query the likes and comments of each note
  //          anonymous posts and private posts(soon)

  const notes = await getNotes();
  return (
    <>
      {!notes && (
        <h2 className="font-bold">There are currently no posted notes</h2>
      )}
      {notes && notes.map((note, index) => <NoteCard {...note} key={index} />)}
    </>
  );
}
