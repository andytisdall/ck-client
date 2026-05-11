import { useState } from "react";

import {
  RSVP,
  useDeleteRSVPMutation,
  useEditRSVPMutation,
} from "../../../state/apis/formApi";

const RSVPItem = ({ rsvp }: { rsvp: RSVP }) => {
  const [newRSVP, setNewRSVP] = useState(rsvp);
  const [editMode, setEditMode] = useState(false);
  const [deleteRSVP] = useDeleteRSVPMutation();
  const [editRSVP] = useEditRSVPMutation();

  return (
    <div key={newRSVP.email}>
      <hr />
      <ul>
        <li>
          <strong>Name:</strong>{" "}
          {!editMode ? (
            rsvp.name
          ) : (
            <input
              value={newRSVP.name}
              onChange={(e) => setNewRSVP({ ...newRSVP, name: e.target.value })}
            />
          )}
        </li>
        <li>
          <strong>Email:</strong>{" "}
          {!editMode ? (
            rsvp.email
          ) : (
            <input
              value={newRSVP.email}
              onChange={(e) =>
                setNewRSVP({ ...newRSVP, email: e.target.value })
              }
            />
          )}
        </li>
        <li>
          <strong>Number of People:</strong>{" "}
          {!editMode ? (
            rsvp.numberOfPeople
          ) : (
            <input
              value={newRSVP.numberOfPeople}
              onChange={(e) =>
                setNewRSVP({ ...newRSVP, numberOfPeople: e.target.value })
              }
            />
          )}
        </li>
        <li>
          <strong>Want Addditional Tickets?</strong>
          {"   "}
          {parseInt(rsvp.numberOfAdditional) > 0 ? "Yes" : "No"}
        </li>
        <li>
          <strong>Number of Additional Tickets:</strong>
          {"   "}
          {!editMode ? (
            rsvp.numberOfAdditional
          ) : (
            <input
              value={newRSVP.numberOfAdditional}
              onChange={(e) =>
                setNewRSVP({ ...newRSVP, numberOfAdditional: e.target.value })
              }
            />
          )}
        </li>
        {!editMode ? (
          <div>
            <br />
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        ) : (
          <div>
            <button
              onClick={async () => {
                editRSVP(newRSVP).unwrap();
                setEditMode(false);
              }}
            >
              Done
            </button>
            <button onClick={async () => await deleteRSVP(rsvp.id).unwrap()}>
              Delete
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};
export default RSVPItem;
