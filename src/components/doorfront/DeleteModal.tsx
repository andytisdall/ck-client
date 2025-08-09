const DeleteModal = ({
  onDelete,
  onCancel,
}: {
  onDelete: () => Promise<void>;
  onCancel: () => void;
}) => {
  return (
    <div className="doorfront-modal">
      <h4 className="doorfront-delete-text">Confirm Deletion</h4>
      <div className="doorfront-delete-btns">
        <button className="cancel" onClick={onDelete}>
          Delete
        </button>
        <button onClick={onCancel}>Don't</button>
      </div>
    </div>
  );
};

export default DeleteModal;
