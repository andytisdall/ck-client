import Loading from "../reusable/loading/Loading";

const DeleteModal = ({
  onDelete,
  onCancel,
  isLoading,
}: {
  onDelete: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="doorfront-modal">
        <Loading />
      </div>
    );
  }
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
