import { Fragment } from "react/jsx-runtime";

const ShiftInfoField = ({
  label,
  value,
  notes,
}: {
  label: string;
  value?: string;
  notes?: string;
}) => {
  const renderNotesWithLinks = () => {
    if (!notes) {
      return;
    }
    const words = notes.split(" ");
    const wordsWithLinks = words.map((word) => {
      if (word.startsWith("http")) {
        let newWord = word;
        if (word.endsWith(".")) {
          newWord = word.slice(0, word.length - 1);
        }
        return (
          <>
            <a href={newWord} className="retro-link">
              {word}
            </a>{" "}
          </>
        );
      }
      return word + " ";
    });

    return (
      <div className="volunteers-shift-detail-field-notes">
        {wordsWithLinks.map((w, i) => (
          <Fragment key={label + i}>{w}</Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="volunteers-shift-detail-field">
      <div className="volunteers-shift-detail-field-title">{label}:</div>
      <div>
        {value}
        {renderNotesWithLinks()}
      </div>
    </div>
  );
};

export default ShiftInfoField;
