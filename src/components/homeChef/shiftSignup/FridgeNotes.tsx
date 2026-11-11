import { Fragment } from "react/jsx-runtime";

const FridgeNotes = ({ notes }: { notes: string }) => {
  const newline = "<br/>";
  const words = notes
    .replace(RegExp("\\r", "g"), " ")
    .replace(RegExp("\\n", "g"), " " + newline + " ")
    .split(" ")
    .map((word) => {
      if (word === newline) {
        return (
          <>
            <br />
          </>
        );
      }
      return word + " ";
    });

  return (
    <>
      {words.map((w, i) => (
        <Fragment key={"notes-" + i}>{w}</Fragment>
      ))}
    </>
  );
};

export default FridgeNotes;
